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

function submitBtnPressed() {
    console.log('Submit button pressed');

    let url = $('#url-input').val();
    console.log('URL before prepending protocol:', url);

    // Prepend 'https://' if no protocol is specified
    if (!url.match(/^https?:\/\//i)) {
        url = 'https://' + url;
    }

    console.log('URL after prepending protocol if needed:', url);

    // Validate the URL format before sending
    if (!isValidURL(url)) {
        alert('Please enter a valid URL.');
        return;
    }

    // Send the URL to the main process to open it
    ipcRenderer.send('open-url', url);

    // Update the results container to display the submitted URL
    $('#staticURL').val(url);
    $('#results-container').css('display', 'block');
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

// Attach event listener for the import data button
$('#importDataButton').on('click', () => {
    const editedText = $('#editedText').val();
    const sourceType = $('#sourceType').val();
    const domainOwner = $('#domainOwner').val();

    // Send the data to the main process
    ipcRenderer.send('import-data', {
        text: editedText,
        sourceType: sourceType,
        domainOwner: domainOwner,
    });
});

// Attach event listener for the export data button
$('#exportDataButton').on('click', () => {
    const dataToExport = {
        text: $('#editedText').val(),
        sourceType: $('#sourceType').val(),
        domainOwner: $('#domainOwner').val(),
    };

    ipcRenderer.send('export-data', dataToExport);
});

// Receive selected text from main process
ipcRenderer.on('display-selected-text', (event, text) => {
    // Display the selected text
    $('#selectedTextDisplay').val(text);
    // Populate the edited text field with the selected text
    $('#editedText').val(text);

    // Show the results container
    $('#results-container').show();
});
