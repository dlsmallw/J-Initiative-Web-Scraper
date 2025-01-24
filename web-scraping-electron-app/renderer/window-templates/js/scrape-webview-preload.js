// webview_preload.js

// Import the ipcRenderer module from Electron
const { ipcRenderer } = require('electron');

// Creates a time delay for events
const delay = (timeDelay) => new Promise(resolve => setTimeout(resolve, timeDelay));

var interactionsDisabled = false;
var isManualMode = false;


// objects used while in auto mode
var autoCurrHoveredElement = null;
var webviewFocused = false;
var hotKeyDown = false;
var hotKey = null;

var currMouseX = 0;
var currMouseY = 0;



// Export button listener inside the webview
document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.sendToHost('request-hotkey');

    ipcRenderer.on('set-hotkey', (e, key) => {
        hotKey = key;
        hotKeyDown = false;
        makeLog(`Hotkey Changed to ${hotKey}`);
    });

    // Listen for 'getSelected' messages from the host (renderer process)
    ipcRenderer.on('getSelected', (e) => {
        var resObj = manualTextScrape();
        // When received, send the selected text back to the host using 'ipcRenderer.sendToHost'
        ipcRenderer.sendToHost('selection', JSON.stringify(resObj));
    });

    ipcRenderer.on('get-selected-elem-combined', (e) => {
        var resObj = combineSelToResObj();
        // When received, send the selected text back to the host using 'ipcRenderer.sendToHost'
        ipcRenderer.sendToHost('selection', JSON.stringify(resObj));
    });

    ipcRenderer.on('get-selected-elem-individual', (e) => {
        var resObj = indivSelToResObj();
        // When received, send the selected text back to the host using 'ipcRenderer.sendToHost'
        ipcRenderer.sendToHost('selection', JSON.stringify(resObj));
    });

    ipcRenderer.on('man-selection-mode', (e) => {
        isManualMode = true;
        deselectAllElements();
        selectedTextCheck();
    });

    ipcRenderer.on('auto-selection-mode', (e) => {
        isManualMode = false;
        selectedElementsCheck();
    });

    ipcRenderer.on('key-down', (e) => {
        hotKeyDown = true
        element = window.document.elementFromPoint(currMouseX, currMouseY)
        if (!isManualMode) {
            if (autoCurrHoveredElement === null) {
                if (webviewFocused) {
                    autoCurrHoveredElement = element
                    autoCurrHoveredElement.style.backgroundColor = 'rgba(0,0,0,0.2)';
                }
            } 
        }
    });

    ipcRenderer.on('key-up', (e) => {
        hotKeyDown = false
        if (autoCurrHoveredElement !== null) {
            autoCurrHoveredElement.style.backgroundColor = '';
            autoCurrHoveredElement = null;
        }  
    });

    ipcRenderer.on('in-webview-frame', (e) => {
        webviewFocused = true;
    });

    ipcRenderer.on('outside-webview-frame', (e) => {
        webviewFocused = false;
        releaseHoveredElement();
    });

    initKeyMouseEventListeners();
});

function formIndivDataResObj(dataURL, textData) {
    return {
        url: dataURL,
        data: textData
    }
}

function manualTextScrape() {
    url = window.location.href.toString();
    text = getSelectedText();
    dataObj = formIndivDataResObj(url, text);
    return [dataObj];
}

/**
 * Function to get the currently selected text in the webview
 * @returns Array      The formatted response object.
 */
function getSelectedText() {
    return window.getSelection().toString().trim();
}

/**
 * Checks if there is currently text selected and either enables or diables the import button.
 */
function selectedTextCheck() {
    if (getSelectedText() !== '') {
        ipcRenderer.sendToHost('enable-man-import');
    } else {
        ipcRenderer.sendToHost('disable-man-import');
    }
    
}

/**
 * Checks if there are elements that are currently highlighted.
 */
function selectedElementsCheck() {
    if (document.querySelectorAll('.jiws-selected').length > 0) {
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
    document.addEventListener('click', (e) => {
        if (!isManualMode) {
            if (hotKeyDown) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, true);

    document.addEventListener('keydown', (e) => {
        
        if (e.key === hotKey) {
            makeLog(`${e.key} pressed`)
            hotKeyDown = true
        }

        element = window.document.elementFromPoint(currMouseX, currMouseY);
        if (!isManualMode && hotKeyDown) {
            if (autoCurrHoveredElement === null) {
                if (webviewFocused) {
                    hotKeyDown = true;
                    autoCurrHoveredElement = element;
                    autoCurrHoveredElement.style.backgroundColor = 'rgba(0,0,0,0.2)';
                }
            } 
            selectedElementsCheck();
        }
    }, true);

    document.addEventListener('keyup', (e) => {
        hotKeyDown = false;
        releaseHoveredElement();
    });

    document.addEventListener('mousemove', (e) => {
        currMouseX = e.clientX;
        currMouseY = e.clientY;

        if (isManualMode) {
            selectedTextCheck();
        } else {
            if (webviewFocused && hotKeyDown) {
                element = window.document.elementFromPoint(currMouseX, currMouseY);
                if (!element.isEqualNode(autoCurrHoveredElement)) {
                    if (autoCurrHoveredElement === null) {
                        autoCurrHoveredElement = element;
                        autoCurrHoveredElement.style.backgroundColor = 'rgba(0,0,0,0.2)';
                    } else {
                        releaseHoveredElement();
                        autoCurrHoveredElement = element;
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
            if (e.key === hotKey) {
                hotKeyDown = True
            }

            if (hotKeyDown) {
                element = window.document.elementFromPoint(currMouseX, currMouseY);
                if (!element.classList.contains('jiws-selected')) {
                    selectElement(element);
                } else {
                    deselectElement(element);
                }
            }
            selectedElementsCheck();
        }
    });
}

function releaseHoveredElement() {
    if (autoCurrHoveredElement !== null) {
        autoCurrHoveredElement.style.backgroundColor = '';
        autoCurrHoveredElement = null;
    }  
}

function selectElement(element) {
    if (element) {
        element.classList.add('jiws-selected');
        element.style.outline = '#f00 solid 2px';
    }
}

function deselectElement(element) {
    if (element) {
        element.style.outline = '';
        element.classList.remove('jiws-selected');
    }
}

function deselectAllElements() {
    document.querySelectorAll('.jiws-selected').forEach(element => {
        deselectElement(element);
    });
}

function combineSelToResObj() {
    var url = window.location.href.toString();
    var concatItem = '';

    document.querySelectorAll('.jiws-selected').forEach((elem) => {
        text = elem.innerText || elem.textContent;
        if (text !== null && text !== '') concatItem += `${text} `;
    });
    deselectAllElements();
    var data = concatItem;
    var dataObj = formIndivDataResObj(url, data);
    return [dataObj];
}

function indivSelToResObj() {
    var url = window.location.href.toString();
    var resObj = [];

    document.querySelectorAll('.jiws-selected').forEach((elem) => {
        text = elem.innerText || elem.textContent;
        if (text !== null && text !== '') {
            dataObj = formIndivDataResObj(url, text);
            resObj.push(dataObj);
        }
    });
    deselectAllElements();
    return resObj;
}

function makeLog(log) {
    ipcRenderer.sendToHost('log', log)
}