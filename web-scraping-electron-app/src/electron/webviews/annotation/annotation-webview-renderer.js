/**
 * @file annotation-webview-renderer.js
 * @description Renderer script for the Label Studio annotation external window.
 * Handles applying the selected theme, setting the webview source to the LS URL,
 * and notifying the main window when navigation changes occur.
 *
 * @module Renderer-AnnoWebview
 */

const ipcRenderer = window.lsAPI;

var webview = null;
var currURL = null;
var timeDelayStart = null;

// Creates a time delay for asynchronous operations
const delay = (timeDelay) => new Promise(resolve => setTimeout(resolve, timeDelay));

/**
 * Initializes the annotation webview window after the DOM has loaded.
 * Sets the theme, sets the LS webview URL, and configures event listeners.
 */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    webview = document.getElementById('anno-element');

    // Listen for external LS URL set by the main process
    ipcRenderer.setExtLSURL((url) => {
        $('#anno-element').attr('src', url); // Set webview source
        initWebviewURLListener();            // Attach navigation listener
    });

    // Exit button listener
    $('#exit-anno-win-btn').on('click', () => {
        ipcRenderer.sendCloseSignal(); // Tell main to close the LS window
    });
});

/**
 * Applies the saved user theme to the annotation window.
 * Defaults to 'light-theme' if no theme is stored.
 * @function initTheme
 * @memberof module:Renderer-AnnoView
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    document.documentElement.className = savedTheme || 'light-theme';
}

/**
 * Listens for in-page navigation changes in the LS webview.
 * If the navigation lasts long enough, notifies the main process with the new URL.
 * @function initWebviewURLListener
 * @memberof module:Renderer-AnnoView
 */
function initWebviewURLListener() {
    webview.addEventListener('did-navigate-in-page', () => {
        timeDelayStart = new Date();

        delay(1500).then(() => {
            const timeStopped = new Date();
            const timeElapsed = Math.round((timeStopped - timeDelayStart) / 1000);

            if (timeElapsed >= 2) {
                const url = webview.getURL();
                ipcRenderer.extLSURLChange(url);
                timeDelayStart = null;
            }
        });
    });
}