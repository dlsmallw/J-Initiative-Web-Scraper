//webview_renderer.js
const ipcRenderer = window.urlScrape;
// Used for tracking what mode the tool is in
var auto_scrape_mode = true

var inWebview = false
var hotKey = null
var hotkeyChangeInProgress = false

document.addEventListener('DOMContentLoaded', () => {
    initScrapeWindow();
    initDataContainer();
    initWinListeners();
    initScrapeUtilListeners();
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
        console.log('auto-importCombBtn')
        webview.send('get-selected-elem-combined');
    })

    $('#auto-importSepBtn').on('click', () => {
        console.log('auto-importSepBtn')
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

    $('#hotkey-set-container').on('click', () => {
        hotkeyChangeRequested()
    })

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
            case 'log':
                console.log(data);
                break;
            case 'request-hotkey':
                webview.send('set-hotkey', hotKey)
                break;
            default:
                break;
        }
    });

    // Export data from textarea to the main process
    $('#exportBtn').on('click', () => {
        const dataToExport = getAllReadyData();
        exportDataToApp(JSON.stringify(dataToExport));
    });

    webview.addEventListener('mouseenter', (e) => {
        inWebview = true;
        if (!hotkeyChangeInProgress) {
            webview.send('in-webview-frame');
        }
    });

    webview.addEventListener('mouseleave', (e) => {
        inWebview = false;
        if (!hotkeyChangeInProgress) {
            webview.send('outside-webview-frame');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (hotkeyChangeInProgress) {
            e.preventDefault()
            e.stopPropagation()
            setHotKey(e.key);
        } else {
            if (inWebview && e.key === hotKey) {
                e.preventDefault()
                e.stopPropagation()
                webview.send('key-down')
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if (hotkeyChangeInProgress) {
            webview.send('set-hotkey', hotKey);
            if (inWebview) {
                webview.send('in-webview-frame');
            } else {
                webview.send('outside-webview-frame');
            }
            hotkeyChangeInProgress = false;
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
    $('#man-mode').hide()

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
 * Checks if there are any currently selected data itmes in the list.
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
    $('#man-importCombBtn').prop('disabled', false);
}

/**
 * Disables the manual-mode import button.
 */
function disableManImportBtn() {
    $('#man-importCombBtn').prop('disabled', true);
}

/**
 * Enables the auto-mode import buttons.
 */
function enableAutoImportBtns() {
    $('#auto-importCombBtn').prop('disabled', false);
    $('#auto-importSepBtn').prop('disabled', false);
}

/**
 * Disables the auto-mode import buttons.
 */
function disableAutoImportBtns() {
    $('#auto-importCombBtn').prop('disabled', true);
    $('#auto-importSepBtn').prop('disabled', true);
}

function hotkeyChangeRequested() {
    console.log('hotkey change initiated');
    hotkeyChangeInProgress = true;
    $('#hotkey-set-icon').addClass('hotkey-change-in-progress');
    $('#hotkey-text').addClass('hotkey-change-in-progress');
    $('#curr-hotkey-text').text('Press a Key to Change...');
}

function setHotKey(newHotKey) {
    if (newHotKey) {    
        console.log('hotkey changed');
        hotKey = newHotKey;
        localStorage.setItem('scrape-hotkey', hotKey);
        $('#curr-hotkey-text').text(hotKey);
    } 

    $('#hotkey-set-icon').removeClass('hotkey-change-in-progress');
    $('#hotkey-text').removeClass('hotkey-change-in-progress');
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