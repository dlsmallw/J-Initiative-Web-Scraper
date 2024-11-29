//webview_renderer.js
const ipcRenderer = window.urlScrape;

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDataContainer();
    initWinListeners();
    initScrapeUtilListeners();
});

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

function initWinListeners() {
    $('#exit-scrape-win-btn').on('click', () => {
        ipcRenderer.sendCloseSignal();
    });
}

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
            console.log('Selected text received from webview:', data);
            var res = JSON.parse(data);

            appendNewScrapedItem(res);
        }

        // may be pointless
        if (channel === 'export') {
            console.log('Exported data received from webview:', data);
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

function appendNewScrapedItem(dataObj) {
    var $newLI = $('<a>', {
        href: '#', 
        class: 'list-group-item list-group-item-action scrape-item'
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

function clearScrapedList() {
    $('#data-list').empty();
    $('#data-container').hide();
    $('#clear-sel-btn').hide();
}

function checkIfAnyActive() {
    $('#data-list').children('.scrape-item').each(() => {
        if ($(this).hasClass('active')) {
            return true;
        }
    });
    return false;
}

function getAllReadyData() {
    var scrapedData = [];

    var elemArr = $('.scrape-item');

    for (var i = 0; i < elemArr.length; i++) {
        var dataURL = $(elemArr[i]).attr('data-url');
        var textData = $(elemArr[i]).text();

        console.log(dataURL);
        console.log(textData);

        scrapedData.push({
            url: dataURL,
            data: textData
        });
    }

    return scrapedData;
}

function enableImportBtn() {
    $('#importSelectedBtn').prop('disabled', false);
    console.log('Import enabled');
}

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
        console.log('Exported data sent to main process:', data);
        ipcRenderer.sendCloseSignal();
    } else {
        alert('No data to export!');
        console.log('Export button clicked with no data in textarea.');
    }
}