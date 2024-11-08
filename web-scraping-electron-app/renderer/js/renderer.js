 //renderer.js

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
    Logs: { // Add the Logs page
        name: "logs",
        id: '#log-container'
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
        .append(await $.get("components/about.html"))
        .append(await $.get("components/log.html")); // Load log.html

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

        // Load logs if the current page is the Logs page
        if (currentPage.name === 'logs') {
            loadLogs();
        }
    } else {
        console.log("Page Not Changed");
    }
}

/**
 * Attach event listeners specific to the current page (e.g., buttons, input fields)
 */
function attachPageEventListeners() {
    $('#home-nav').on('click', changePage);
    $('#scrape-nav').on('click', changePage);
    $('#about-nav').on('click', changePage);
    $('#logs-nav').on('click', changePage); // Ensure this is included

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
function submitBtnPressed() {
    console.log('Submit button pressed');

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
            return;
        }

        // Send the URL to the main process to open it
        ipcRenderer.send('open-url', url);

        // Update the results container to display the submitted URL
        $('#staticURL').val(url);

        $('#results-container').css('display', 'block');

        // This is the necessary code for performing a basic web scrape using the webscrape_test.py file
        // var response = JSON.parse(await ipcRenderer.invoke('scrape:request', $('#url-input').val()));
        // if (response.ok) {
        //     $('#staticURL').val(response.url);
        //     $('#results-container').show();
        //     $('#formatted-data-text').text(response.formattedData);
        //     $('#raw-data-text').text(response.rawData);
        // } else {
        //     // WIP: This is were we would handle an error response (i.e., display a "Failed to scrape web url")
        // }
    } else {
        alert('Please enter a URL.'); // Alert the user if no URL is entered
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

// Load and display logs
async function loadLogs() {
    try {
        // Wait for the DOM to be updated
        await new Promise(resolve => setTimeout(resolve, 50));

        const logs = await window.electronAPI.invoke('get-logs');
        console.log('Logs received:', logs); // Debugging statement
        if (!logs) {
            console.error('No logs received');
            return;
        }
        logLines = logs.split('\n').filter(line => line.trim() !== '');
        displayLogs(logLines);

        // Attach event listener for log filter
        const logFilter = document.getElementById('log-filter');
        if (logFilter) {
            logFilter.addEventListener('change', filterLogs);
        } else {
            console.error('Log filter element not found');
        }
    } catch (error) {
        console.error('Error loading logs:', error);
    }
}

function displayLogs(logs) {
    const logOutput = document.getElementById('log-output');
    if (!logOutput) {
        console.error('log-output element not found');
        return;
    }
    console.log('Displaying logs:', logs); // Debugging statement
    logOutput.innerHTML = '';

    logs.forEach(line => {
        console.log('Adding log line:', line); // Debugging statement
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = line;
        logOutput.appendChild(logEntry);
    });
}



function filterLogs() {
    const logFilter = document.getElementById('log-filter');
    const filterValue = logFilter ? logFilter.value : 'ALL';
    let filteredLogs = logLines;

    if (filterValue !== 'ALL') {
        filteredLogs = logLines.filter(line => line.includes(`[${filterValue}]`));
    }

    displayLogs(filteredLogs);
}




