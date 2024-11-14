 // renderer.js

const ipcRenderer = window.electronAPI;
let logLines = []; // Store logs for filtering

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
    },
    Logs: {
        name: "logs",
        id: '#logs-container'
    }
};

let currentPage;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme when the document is fully loaded
    initializeTheme();

    // Initialize pages by loading their content
    initPages();

    // Initializes IPC event listeners
    initIPCEventListeners();

    // Log that the renderer process has loaded
    log("INFO", 'Renderer process DOM content loaded');
});

/**
 * Initializes all the pages by loading their HTML content and setting the default page to Home
 */
async function initPages() {
    // Set default page to Home and display its content
    currentPage = getPage("home");

    try {
        $('#d_content')
            .append(await $.get("components/home.html"))
            .append(await $.get("components/scrape.html"))
            .append(await $.get("components/about.html"))
            .append(await $.get("components/log.html")); // Load log.html

        $('#node-version').html(versions.node());
        $('#chrome-version').html(versions.chrome());
        $('#electron-version').html(versions.electron());

        // Attach event listeners
        attachPageEventListeners();

        logInfo('Pages initialized successfully.');
    } catch (error) {
        logError(`Error initializing pages: ${error}`);
    }
}

/**
 * Handles changing the page when a navigation link is clicked
 * @param {*} event     The event corresponding to a page change.
 */
function changePage(event) {
    try {
        event.preventDefault(); // Prevent default link behavior
    }
    catch(e) {
        log("ERROR", "preventDefault() failed. Most likely cause: Event target " + event.target + " does not have preventDefault() as a method.");
    }
    
    const pageName = this.id.split('-')[0]; // Extract page name from element ID
    const newPage = getPage(pageName);

    // Only switch pages if the new page is different from the current page
    if (currentPage.name !== newPage.name) {
        Object.keys(Pages).forEach(page => {

            $(Pages[page].id).hide();
        });

        $(newPage.id).show();
        currentPage = newPage;

        logInfo(`Page changed to ${pageName}.`);

        // Load logs if the current page is the Logs page
        if (currentPage.name === 'logs') {
            loadLogs();
        }
    } else {
        logDebug(`Page not changed. Already on ${pageName}.`);
    }
}

/**
 * Attach event listeners specific to the current page (e.g., buttons, input fields)
 */
function attachPageEventListeners() {
    $('#home-nav').on('click', changePage);
    $('#scrape-nav').on('click', changePage);
    $('#about-nav').on('click', changePage);
    $('#logs-nav').on('click', changePage);

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
        logError(`Failed to open URL: ${errorMessage}`);
    });
}

/**
 * Initializes IPC communication listeners.
 */
function initIPCEventListeners() {
    // Already handled in attachPageEventListeners
    // Kept here if additional IPC listeners are needed in the future
}

/**
 * Function to handle the "Submit" button click on the Scrape page.
 */
function submitBtnPressed() {
    logDebug('Submit button pressed.');

    let url = $('#url-input').val();

    // Check if a URL was entered
    if (url) {
        // Prepend 'https://' if no protocol is specified
        if (!url.match(/^https?:\/\//i)) {
            url = 'https://' + url;
        }

        // Validate the URL format before sending
        if (!isValidURL(url)) {
            alert('Please enter a valid URL.');
            logWarn('Invalid URL entered.');
            return;
        }

        // Send the URL to the main process to open it
        ipcRenderer.send('open-url', url);
        logInfo(`Requested to open URL: ${url}`);

        // Update the results container to display the submitted URL
        $('#staticURL').val(url);
        $('#results-container').css('display', 'block');

        // Additional code for scraping (if needed)
        // ...
    } else {
        alert('Please enter a URL.'); // Alert the user if no URL is entered
        logWarn('No URL entered.');
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
    } catch (error) {
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
        logDebug(`Applied saved theme: ${savedTheme}`);
    } else {
        // Set default theme if none is saved
        document.documentElement.className = 'light-theme';
        logDebug('Applied default theme: light-theme');
    }

    if (themeSelect) {
        // Set the dropdown to the saved value if available
        themeSelect.val(savedTheme || 'light-theme');

        // Add an event listener to change the theme whenever the user selects a new option
        themeSelect.on('change', changeTheme);
    } else {
        logWarn('Theme select element not found.');
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

    logInfo(`Theme changed to: ${theme}`);
}

/**
 * Returns the corresponding Page object based on the page name.
 * @param {*} value     The page name to be searched for.
 * @returns Page        The page.
 */
function getPage(value) {
    return Pages[Object.keys(Pages).find(e => Pages[e].name === value)];
}

/**
 * Load and display logs.
 */
async function loadLogs() {
    try {
        // Wait for the DOM to be updated
        await new Promise(resolve => setTimeout(resolve, 50));

        const logs = await ipcRenderer.invoke('get-logs');
        logDebug('Logs received from main process.');
        if (!logs) {
            logWarn('No logs received from main process.');
            return;
        }
        logLines = logs.split('\n').filter(line => line.trim() !== '');
        displayLogs(logLines);

        // Attach event listener for log filter
        const logFilter = document.getElementById('log-filter');
        if (logFilter) {
            logFilter.addEventListener('change', filterLogs);
            logDebug('Log filter event listener attached.');
        } else {
            logWarn('Log filter element not found.');
        }
    } catch (error) {
        logError(`Error loading logs: ${error}`);
    }
}

/**
 * Display logs in the UI.
 * @param {Array} logs - Array of log lines to display.
 */
function displayLogs(logs) {
    const logOutput = document.getElementById('log-output');
    if (!logOutput) {
        logError('log-output element not found.');
        return;
    }
    logOutput.innerHTML = '';

    logs.forEach(line => {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = line;
        logOutput.appendChild(logEntry);
    });

    logDebug('Logs displayed in UI.');
}

/**
 * Filter logs based on selected log level.
 */
function filterLogs() {
    const logFilter = document.getElementById('log-filter');
    const filterValue = logFilter ? logFilter.value : 'ALL';
    let filteredLogs = logLines;

    if (filterValue !== 'ALL') {
        // Split the filterValue into an array of levels
        const levels = filterValue.toLowerCase().split(',').map(s => s.trim());
        filteredLogs = logLines.filter(line => {
            // Extract the log level using regex
            const regex = /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\] \[(\w+)\]/;
            const match = line.match(regex);
            if (match && match[1]) {
                const logLevel = match[1].toLowerCase();
                return levels.includes(logLevel);
            }
            return false;
        });
        logInfo(`Logs filtered by level: ${filterValue}`);
    } else {
        logInfo('Log filter reset to show all logs.');
    }

    displayLogs(filteredLogs);
}

/**
 * Send an info log message to the main process.
 * @param {string} message - The message to log.
 */
function logInfo(message) {
    ipcRenderer.send('log-info', message);
}

/**
 * Send a debug log message to the main process.
 * @param {string} message - The message to log.
 */
function logDebug(message) {
    ipcRenderer.send('log-debug', message);
}

/**
 * Send a warning log message to the main process.
 * @param {string} message - The message to log.
 */
function logWarn(message) {
    ipcRenderer.send('log-warn', message);
}

/**
 * Send an error log message to the main process.
 * @param {string} message - The message to log.
 */
function logError(message) {
    ipcRenderer.send('log-error', message);
}
