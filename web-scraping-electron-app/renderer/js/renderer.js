 /**
 * This script runs on every HTML file to handle theme switching and other processes.
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
    initIPCEventListeners();
});


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
    event.preventDefault(); // Prevent default link behavior
    const pageName = this.id.split('-')[0]; // Extract page name from element ID
    const newPage = getPage(pageName);

    // Only switch pages if the new page is different from the current page
    if (currentPage.name !== newPage.name) {
        Object.keys(Pages).forEach(page => {
            $(Pages[page].id).hide();
        });

        $(newPage.id).show();
        currentPage = newPage;

        console.log("Page Changed To " + pageName);
    } else {
        console.log("Page Not Changed");
    }
}

/**
 * Attach event listeners specific to the current page (e.g., buttons, input fields)
 */
function attachPageEventListeners() {
    // Add event listeners for navigation buttons to change pages
    $('#home-nav').on('click', changePage);
    $('#scrape-nav').on('click', changePage);
    $('#about-nav').on('click', changePage);

    // Event listener for the "Submit" button on the Scrape page
    $('#submitURLBtn').on('click', () => {
        submitBtnPressed();
    });

    // Event listener for the "Enter" key press in the input field
    $('#url-input').on('keypress', (event) => {
        if (event.key === 'Enter') {
            submitBtnPressed();     // Call the submit function
        }
    });
    
    // Event listener for the "Exit" navigation link
    $('#exit-nav').on('click', () => {
        ipcRenderer.exitSignal();
    });

    // Listen for errors from main process related to URL opening
    ipcRenderer.receive('open-url-error', (errorMessage) => {
        alert(`Failed to open URL: ${errorMessage}`); // Display alert if there was an error opening the URL
    });
}

/**
 * Initializes any atypical IPC communication listeners.
 * NOTE: Separated for organization purposes.
 */
function initIPCEventListeners() {
    // Listen for errors from main process related to URL opening
    ipcRenderer.receive('open-url-error', (errorMessage) => {
        alert(`Failed to open URL: ${errorMessage}`); // Display alert if there was an error opening the URL
    });
}

/**
 * Function to handle the "Submit" button click on the Scrape page.
 */
async function submitBtnPressed() {
    console.log('[submitBtnPressed] Function triggered');

    const url = $('#url-input').val().trim();
    console.log('[submitBtnPressed] Sending scraping request for URL:', url);

    try {
        const response = await ipcRenderer.invoke('scrape:request', url);
        console.log('[submitBtnPressed] Received response:', response);

        if (response.ok) {
            $('#staticURL').val(response.url);
            $('#results-container').show();
            $('#formatted-data-text').text(response.formattedData);
            $('#raw-data-text').text(response.rawData);
        } else {
            console.error('[submitBtnPressed] Scrape failed:', response.error);
            alert(`Failed to scrape the URL. Error: ${response.error}`);
        }
    } catch (error) {
        console.error('[submitBtnPressed] Error during scraping request:', error);
    }
}



/**
 * URL validation function to check if the URL is valid.
 * @param {*} url       The URL to validate.
 * @returns Bool        A boolean corresponding to if it is valid or not.
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Initializes the theme based on the user's saved preference or defaults to light theme.
 */
function initializeTheme() {
    const themeSelect = $('#theme-select');

    // Load the saved theme from localStorage if it exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.className = savedTheme; // Apply saved theme to the document
    } else {
        // Set default theme if none is saved
        document.documentElement.className = 'light-theme';
    }

    if (themeSelect) {
        // Set the dropdown to the saved value if available
        themeSelect.val(savedTheme || 'light-theme');

        // Add an event listener to change the theme whenever the user selects a new option
        themeSelect.on('change', changeTheme);
    }
}

/**
 * Changes the theme based on user selection and saves the choice to localStorage.
 */
function changeTheme() {
    const theme = $('#theme-select').val();

    // Set the selected theme class on the HTML element
    document.documentElement.className = theme;

    // Save the selected theme to localStorage so it persists across sessions
    localStorage.setItem('theme', theme);
}

/**
 * Returns the corresponding Page object based on the page name.
 * @param {*} value     The page name to be searched for.
 * @returns Page        The page.
 */
function getPage(value) {
    return Pages[Object.keys(Pages).find(e => Pages[e].name === value)];
}


// Handle navigation when "Go" button is clicked
document.getElementById('navigate-btn').addEventListener('click', () => {
    const url = document.getElementById('url-input').value.trim();
    const webview = document.getElementById('webview');
    if (url) {
        webview.loadURL(url);
    } else {
        alert('Please enter a valid URL.');
    }
});

// Handle capturing selected text when "Capture Selected Text" button is clicked
document.getElementById('capture-btn').addEventListener('click', () => {
    const webview = document.getElementById('webview');

    webview.executeJavaScript('window.getSelection().toString();', true)
        .then(selectedText => {
            console.log('Selected text:', selectedText);
            // Display the selected text in the UI
            document.getElementById('selected-text').innerText = selectedText;

            // Send the selected text to the main process for further processing
            window.electronAPI.send('selected-text', selectedText);
        })
        .catch(error => {
            console.error('Error getting selected text:', error);
            alert('An error occurred while capturing the selected text.');
        });
});
