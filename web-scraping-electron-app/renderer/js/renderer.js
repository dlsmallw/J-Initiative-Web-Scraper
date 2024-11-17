 /**
 * This script runs on every HTML file to handle theme switching and other processes.
 */

/**
 * ========================
 * Initialization and Setup
 * ========================
 */

// Use the IPC methods exposed by the preload script
const ipcRenderer = window.electronAPI;

// Pages object to manage different sections of the application
const Pages = {
    Home: {
        name: "home",
        id: '#home-container'
    },
    Scrape: {
        name: "scrape",
        id: '#scrape-container'
    },
    About: {
        name: "about",
        id: '#about-container'
    }
};

let currentPage;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme when the document is fully loaded
    initializeTheme();

    // Initialize pages by loading their content
    initPages();

    // Initializes 2-way renderer-main IPC listeners
    setupIPCEventListeners();
});

/**
 * ========================
 * Page and UI Initialization
 * ========================
 */

/**
 * Initializes all the pages by loading their HTML content and setting the default page to Home
 */
async function initPages() {
    // Set default page to Home and display its content
    currentPage = getPage("home");

    $('#d_content')
        .append(await $.get("components/home.html"))
        .append(await $.get("components/scrape.html"))
        .append(await $.get("components/about.html"));

    $('#node-version').html(versions.node());
    $('#chrome-version').html(versions.chrome());
    $('#electron-version').html(versions.electron());

    // Attach event listeners
    attachPageEventListeners();
}

/**
 * Handles changing the page when a navigation link is clicked
 * @param {*} event     The event corresponding to a page change.
 */
function changePage(event) {
    logToMain('changePage triggered');
     console.log('changePage triggered by:', event.type);
    if (event.type !== 'click') {
        console.log('Ignoring non-click event for changePage');
        return;
    }
    event.preventDefault();

    const pageName = event.target.id.split('-')[0];
    const newPage = getPage(pageName);

    if (currentPage.name !== newPage.name) {
        logToMain(`Switching to tab: ${pageName}`);
        Object.values(Pages).forEach(page => $(page.id).hide());
        $(newPage.id).show();
        currentPage = newPage;
    } else {
        logToMain(`Already on tab: ${pageName}`);
    }
}


/**
 * ========================
 * IPC Event Listeners
 * ========================
 */
function setupIPCEventListeners() {
    ipcRenderer.receive('open-url-error', (errorMessage) => alert(`Failed to open URL: ${errorMessage}`));
    ipcRenderer.receive('display-selected-text', (text) => displaySelectedText(text));
    ipcRenderer.receive('data-imported', (confirmationMessage) => alert(confirmationMessage));
    ipcRenderer.receive('export-success', (successMessage) => alert(successMessage));
    ipcRenderer.receive('export-error', (errorMessage) => alert(errorMessage));

    $('#submitURLBtn').on('click', submitBtnPressed);
    $('#importDataButton').on('click', () => {
        const data = {
            text: $('#editedText').val(),
            sourceType: $('#sourceType').val(),
            domainOwner: $('#domainOwner').val()
        };
        ipcRenderer.send('import-data', data);
    });

    $('#exit-nav').on('click', () => ipcRenderer.exitSignal());
}

function displaySelectedText(text) {
    console.log('Received selected text:', text);
    $('#selectedTextDisplay').val(text);
    $('#editedText').val(text);
    $('#results-container').show();
}

/**
 * Submit Button and URL Validation
 */
function submitBtnPressed() {
    logToMain('Submit button pressed');
    let url = $('#url-input').val();

    if (url) {
        url = !url.match(/^https?:\/\//i) ? `https://${url}` : url;
        if (!isValidURL(url)) {
            logToMain('Invalid URL entered', 'error');
            alert('Please enter a valid URL.');
            return;
        }
        ipcRenderer.send('open-url', url);
        logToMain(`Valid URL submitted: ${url}`);
        $('#staticURL').val(url);
        $('#results-container').css('display', 'block');
    } else {
        logToMain('No URL entered', 'error');
        alert('Please enter a URL.');
    }
}

function lockActiveTab(tabName) {
    console.log(`Locking tab: ${tabName}`);
    currentPage = getPage(tabName);
    Object.keys(Pages).forEach(page => $(Pages[page].id).hide());
    $(currentPage.id).show();
    console.log(`Currently locked on tab: ${currentPage.name}`);
}



/**
 * ========================
 * Helper Functions
 * ========================
 */
function initializeTheme() {
    const themeSelect = $('#theme-select');
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.documentElement.className = savedTheme;
    themeSelect.val(savedTheme);

    themeSelect.on('change', () => {
        const theme = themeSelect.val();
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    });
}

function getPage(value) {
    return Pages[Object.keys(Pages).find(key => Pages[key].name === value)];
}

function isValidURL(url) {
    try {
        new URL(url);
        logToMain(`Valid URL: ${url}`);
        return true;
    } catch (error) {
        logToMain(`Invalid URL: ${url}`, 'error');
        return false;
    }
}
/**
 * Attach Event Listeners for Page Navigation and UI interactions
 */
function attachPageEventListeners() {
    $('#home-nav').on('click', changePage);
    $('#scrape-nav').on('click', changePage);
    $('#about-nav').on('click', changePage);

    $('#url-input').on('keypress', (event) => {
        if (event.key === 'Enter') submitBtnPressed();
    });
}
/**
 * IPC Event: Handle open-url event
 */
ipcRenderer.receive('open-url', (url) => {
    logToMain(`Received open-url event with URL: ${url}`);
    lockActiveTab('scrape');
});

/**
 * IPC Event: Handle url-loaded event
 */
ipcRenderer.receive('url-loaded', async (url) => {
    try {
        logToMain(`URL loaded: ${url}. Initiating scrape request.`);
        lockActiveTab('scrape');

        const response = JSON.parse(await ipcRenderer.invoke('scrape:request', url));
        if (response.ok) {
            logToMain(`Scrape request successful for URL: ${url}`);
            $('#staticURL').val(response.url);
            $('#results-container').show();
            $('#formatted-data-text').text(response.formattedData);
            $('#raw-data-text').text(response.rawData);
        } else {
            logToMain(`Scrape request failed for URL: ${url}`, 'error');
            alert("Failed to scrape the URL.");
        }
    } catch (error) {
        logToMain(`Error during scraping: ${error.message}`, 'error');
        alert('Failed to scrape the URL.');
    }
});

function logToMain(message, level = 'info') {
    ipcRenderer.send('log-message', { level, message });
}
function logCurrentTab() {
    console.log(`Current active tab: ${currentPage.name}`);
}

ipcRenderer.receive('main-window-focus', () => {
    console.log('Main window regained focus in renderer');
    lockActiveTab('scrape'); // Ensure the Scraper tab remains active
});

ipcRenderer.receive('main-window-blur', () => {
    console.log('Main window lost focus in renderer');
    setTimeout(() => {
        console.log('Attempting to refocus main window...');
        ipcRenderer.send('refocus-main-window');
    }, 100); // Slight delay to handle transient focus shifts
});

