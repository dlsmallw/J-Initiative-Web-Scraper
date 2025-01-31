// webview_preload.js

// Import the ipcRenderer module from Electron
const { ipcRenderer } = require('electron');

// Structure used for filtering selected elements to exclude non-textual elements
const EXCLUDED_TAGS = new Set([
    "HEAD", "TITLE", "BASE", "LINK", "META", "STYLE", "SCRIPT", "NOSCRIPT",
    "IMG", "VIDEO", "AUDIO", "CANVAS", "SVG", "PICTURE", "SOURCE", "TRACK", 
    "MAP", "AREA", "FORM", "INPUT", "TEXTAREA", "BUTTON", "SELECT", "OPTION", 
    "OPTGROUP", "LABEL", "FIELDSET", "LEGEND", "DATALIST", "OUTPUT", "PROGRESS", 
    "METER", "DETAILS", "SUMMARY", "DIALOG", "MENU", "TABLE", "CAPTION", "THEAD", 
    "TBODY", "TFOOT", "TR", "TH", "TD", "COL", "COLGROUP"
]);

// Creates a time delay for events
const delay = (timeDelay) => new Promise(resolve => setTimeout(resolve, timeDelay));
const SEL_CLASS = 'jiws-selected';

// Used to classify if in manual or auto selection mode
var isManualMode = false;

// objects used while in auto mode
var currElementOver = null;
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
        hotKeyDown = false;
    });

    ipcRenderer.on('auto-selection-mode', (e) => {
        isManualMode = false;
        clearTextSelection();
        selectedElementsCheck();
        hotKeyDown = false;
    });

    ipcRenderer.on('key-down', (e) => {
        hotKeyDown = true;
        element = window.document.elementFromPoint(currMouseX, currMouseY)
        if (!isManualMode && currElementOver === null) {
            if (webviewFocused) {
                hoveredElement(element);
            }
        } 
    });

    ipcRenderer.on('key-up', (e) => {
        hotKeyDown = false;
        releaseHoveredElement();
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

/**
 * Forms an individual data object for a single piece of text data (with the associated URL).
 * @param {*} dataURL String        The url the data was taken from.
 * @param {*} textData String       The data.
 * @returns JSONObject      The data object with the data.
 */
function formIndivDataResObj(dataURL, textData) {
    return {
        url: dataURL,
        data: textData
    }
}

/**
 * Forms a response object to return selected data from manual scrape to the main process.
 * @returns JSONObject      The response with the data.
 */
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
 * Clears currently highlighted text (manual mode).
 */
function clearTextSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

/**
 * Checks if there are elements that are currently highlighted.
 */
function selectedElementsCheck() {
    if (document.querySelectorAll(`.${SEL_CLASS}`).length > 0) {
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
        if (!isManualMode && hotKeyDown) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    document.addEventListener('keydown', (e) => {
        if (e.key === hotKey) {
            hotKeyDown = true;
        }

        element = window.document.elementFromPoint(currMouseX, currMouseY);
        if (!isManualMode && hotKeyDown) {
            if (webviewFocused && currElementOver === null) {
                hoveredElement(element);
            } 
            selectedElementsCheck();
        }
    }, true);

    document.addEventListener('keyup', (e) => {
        if (e.key === hotKey) {
            hotKeyDown = false;
            releaseHoveredElement();
        }
    });

    document.addEventListener('mousemove', (e) => {
        currMouseX = e.clientX;
        currMouseY = e.clientY;

        if (isManualMode) {
            selectedTextCheck();
        } else {
            clearTextSelection();
            if (webviewFocused && hotKeyDown) {
                element = window.document.elementFromPoint(currMouseX, currMouseY);
                if (!element.isEqualNode(currElementOver)) {
                    if (currElementOver === null) {
                        hoveredElement(element);
                    } else {
                        releaseHoveredElement();
                        hoveredElement(element);
                    }
                } 
            } else {
                releaseHoveredElement();
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
            if (hotKeyDown) {
                element = window.document.elementFromPoint(currMouseX, currMouseY);
                if (!element.classList.contains(SEL_CLASS)) {
                    selectElement(element);
                } else {
                    deselectElement(element);
                }
            }
            selectedElementsCheck();
        }
    });
}

/**
 * Used to filter out text data when a child element is elected along with their parent element.
 * @param {*} element       The element to be checked.
 * @returns Boolean         If the elements parent is selected.
 */
function checkAncestorSelected(element) {
    var parent = element.parentElement
    if (parent !== null && parent.tagName != 'BODY') {
        if (parent.classList.contains(SEL_CLASS)) {
            return true;
        } else {
            return checkAncestorSelected(parent);
        }
    } else {
        return false;
    }
}

/**
 * Applies a hovered 'highlight' effect.
 * @param {*} element       The element hovered.
 */
function hoveredElement(element) {
    if (element && !EXCLUDED_TAGS.has(element.tagName)) {
        currElementOver = element;
        currElementOver.style.backgroundColor = 'rgba(0,0,0,0.2)';
    }
}

/**
 * Removes the hovered effect.
 */
function releaseHoveredElement() {
    if (currElementOver !== null) {
        currElementOver.style.backgroundColor = '';
        currElementOver = null;
    }  
}

/**
 * Applies a selected effect to elements that are selected when in auto mode.
 * @param {*} element       The element to be selected.
 */
function selectElement(element) {
    if (element && !EXCLUDED_TAGS.has(element.tagName)) {
        element.classList.add(SEL_CLASS);
        element.style.outline = '#f00 solid 2px';
    }
}

/**
 * Removes the selected effect from a selected element.
 * @param {*} element       The element to be deselected.
 */
function deselectElement(element) {
    if (element) {
        element.style.outline = '';
        element.classList.remove(SEL_CLASS);
    }
}

/**
 * Removes the selected effect from all selected elements.
 */
function deselectAllElements() {
    document.querySelectorAll(`.${SEL_CLASS}`).forEach(element => {
        deselectElement(element);
    });
}


/**
 * Extracts the text data from all selected elements while also filtering out duplicate data.
 * @returns Array[String]       The array of text data.
 */
function processSelectedElems() {
    var textArr = []
    document.querySelectorAll(`.${SEL_CLASS}`).forEach((elem) => {
        if (!EXCLUDED_TAGS.has(elem.tagName)) {
            if (!checkAncestorSelected(elem)) {
                text = elem.innerText || elem.textContent;
                if (text !== null && text !== '') {
                    textArr.push(text.trim());
                }
            }
            
        }
    });
    return textArr;
}

/**
 * Combines all text data pulled from the page into a single data item.
 * @returns JSONObject          The response object containing the data.
 */
function combineSelToResObj() {
    var url = window.location.href.toString();
    var concatItem = '';

    processSelectedElems().forEach((text) => {
        if (text !== null && text !== '') {
            if (concatItem.indexOf(text) === -1) concatItem += `${text} `;
        } 
    });
    deselectAllElements();
    return [formIndivDataResObj(url, concatItem)];
}

/**
 * Extracts all text data pulled from the page into individual data items.
 * @returns JSONObject          The response object containing the extracted data.
 */
function indivSelToResObj() {
    var url = window.location.href.toString();
    var resObj = [];

    processSelectedElems().forEach((text) => {
        dataObj = formIndivDataResObj(url, text);
        resObj.push(dataObj);
    });
    deselectAllElements();
    return resObj;
}


/**
 * Helper function to facilitate logs from within the webview context.
 * @param {*} log String        The log.
 */
function makeLog(log) {
    ipcRenderer.sendToHost('log', log)
}

