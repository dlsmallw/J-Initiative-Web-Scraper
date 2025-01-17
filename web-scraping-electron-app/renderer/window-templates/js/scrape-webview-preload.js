// webview_preload.js

// Import the ipcRenderer module from Electron
const { ipcRenderer } = require('electron');

// Creates a time delay for events
const delay = (timeDelay) => new Promise(resolve => setTimeout(resolve, timeDelay));

var isManualMode = false;

// objects used while in auto mode
var autoCurrHoveredElement = null
var autoSelectedElements = []

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

    ipcRenderer.on('man-selection-mode', () => {
        isManualMode = true;
    });

    ipcRenderer.on('auto-selection-mode', function() {
        isManualMode = false;
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
 * Checks if there is currently text selected and either enables or diables the import button.
 */
function selectedTextCheck() {
    if (isManualMode) {
        if (getSelectedText() !== '') {
            ipcRenderer.sendToHost('enable-man-import');
        } else {
            ipcRenderer.sendToHost('disable-man-import');
        }
    }
}

/**
 * Checks if there are elements that are currently highlighted.
 */
function selectedElementsCheck() {
    if (autoSelectedElements.length() > 0) {
        ipcRenderer.sendToHost('enable-auto-import');
    } else {
        ipcRenderer.sendToHost('disable-auto-import');
    }
}

/**
 * This will initialize listeners that dynamically track whether text is selected or not.
 * NOTE: Setting these three event listeners ensures that it is always checking whether text is selected.
 */
function initMouseEventListeners() {
    // This is specifically used to prevent browser key-combination events when selecting elements
    document.addEventListener('click', function(e) {
        if (!isManualMode && e.ctrlKey) {
            e.preventDefault()
            e.stopPropagation();
        } 
    }, true);

    document.addEventListener('mousemove', () => {
        selectedTextCheck();
    });

    document.addEventListener('mouseup', async () => {
        // Delay to allow selection to update
        await delay(50);    
        selectedTextCheck();
    });

    document.addEventListener('mousedown', handleSelectEvent);
}

async function handleSelectEvent(event) {
    // Delay to allow selection to update
    makeLog(isManualMode)
    if (isManualMode) {
        if (event) {
            await delay(50);
            selectedTextCheck();
        }
    } else {
        if (event.ctrlKey) {
            element = window.document.elementFromPoint(event.clientX, event.clientY)
            if (!element.classList.contains('jiws-selected')) {
                element.classList.add('jiws-selected')
                element.style.outline = '#f00 solid 2px'
                text = element.innerText || element.textContent
                makeLog(text)
            } else {
                element.classList.remove('jiws-selected')
                element.style.outline = ''
            }
        }
    }
}

function makeLog(log) {
    ipcRenderer.sendToHost('log', log)
}