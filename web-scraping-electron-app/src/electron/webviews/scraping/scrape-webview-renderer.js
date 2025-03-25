/**
 * Manages rendering and setup of the scrape webview.
 */


//webview_renderer.js
console.log("🔥 webview_renderer.js loaded");

const ipcRenderer = window.urlScrape;
//database API
databaseAPI = window.databaseAPI;
// Used for tracking what mode the tool is in
var auto_scrape_mode = true

// Variables used for tracking the state of various events and settings
var inWebview = false
var hotKey = null
var changingHotKey = false

document.addEventListener('DOMContentLoaded', () => {
    initScrapeWindow();
    initDataContainer();
    initWinListeners();
    initScrapeUtilListeners();

    disableAutoImportBtns();
    disableManImportBtn();
});

/**
 * Initializes the theme used for the window.
 */
function initScrapeWindow() {
    // Load the saved theme from localStorage if it exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.className = savedTheme; // Apply saved theme to the document
    } else {
        // Set default theme if none is saved
        document.documentElement.className = 'light-theme';
    }

    // Load the saved theme from localStorage if it exists
    const savedHotKey = localStorage.getItem('scrape-hotkey');
    if (savedHotKey) {
        hotKey = savedHotKey; // Set used hotkey
    } else {
        // Set default theme if none is saved
        hotKey = 'Control';
        localStorage.setItem('scrape-hotkey', hotKey);
    }
    setHotKey(hotKey);
}

/**
 * Initializes the windows listeners.
 */
function initWinListeners() {
    $('#exit-scrape-win-btn').on('click', () => {
        ipcRenderer.sendCloseSignal();
    });
}

/**
 * Initializes any scrape functionality related listeners.
 */
