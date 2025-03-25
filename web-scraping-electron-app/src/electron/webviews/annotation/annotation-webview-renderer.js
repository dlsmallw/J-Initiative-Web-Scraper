/**
 * Manages rendering the annotation webview.
 */


const ipcRenderer = window.lsAPI;

var webview = null;
var currURL = null;

var timeDelayStart = null;

// Creates a time delay for events
const delay = (timeDelay) => new Promise(resolve => setTimeout(resolve, timeDelay));

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    webview = document.getElementById('anno-element');

    // Listen for 'setUrl' messages from the main process to set the webview's URL
    ipcRenderer.setExtLSURL((url) => {
        $('#anno-element').attr('src', url); // Set the webview source to the received URL

        initWebviewURLListener();
    });

    $('#exit-anno-win-btn').on('click', () => {
        ipcRenderer.sendCloseSignal();
    });
});

/**
 * Initializes the theme used for the window.
 */
function initTheme() {
    // Load the saved theme from localStorage if it exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.className = savedTheme; // Apply saved theme to the document
    } else {
        // Set default theme if none is saved
        document.documentElement.className = 'light-theme';
    }
}

function initWebviewURLListener() {
    webview.addEventListener('did-navigate-in-page', () => {
        timeDelayStart = new Date();
        delay(1500).then(() => {
            var timeStopped = new Date();
            var timeElapsed = Math.round((timeStopped - timeDelayStart) / 1000);

            if (timeElapsed >= 2) {
                var url = `${webview.getURL()}`;
                ipcRenderer.extLSURLChange(url);
                timeDelayStart = null;
            }
        });
    });
}
