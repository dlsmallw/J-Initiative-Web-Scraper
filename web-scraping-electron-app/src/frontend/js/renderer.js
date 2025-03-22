// renderer.js
import { HomePageController } from '../components/views/home-page.js';
import { ScrapePageController } from '../components/views/scrape-page.js';
import { AnnotationPageController } from '../components/views/annotation-page.js';
import { DatabasePageController } from '../components/views/database-page.js';
import { LogPageController } from '../components/views/log-page.js';
import { AboutPageController } from '../components/views/about-page.js';


const ipcRenderer = window.electronAPI;
const lsAPI = window.lsAPI;


// Pages object to manage different sections of the application
const Pages = {
    Home: new HomePageController(),
    Scrape: new ScrapePageController(),
    Annotation: new AnnotationPageController(),
    Database: new DatabasePageController(),
    About: new AboutPageController(),
    Logs: new LogPageController()
};

let currentPage;

document.addEventListener('DOMContentLoaded', () => {
    logDebug('DOM loaded, initializing initial dynamic content.');

    // Initialize theme when the document is fully loaded
    initializeTheme();

    // Initialize pages by loading their content
    initPages().then();

    // Log that the renderer process is ready
    logInfo('Renderer process is ready.');

    document.addEventListener('keypress', e => {
        console.log(e.key)
    })
});

//============================================================================================================================
// Methods for handling app initialization
//============================================================================================================================

/**
 * Initializes all the pages by loading their HTML content and setting the default page to Home
 */
async function initPages() {
    // Set default page to Home and display its content
    currentPage = Pages.Home;

    try {
        Object.keys(Pages).forEach(e => {
            Pages[e].initPage();
        });

        currentPage.setPageActive();

        // Attach event listeners
        attachPageEventListeners();

        logInfo('Pages initialized successfully.');
    } catch (error) {
        logError(`Error initializing pages: ${error}`);
    }
}

/**
 * Attach event listeners specific to the current page (e.g., buttons, input fields)
 */
function attachPageEventListeners() {
    Object.keys(Pages).forEach(e => {
        $(`#${Pages[e].getName()}`).on('click', changePage);
    });

    // Handles receipt of updated project list
    lsAPI.updateToProjectList((res) => {
        let response = JSON.parse(res);

        if (response.ok) {
            updateProjectOptions(response.data);
        } else {
            postAlert(response.resMsg, response.errType);
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

//============================================================================================================================
// Methods for handling changing the page
//============================================================================================================================

/**
 * Returns the corresponding Page object based on the page name.
 * @param {*} value     The page name to be searched for.
 * @returns Page        The page.
 */
function getPage(value) {
    return Pages[Object.keys(Pages).find(e => Pages[e].getName() === value)];
}

/**
 * Handles changing the page when a navigation link is clicked
 * @param {*} event     The event corresponding to a page change.
 */
function changePage(event) {
    event.preventDefault(); // Prevent default link behavior
    const newPage = getPage(this.id.split('-')[0]);

    // Only switch pages if the new page is different from the current page
    if (currentPage.name !== newPage.name) {
        currentPage.setPageInactive();
        newPage.setPageActive();

        currentPage = newPage;

        logInfo(`Page changed to ${currentPage.getName()}.`);
    } else {
        logDebug(`Page not changed. Already on ${currentPage.getName()}.`);
    }
}

//============================================================================================================================
// Helper method(s) for a change in annotation project list
//============================================================================================================================

/**
 * Updates the list of available projects to export to on the manual scrape page.
 * @param {*} projects      The returned list of available projects.
 */
function updateProjectOptions(projects) {
    let urlSelect = $('#projectSelect-url');
    let manSelect = $('#projectSelect-man');

    $(urlSelect).empty();
    $(manSelect).empty();

    if (projects) {
        $.each(projects, function(i, project) {
            $(urlSelect).append($('<option>', {
                value: project.id,
                text: `${project.id} - ${project.project_name}`
            }));
    
            $(manSelect).append($('<option>', {
                value: project.id,
                text: `${project.id} - ${project.project_name}`
            }));
        });
    }  
} 

//============================================================================================================================
// Methods for managing initialization and control of app theme
//============================================================================================================================

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

//============================================================================================================================
// Logging Helpers (WIP - Plan to move to a separate class that is imported)
//============================================================================================================================
const logger = window.log;    // Variable created for ease of reading

/**
     * Handles displaying an alert message for specific situations (error or otherwise).
     * @param {*} alertMsg          Message to display.
     * @param {*} cause             Cause if an error.
     */
function postAlert(alertMsg, cause) {
    let json = {
        msg: alertMsg,
        errType: null
    }

    if (cause === undefined) {
        ipcRenderer.postDialog.general(JSON.stringify(json));
        logInfo(alertMsg);
    } else {
        json.errType = cause;

        ipcRenderer.postDialog.error(JSON.stringify(json));
        logError(`${alertMsg} Cause: ${cause}`);
    }
}

/**
 * Send an info log message to the main process.
 * @param {string} message - The message to log.
 */
function logInfo(message) {
    logger.info(message);
}

/**
 * Send a debug log message to the main process.
 * @param {string} message - The message to log.
 */
function logDebug(message) {
    logger.debug(message);
}

/**
 * Send a warning log message to the main process.
 * @param {string} message - The message to log.
 */
function logWarn(message) {
    logger.warn(message);
}

/**
 * Send an error log message to the main process.
 * @param {string} message - The message to log.
 */
function logError(message) {
    logger.error(message);
}