function initScrapeUtilListeners() {
    // Listen for 'setUrl' messages from the main process to set the webview's URL
    ipcRenderer.receive('setUrl', (url) => {
        $('#webview-element').attr('src', url); // Set the webview source to the received URL
    });

    const webview = document.getElementById('webview-element');

    // Import selected text from the webview
    $('#man-importCombBtn').on('click', () => {
        webview.send('getSelected'); // Request selected text from the webview
    });

    $('#auto-importCombBtn').on('click', () => {
        webview.send('get-selected-elem-combined');
    })

    $('#auto-importSepBtn').on('click', () => {
        webview.send('get-selected-elem-individual');
    })

    $('#text-sel-toggle').on('change', async () => {
        isChecked = document.getElementById('text-sel-toggle').checked
        chann = '';

        if (isChecked) {
            chann = 'man-selection-mode';
            $('#auto-mode').hide();
            $('#man-mode').show();
        } else {
            chann = 'auto-selection-mode';
            $('#man-mode').hide();
            $('#auto-mode').show();
        }

        webview.send(chann);
    });

    $('#hotkey-change-btn').on('click', () => {
        hotkeyChangeRequested();
    });

    // Handle messages from the webview
    webview.addEventListener('ipc-message', (event) => {
        const channel = event.channel;
        const data = event.args[0];

        switch(channel) {
            case 'selection':
                var res = JSON.parse(data);
                appendNewScrapedItem(res);
                break;
            case 'export':
                exportDataToApp(exportData);
                break;
            case 'enable-man-import':
                enableManImportBtn();
                break;
            case 'disable-man-import':
                disableManImportBtn();
                break;
            case 'enable-auto-import':
                enableAutoImportBtns();
                break;
            case 'disable-auto-import':
                disableAutoImportBtns();
                break;
            case 'request-hotkey':
                webview.send('set-hotkey', hotKey)
                break;
            case 'log':
                console.log(data);
                break;
            default:
                break;
        }
    });

    // Export data from textarea to the main process
    $('#exportBtn').on('click', () => {
        const dataToExport = getAllReadyData();
        exportDataToApp(JSON.stringify(dataToExport));
        addDataToDatabase();
    });

    webview.addEventListener('mouseenter', (e) => {
        inWebview = true;
        if (!changingHotKey) {
            webview.send('in-webview-frame');
        }
    });

    webview.addEventListener('mouseleave', (e) => {
        inWebview = false;
        if (!changingHotKey) {
            webview.send('outside-webview-frame');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (changingHotKey) {
            e.preventDefault();
            e.stopPropagation();
            setHotKey(e.key);
        } else {
            if (inWebview && e.key === hotKey) {
                e.preventDefault();
                e.stopPropagation();
                webview.send('key-down')
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if (changingHotKey) {
            webview.send('set-hotkey', hotKey);
            enableWebview();
            enableModeSelector();

            if (inWebview) {
                webview.send('in-webview-frame');
            } else {
                webview.send('outside-webview-frame');
            }
            changingHotKey = false;
        } else {
            if (inWebview && e.key === hotKey) {
                webview.send('key-up')
            }
        }
    });
}

/**
 * Initializes the UI elements within the data container.
 */
function initDataContainer() {
    $('#man-mode').hide();
    $('#sel-cont-overlay').hide();

    $('#data-container').hide();
    $('#clear-sel-btn').hide();

    $('#clear-sel-btn').on('click', () => {
        removeSelectedItems();
    });

    $('#clear-all-btn').on('click', () => {
        clearScrapedList();
    });
}

/**
 * Appends a new data item to the list of scraped data.
 * @param {*} data       The data to be added.
 */
function appendNewScrapedItem(data) {
    for (index in data) {
        item = data[index];

        var $newLI = $('<a>', {
            href: '#', 
            class: 'list-group-item list-group-item-action scrape-item',
            style: 'border-width: 0px 0px 3px 0px;'
        });
    
        $newLI.text(item.data);
        $newLI.attr('data-url', item.url)
    
        $newLI.on('click', () => {
            if ($newLI.hasClass('active')) {
                $newLI.removeClass('active');
    
                if (!checkIfAnyActive()) {
                    $('#clear-sel-btn').hide();
                }
            } else {
                $newLI.addClass('active');
                $('#clear-sel-btn').show();
            }
        });
    
        $('#data-list').append($newLI);
    }
    
    $('#data-container').show();
}

/**
 * Appends a new data item to the database
 */
function addDataToDatabase() {
  const dataToExport = getAllReadyData();
  this.databaseAPI.addScrapedDataToDatabase(dataToExport);
  ipcRenderer.sendCloseSignal();
}

/**
 * Removes any currently selected items from the data list.
 */
function removeSelectedItems() {
    $('.active').remove();

    if (!checkIfAnyActive()) {
        $('#clear-sel-btn').hide();
    }

    if ($('#data-list').children().length === 0) {
        $('#data-container').hide();
        $('#clear-sel-btn').hide();
    }
}

/**
 * Removes all items from the data list.
 */
function clearScrapedList() {
    $('#data-list').empty();
    $('#data-container').hide();
    $('#clear-sel-btn').hide();
}

/**
 * Checks if there are any currently selected data items in the list.
 * @returns         Boolean indicating if there are any selected items.
 */
function checkIfAnyActive() {
    if ($('#data-list').children('.active').length > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Takes all data within the data list and prepares it for importing it into the 
 * main application.
 * @returns         An array of the data list items.
 */
function getAllReadyData() {
    var scrapedData = [];

    var elemArr = $('.scrape-item');

    for (var i = 0; i < elemArr.length; i++) {
        var dataURL = $(elemArr[i]).attr('data-url');
        var textData = $(elemArr[i]).text();

        scrapedData.push({
            url: dataURL,
            data: textData
        });
    }

    return scrapedData;
}

/**
 * Enables the manual-mode import button.
 */
function enableManImportBtn() {
    $('#man-importCombBtn')
        .prop('disabled', false)
        .removeClass('element-disabled');
}

/**
 * Disables the manual-mode import button.
 */
function disableManImportBtn() {
    $('#man-importCombBtn')
        .prop('disabled', true)
        .addClass('element-disabled');
}

/**
 * Enables the auto-mode import buttons.
 */
function enableAutoImportBtns() {
    $('#auto-importCombBtn')
        .prop('disabled', false)
        .removeClass('element-disabled');
    $('#auto-importSepBtn')
        .prop('disabled', false)
        .removeClass('element-disabled');
}

/**
 * Disables the auto-mode import buttons.
 */
function disableAutoImportBtns() {
    $('#auto-importCombBtn')
        .prop('disabled', true)
        .addClass('element-disabled');
    $('#auto-importSepBtn')
        .prop('disabled', true)
        .addClass('element-disabled');
}

/**
 * Places a transparent overlay over the webview panel to prevent interactions.
 */
function enableWebview() {
    $('#webview-overlay').hide();
    $('#sel-cont-overlay').hide();
}

/**
 * Removes the webview overlay from webview panel.
 */
function disableWebview() {
    $('#webview-overlay').show();
    $('#sel-cont-overlay').show();
}

/**
 * Disables the mode selection toggle button.
 */
function disableModeSelector() {
    $('#scrape-mode-toggle-container').addClass('element-disabled');
    $('#text-mode-label').addClass('element-disabled');
    $('#text-sel-toggle').prop('disabled', true)
}

/**
 * Enables the mode selection toggle button.
 */
function enableModeSelector() {
    $('#scrape-mode-toggle-container').removeClass('element-disabled');
    $('#text-mode-label').removeClass('element-disabled');
    $('#text-sel-toggle').prop('disabled', false);
}

/**
 * Handles visual changes when in the process of changing the hotkey button.
 */
function hotKeySettingChanging() {
    tempColor = '#ff6363';
    $('#hotkey-set-icon').css('fill', tempColor);
    $('#hotkey-text').css('color', tempColor);
    $('#hotkey-change-btn')
        .css('pointer-events', 'none')
        .css('cursor', 'default')
}

/**
 * Resets the visuals of the hotkey settings style to default.
 */
function hotKeySettingNormal() {
    $('#hotkey-set-icon').css('fill', '')
    $('#hotkey-text').css('color', '')
    $('#hotkey-change-btn')
        .css('pointer-events', '')
        .css('cursor', '')
}

/**
 * Handles hotkey change logic.
 */
function hotkeyChangeRequested() {
    disableWebview()
    hotKeySettingChanging();
    disableModeSelector();
    disableManImportBtn();
    disableAutoImportBtns();

    $('#curr-hotkey-text').text('Press a Key to Change...');
    console.log('hotkey change initiated');
    changingHotKey = true;
}

/**
 * Handles checking the selected hotkey is valid and sets it.
 */
function setHotKey(newHotKey) {
    // These keys generally should not be used fir browser hotkey events
    var prohibitedKeys = [
        'Tab', 'Enter', 'Pause', 'CapsLock', 'Escape', 'PageUp', 'PageDown', 'End', 'Home', 'PrintScreen', '`',
        'Insert', 'Delete', 'Meta', 'ContextMenu', 'NumLock', 'ScrollLock', 'AudioVolumeMute', 'AudioVolumeDown', 
        'AudioVolumeUp', 'LaunchMediaPlayer', 'LaunchApplication1', 'LaunchApplication2', ' '
    ];

    if (newHotKey && !prohibitedKeys.includes(newHotKey)) {    
        hotKey = newHotKey;
        localStorage.setItem('scrape-hotkey', hotKey);
        $('#curr-hotkey-text').text(hotKey);
    } 

    hotKeySettingNormal()
    $('#curr-hotkey-text').text(hotKey);
}

/**
 * Function that consolidates the data export to a central location.
 * @param {*} data      Data to export.
 */
function exportDataToApp(data) {
    if (data) {
        ipcRenderer.send('scrapedData:export', data);
        ipcRenderer.sendCloseSignal();
    } else {
        alert('No data to export!');
    }
}
