/**
* @file renderer.js
* @fileoverview Initializes and controls the Electron renderer process.
* Handles dynamic page loading, theme management, inter-process communication (IPC),
* and user interface event handling.
*
* This module initializes all UI components, listens for user actions,
* manages navigation between views, and supports dynamic theme switching.
*
* Logging is abstracted to the main process using contextBridge and ipcRenderer.
*
* @module Renderer
*/

import { HomePageController } from '../components/views/home-page.js';
import { ScrapePageController } from '../components/views/scrape-page.js';
import { AnnotationPageController } from '../components/views/annotation-page.js';
import { DatabasePageController } from '../components/views/database-page.js';
import { LogPageController } from '../components/views/log-page.js';
import { AboutPageController } from '../components/views/about-page.js';

const ipcRenderer = window.electronAPI;
const lsAPI = window.lsAPI;

/**
* Collection of all page controller instances used for dynamic navigation.
*
* @constant {Object} Pages
* @memberof module:Renderer
*/
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
    initPages();

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
    * Initialize all UI pages and set the default active page.
    *
    * @function initPages
    * @memberof module:Renderer
    * @returns {Promise<void>}
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
    * Attach navigation and event listeners for all page elements and IPC.
    *
    * @function attachPageEventListeners
    * @memberof module:Renderer
    * @returns {void}
    */
    function attachPageEventListeners() {
        Object.keys(Pages).forEach(e => {
            $(`#${Pages[e].getName()}`).on('click', changePage);
        });

        // Handles receipt of updated project list
        lsAPI.updateToProjectList((res) => {
            var response = JSON.parse(res);

            if (response.ok) {
                updateProjectOptions(response.data);
            } else {
                postAlert(response.resMsg, response.errType);
            }
        });

        // Event listener for the "Exit" navigation link
        $('#exit-nav').on('click', () => {

            // disable tutorial if app closes while watching it
            if (localStorage.getItem('tutorial') === "disableOnExit") {
                localStorage.setItem('tutorial', "disabled");
            }

            ipcRenderer.exitSignal();
        });
    }

    //============================================================================================================================
    // Methods for handling changing the page
    //============================================================================================================================

    /**
    * Retrieve the page controller instance by page name.
    *
    * @function getPage
    * @memberof module:Renderer
    * @param {string} value - The page name (e.g., "home", "scrape").
    * @returns {Object} Page controller instance.
    */
    function getPage(value) {
        return Pages[Object.keys(Pages).find(e => Pages[e].getName() === value)];
    }

    /**
    * Handle user navigation and switch between pages.
    *
    * @function changePage
    * @memberof module:Renderer
    * @param {Event} event - The navigation click event.
    * @returns {void}
    */
    function changePage(event) {
        event.preventDefault(); // Prevent default link behavior
        const newPage = getPage(this.id.split('-')[0]);

        // Only switch pages if the new page is different from the current page
        if (currentPage.name !== newPage.name) {
            currentPage.setPageInactive();
            newPage.setPageActive();

            currentPage = newPage;

            // ensure embedded tutorial is not visible on other tabs
            if (currentPage.getName() !==  "home" || localStorage.getItem('tutorial') === "disabled") {
                if (document.getElementById('tutorial').style.display === "block") {
                    document.getElementById("tutorial").style.display = "none";

                    localStorage.setItem('tutorial', "disabled");

                    alert("Tutorial disabled. If you would like to enable it again, see the about page.");
                }

                document.getElementById("tutorial-content").style.display = "none";
            } else if (document.getElementById('tutorial').style.display !== "block") {
                document.getElementById("tutorial-content").style.display = "block";
            }

            logInfo(`Page changed to ${currentPage.getName()}.`);
        } else {
            logDebug(`Page not changed. Already on ${currentPage.getName()}.`);
        }
    }

    //============================================================================================================================
    // Helper method(s) for a change in annotation project list
    //============================================================================================================================

    /**
    * Update the dropdown options with Label Studio projects in the UI.
    *
    * @function updateProjectOptions
    * @memberof module:Renderer
    * @param {Array<{id: string, project_name: string}>} projects - Array of project objects.
    * @returns {void}
    */
    function updateProjectOptions(projects) {
        var urlSelect = $('#projectSelect-url');
        var manSelect = $('#projectSelect-man');

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
    * Initialize and apply theme based on stored preference or default.
    *
    * @function initializeTheme
    * @memberof module:Renderer
    * @returns {void}
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
    * Handle theme change event and update localStorage and UI.
    *
    * @function changeTheme
    * @memberof module:Renderer
    * @returns {void}
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
    * Display a general or error alert dialog and log the event.
    *
    * @function postAlert
    * @memberof Renderer.LogHelpers
    * @param {string} alertMsg - Message to display.
    * @param {string} [cause] - Optional cause for error alert.
    * @returns {void}
    */
    function postAlert(alertMsg, cause) {
        var json = {
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
    *
    * @function logInfo
    * @memberof Renderer.LogHelpers
    * @param {string} message - Info log message.
    * @returns {void}
    */
    function logInfo(message) {
        logger.info(message);
    }

    /**
    * Send a debug log message to the main process.
    *
    * @function logDebug
    * @memberof Renderer.LogHelpers
    * @param {string} message - Debug log message.
    * @returns {void}
    */
    function logDebug(message) {
        logger.debug(message);
    }

    /**
    * Send a warning log message to the main process.
    *
    * @function logWarn
    * @memberof Renderer.LogHelpers
    * @param {string} message - Warning log message.
    * @returns {void}
    */
    function logWarn(message) {
        logger.warn(message);
    }

    /**
    * Send an error log message to the main process.
    *
    * @function logError
    * @memberof Renderer.LogHelpers
    * @param {string} message - Error log message.
    * @returns {void}
    */
    function logError(message) {
        logger.error(message);
    }