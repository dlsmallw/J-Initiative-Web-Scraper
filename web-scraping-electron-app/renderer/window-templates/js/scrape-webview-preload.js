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
document.addEventListener('DOMContentLoaded', (e) => {
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

    document.addEventListener('mouseenter', makeLog('mouse entered webview'))
    document.addEventListener('mouseleave', makeLog('mouse left webview'))

    // document.getElementsByTagName('body').addEventListener('focusin', makeLog('Focused'))

    initKeyMouseEventListeners()
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
function initKeyMouseEventListeners() {

    // This is specifically used to prevent browser key-combination events when selecting elements
    document.addEventListener('keydown', (e) => {
        makeLog(`${e.key} pressed`)
        if (!isManualMode) {
            if (e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
            } 
        }
    }, true);

    document.addEventListener('keyup', (e) => {
        makeLog(`${e.key} released`)
        if (e.ctrlKey || e.key === 'Control') {
            if (autoCurrHoveredElement !== null) {
                autoCurrHoveredElement.style.backgroundColor = '';
                autoCurrHoveredElement = null;
            }  
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isManualMode) {
            selectedTextCheck();
        } else {
            if (e.ctrlKey) {
                element = window.document.elementFromPoint(e.clientX, e.clientY)
                if (!element.isEqualNode(autoCurrHoveredElement)) {
                    if (autoCurrHoveredElement === null) {
                        autoCurrHoveredElement = element
                        autoCurrHoveredElement.style.backgroundColor = 'rgba(0,0,0,0.2)';
                    } else {
                        autoCurrHoveredElement.style.backgroundColor = '';
                        autoCurrHoveredElement = element
                        autoCurrHoveredElement.style.backgroundColor = 'rgba(0,0,0,0.2)';
                    }
                } 
            } else {
                autoCurrHoveredElement.style.backgroundColor = '';
                autoCurrHoveredElement = null;
            }
        }
    });

    document.addEventListener('mouseup', async (e) => {
        // Delay to allow selection to update
        await delay(50);    
        selectedTextCheck();
    });

    document.addEventListener('mousedown', async (e) => {
        if (isManualMode) {
            // Delay to allow selection to update
            if (e) {
                await delay(50);
                selectedTextCheck();
            }
        } else {
            if (e.ctrlKey) {
                element = window.document.elementFromPoint(e.clientX, e.clientY)
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
    });
}

function makeLog(log) {
    ipcRenderer.sendToHost('log', log)
}