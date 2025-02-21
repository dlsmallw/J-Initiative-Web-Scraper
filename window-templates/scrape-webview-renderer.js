//webview_renderer.js
const ipcRenderer = window.urlScrape;

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDataContainer();
    initWinListeners();
    initScrapeUtilListeners();
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
    $('#importSelectedBtn').on('click', () => {
        webview.send('getSelected'); // Request selected text from the webview
    });

    // Handle messages from the webview
    webview.addEventListener('ipc-message', (event) => {
        const channel = event.channel;
        const data = event.args[0];

        if (channel === 'selection') {
            var res = JSON.parse(data);
            appendNewScrapedItem(res);
        }

        // may be pointless
        if (channel === 'export') {
            exportDataToApp(exportData);
        }

        if (channel === 'enable-import') {
            enableImportBtn();
        }

        if (channel === 'disable-import') {
            disableImportBtn();
        }
    });

    // Export data from textarea to the main process
    $('#exportBtn').on('click', () => {
        const dataToExport = getAllReadyData();
        exportDataToApp(JSON.stringify(dataToExport));
    });
}

/**
 * Initializes the UI elements within the data container.
 */
function initDataContainer() {
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
 * @param {*} dataObj       The data to be added.
 */
function appendNewScrapedItem(dataObj) {
    var $newLI = $('<a>', {
        href: '#',
        class: 'list-group-item list-group-item-action scrape-item',
        style: 'border-width: 0px 0px 3px 0px;'
    });

    $newLI.text(dataObj.data);
    $newLI.attr('data-url', dataObj.url)

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
 * Enables the import button.
 */
function enableImportBtn() {
    $('#importSelectedBtn').prop('disabled', false);
}

/**
 * Disables the import button.
 */
function disableImportBtn() {
    $('#importSelectedBtn').prop('disabled', true);
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