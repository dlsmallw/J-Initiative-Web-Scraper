/**
* @file scrape-webview-renderer.js
* @module Renderer-ScrapeWebview
* @description Renderer script for the scraping webview window in the Electron app.
*
* This module:
* - Initializes the scrape window UI and theme
* - Supports toggling between manual and automatic scraping modes
* - Handles hotkey configuration for scraping
* - Receives scraped data from webview and exports it to the main process
* - Interacts with the webview element and listens for custom IPC messages
*
* @requires window.urlScrape - IPC bridge for communication with main process
* @requires window.databaseAPI - API for saving scraped data to Firebase
*
* @example
* // Manual mode selection
* $('#man-importCombBtn').on('click', () => webview.send('getSelected'));
*
* // Export data
* const data = getAllReadyData();
* exportDataToApp(JSON.stringify(data));
*/

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
    * Initializes theme and hotkey settings when the scrape window loads.
    * @function initScrapeWindow
    * @memberof module:Renderer-ScrapeWebview
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
    * Initializes event listeners for window-specific UI elements.
    * @function initWinListeners
    * @memberof module:Renderer-ScrapeWebview
    */
    function initWinListeners() {
        $('#exit-scrape-win-btn').on('click', () => {
            ipcRenderer.sendCloseSignal();
        });
    }

    /**
    * Initializes event listeners for scraping logic, interaction with webview, and hotkey controls.
    * @function initScrapeUtilListeners
    * @memberof module:Renderer-ScrapeWebview
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
    * Initializes the data container UI elements and clear buttons.
    * @function initDataContainer
    * @memberof module:Renderer-ScrapeWebview
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
    * Appends new scraped data to the result list.
    * @function appendNewScrapedItem
    * @memberof module:Renderer-ScrapeWebview
    * @param {Object[]} data - Array of data objects to display.
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
    * Adds scraped data to the database and closes the window.
    * @function addDataToDatabase
    * @memberof module:Renderer-ScrapeWebview
    */
    function addDataToDatabase() {
      const dataToExport = getAllReadyData();
      this.databaseAPI.addScrapedDataToDatabase(dataToExport);
      ipcRenderer.sendCloseSignal();
    }

    /**
    * Removes selected items from the scrape list.
    * @function removeSelectedItems
    * @memberof module:Renderer-ScrapeWebview
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
    * Clears all scraped data from the list and UI.
    * @function clearScrapedList
    * @memberof module:Renderer-ScrapeWebview
    */
    function clearScrapedList() {
        $('#data-list').empty();
        $('#data-container').hide();
        $('#clear-sel-btn').hide();
    }

    /**
    * Checks if any data items are currently selected.
    * @function checkIfAnyActive
    * @memberof module:Renderer-ScrapeWebview
    * @returns {boolean} True if items are selected.
    */
    function checkIfAnyActive() {
        if ($('#data-list').children('.active').length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Collects and returns all scraped data from the DOM.
    * @function getAllReadyData
    * @memberof module:Renderer-ScrapeWebview
    * @returns {Array<Object>} Scraped data array.
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
    * Enables the manual import button.
    * @function enableManImportBtn
    * @memberof module:Renderer-ScrapeWebview
    */
    function enableManImportBtn() {
        $('#man-importCombBtn')
            .prop('disabled', false)
            .removeClass('element-disabled');
    }

    /**
    * Disables the manual import button.
    * @function disableManImportBtn
    * @memberof module:Renderer-ScrapeWebview
    */
    function disableManImportBtn() {
        $('#man-importCombBtn')
            .prop('disabled', true)
            .addClass('element-disabled');
    }

    /**
    * Enables all auto import buttons.
    * @function enableAutoImportBtns
    * @memberof module:Renderer-ScrapeWebview
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
    * Disables all auto import buttons.
    * @function disableAutoImportBtns
    * @memberof module:Renderer-ScrapeWebview
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
    * Hides overlay, enabling interaction with the webview.
    * @function enableWebview
    * @memberof module:Renderer-ScrapeWebview
    */
    function enableWebview() {
        $('#webview-overlay').hide();
        $('#sel-cont-overlay').hide();
    }

    /**
    * Shows overlay, disabling interaction with the webview.
    * @function disableWebview
    * @memberof module:Renderer-ScrapeWebview
    */
    function disableWebview() {
        $('#webview-overlay').show();
        $('#sel-cont-overlay').show();
    }

    /**
    * Disables mode selector toggle.
    * @function disableModeSelector
    * @memberof module:Renderer-ScrapeWebview
    */
    function disableModeSelector() {
        $('#scrape-mode-toggle-container').addClass('element-disabled');
        $('#text-mode-label').addClass('element-disabled');
        $('#text-sel-toggle').prop('disabled', true)
    }

    /**
    * Enables mode selector toggle.
    * @function enableModeSelector
    * @memberof module:Renderer-ScrapeWebview
    */
    function enableModeSelector() {
        $('#scrape-mode-toggle-container').removeClass('element-disabled');
        $('#text-mode-label').removeClass('element-disabled');
        $('#text-sel-toggle').prop('disabled', false);
    }

    /**
    * Adjusts styles for hotkey change state.
    * @function hotKeySettingChanging
    * @memberof module:Renderer-ScrapeWebview
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
    * Resets styles after hotkey change.
    * @function hotKeySettingNormal
    * @memberof module:Renderer-ScrapeWebview
    */
    function hotKeySettingNormal() {
        $('#hotkey-set-icon').css('fill', '')
        $('#hotkey-text').css('color', '')
        $('#hotkey-change-btn')
            .css('pointer-events', '')
            .css('cursor', '')
    }

    /**
    * Initiates hotkey change mode.
    * @function hotkeyChangeRequested
    * @memberof module:Renderer-ScrapeWebview
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
    * Validates and sets new hotkey value.
    * @function setHotKey
    * @memberof module:Renderer-ScrapeWebview
    * @param {string} newHotKey - New hotkey to be set.
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
    * Sends exported data to the main process.
    * @function exportDataToApp
    * @memberof module:Renderer-ScrapeWebview
    * @param {*} data - Data to be exported.
    */
    function exportDataToApp(data) {
        if (data) {
            ipcRenderer.send('scrapedData:export', data);
            ipcRenderer.sendCloseSignal();
        } else {
            alert('No data to export!');
        }
    }