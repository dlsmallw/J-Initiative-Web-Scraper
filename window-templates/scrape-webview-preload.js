// webview_preload.js

// Import the ipcRenderer module from Electron
const { ipcRenderer } = require('electron');

// Creates a time delay for events
const delay = (timeDelay) => new Promise(resolve => setTimeout(resolve, timeDelay));

// Export button listener inside the webview
document.addEventListener('DOMContentLoaded', () => {
    initMouseEventListeners();

    // Listen for 'getSelected' messages from the host (renderer process)
    ipcRenderer.on('getSelected', function () {
        var jsonObj = {
            url: window.location.href.toString(),
            data: getSelectedText()
        }
        // When received, send the selected text back to the host using 'ipcRenderer.sendToHost'
        ipcRenderer.sendToHost('selection', JSON.stringify(jsonObj));
    });
});

/**
 * Function to get the currently selected text in the webview
 * @returns String      The current selection.
 */
function getSelectedText() {
    return window.getSelection().toString().trim();
}

/**
 * Checks if their is currently text selected and either enables or diables the import button.
 */
function selectedTextCheck() {
    if (getSelectedText() !== '') {
        ipcRenderer.sendToHost('enable-import');
    } else {
        ipcRenderer.sendToHost('disable-import');
    }
}

/**
 * This will initialize listeners that dynamically track whether text is selected or not.
 * NOTE: Setting these three event listeners ensures that it is always checking whether text is selected.
 */
function initMouseEventListeners() {
    document.addEventListener('mousemove', () => {
        selectedTextCheck();
    });

    document.addEventListener('mouseup', async () => {
        // Delay to allow selection to update
        await delay(50);
        selectedTextCheck();
    });

    document.addEventListener('mousedown', async () => {
        // Delay to allow selection to update
        await delay(50);
        selectedTextCheck();
    });
}
