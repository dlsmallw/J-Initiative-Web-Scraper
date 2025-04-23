/**
* @file scrape-page.js
* @fileoverview Controls the behavior and initialization of Scrape page in the UI.
*
* @module PageController-Scrape
*/

/**
* Controller for managing the Scrape page.
*
* @class ScrapePageController
* @memberof module:PageController-Scrape
*/
export class ScrapePageController {
    htmlFilePath = '../src/frontend/components/templates/scrape.html';  // Filepath to HTML component
    name = 'scrape';                  // Page name
    compID = '#scrape-container';     // Page component container ID

    electronAPI = window.electronAPI;
    databaseAPI = window.databaseAPI;
    lsAPI = window.lsAPI;

    /**
    * Get the HTML file path for this page.
    * @function getHtmlCompPath
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {string} The HTML file path.
    */
    getHtmlCompPath() {
        return this.htmlFilePath;
    }

    /**
    * Get the name identifier for this page.
    * @function getName
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {string} The page name.
    */
    getName() {
        return this.name;
    }

    /**
    * Get the DOM container ID for this page component.
    * @function getCompID
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {string} The component container ID.
    */
    getCompID() {
        return this.compID;
    }

    /**
    * Generate the formatted navbar display name for this page.
    * @function navbarName
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {string} The navbar display name.
    */
    navbarName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    /**
    * Initialize the Scrape page.
    * @function initPage
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    initPage() {
        var navLink = $(`<a class="nav-link" id="${this.name}-nav" href="#">${this.navbarName()}</a>`);
        var navbarItem = $(`<li class="nav-item" id="${this.name}"></li>`).append(navLink);

        $('#navbar-ul-1').append(navbarItem);

        const insertElement = async () => {
            $('#d_content').append( await $.get(this.htmlFilePath));
        }

        insertElement().then(() => {
            $('#manual-scrape-container').hide();

            this.initPageListeners();
        });
    }

    /**
    * Initialize event listeners for this page's DOM elements.
    * Handles UI interactions such as linking Label Studio projects and external window management.
    * @function initPageListeners
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    initPageListeners() {
        this.initResultsContainer();

        // Toggles a manual mode or a URL entry mode (URL entry is default)
        $('#scrape-mode-toggle').on('change', async () => {
            var isChecked = document.getElementById('scrape-mode-toggle').checked
            console.log(isChecked)
    
            if (isChecked) {
                $('#url-scrape-container').hide();
                $('#manual-scrape-container').show();
            } else {
                $('#manual-scrape-container').hide();
                $('#url-scrape-container').show();
            }
        });

        // Event listener for the "Submit" button on the Scrape page
        $('#submitURLBtn').on('click', () => {
            this.submitBtnPressed();
        });

        // Event listener for the "Enter" key press in the input field
        $('#url-input').on('keypress', (event) => {
            if (event.key === 'Enter') {
                this.submitBtnPressed();     // Call the submit function
            }
        });

        // Submit button pressed while in Manual Data Entry Mode
        $('#man-exportBtn').on('click', () => {
            this.manModeExport();
        });

        // Listen for errors from main process related to URL opening
        this.electronAPI.openURLErr((errorMessage) => {
            this.postAlert('Failed to open URL', errorMessage); // Display alert if there was an error opening the URL
            this.enableURLField();
        });

        // Handles receiving scraped data from the external window
        this.electronAPI.receive('scrapedData:update', (data) => {
            var jsonObj = JSON.parse(data);
            this.parseScrapedDataToList(jsonObj);
            // Ensure the results container is visible
            this.showResultsContainer();
        });
        this.logDebug('Initialized listener for scraped data updates.');

        // Handles receiving the response from main regarding processing scraped data for export
        this.lsAPI.onExportResponse((res) => {
            var response = JSON.parse(res);

            if (response !== null) {
                if (response.ok) {
                    this.resetAllFields();
                    this.postAlert(response.resMsg);
                } else {
                    this.postAlert(response.resMsg, response.errType);
                    
                }
            } else {
                this.postAlert('Null Response Received from Main Process', 'Invalid Data State');
            }

            this.reenableScrapePageFunctions();
        });

        this.electronAPI.onExtWindowClose(() => {
            if ($('#results-list').children().length === 0) {
                this.resetAllFields();
            }
        });
    }

    /**
    * Set the Annotation page as active and visible in the UI.
    * @function setPageActive
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    setPageActive() {
        $(`#${this.name}`).addClass('active-nav-item');
        $(this.compID).show();
    }

    /**
    * Deactivate the page, hide its content, and remove navigation highlight.
    * @function setPageInactive
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    setPageInactive() {
        $(this.compID).hide();
        $(`#${this.name}`).removeClass('active-nav-item');
    }

    //============================================================================================================================
    // Logging Helpers (WIP - Plan to move to a separate class that is imported)
    //============================================================================================================================
    logger = window.log;    // Variable created for ease of reading

    /**
    * Display an alert message or error dialog, and log the event.
    * @function postAlert
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {*} alertMsg - The message to display in the alert.
    * @param {*} [cause] - Optional cause of the alert, used for error dialogs.
    * @returns {void}
    */
    postAlert(alertMsg, cause) {
        var json = {
            msg: alertMsg,
            errType: null
        }

        if (cause === undefined) {
            this.electronAPI.postDialog.general(JSON.stringify(json));
            this.logInfo(alertMsg);
        } else {
            json.errType = cause;

            this.electronAPI.postDialog.error(JSON.stringify(json));
            this.logError(`${alertMsg} Cause: ${cause}`);
        }
    }


    /**
    * Send an info log message to the main process.
    * @function logInfo
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logInfo(message) {
        this.logger.info(message);
    }

    /**
    * Send a debug log message to the main process.
    * @function logDebug
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logDebug(message) {
        this.logger.debug(message);
    }

    /**
    * Send a warning log message to the main process.
    * @function logWarn
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logWarn(message) {
        this.logger.warn(message);
    }

    /**
    * Send an error log message to the main process.
    * @function logError
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logError(message) {
        this.logger.error(message);
    }

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================

    /**
    * Initializes the results container UI elements.
    * @function initResultsContainer
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    initResultsContainer() {
        this.hideResultsContainer();
    
        $('#rmv-sel-btn').on('click', () => {
            this.removeSelectedItems();
        });
    
        $('#rmv-all-btn').on('click', () => {
            this.clearScrapedList();
        });

        $('#url-exportBtn').on('click', () => {
            this.urlModeExport();
        });
    }

    /**
    * Parse and display scraped data items in the results container.
    * @function parseScrapedDataToList
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {Array<Object>} data - Array of scraped data objects.
    * @returns {void}
    */
    parseScrapedDataToList(data) {
        for (var i = 0; i < data.length; i++) {
            this.appendNewScrapedItem(data[i]);
        }
        this.showResultsContainer();
    }

    /**
    * Add a new scraped data item to the results list with interactive selection behavior.
    * @function appendNewScrapedItem
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {Object} dataObj - Scraped data object with `data` and `url` fields.
    * @returns {void}
    */
    appendNewScrapedItem(dataObj) {
        var $newLI = $('<a>', {
            href: '#', 
            class: 'list-group-item list-group-item-action scrape-item',
            style: 'border-width: 0px 0px 3px 0px;'
        });

        $newLI.text(dataObj.data);
        $newLI.attr('data-url', dataObj.url);
    
        $newLI.on('click', () => {
            if ($newLI.hasClass('active')) {
                $newLI.removeClass('active');
    
                if (!this.checkIfAnyActive()) {
                    $('#rmv-sel-btn').hide();
                }
            } else {
                $newLI.addClass('active');
                $('#rmv-sel-btn').show();
            }
        });
    
        $('#results-list').append($newLI);
    }
    
    /**
    * Remove selected data items from the results list. Hides results if empty.
    * @function removeSelectedItems
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    removeSelectedItems() {
        $('.scrape-item.active').remove();
    
        if (!this.checkIfAnyActive()) {
            $('#rmv-sel-btn').hide();
        }
    
        if ($('#results-list').children().length === 0) {
            this.hideResultsContainer();
            this.enableURLField();
        }
    }
    
    /**
    * Clear all items from the results list and reset the UI.
    * @function clearScrapedList
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    clearScrapedList() {
        $('#results-list').empty();
        this.hideResultsContainer();
        this.enableURLField();
    }

    /**
    * Check if any data items are currently selected.
    * @function checkIfAnyActive
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {boolean} True if at least one item is selected, otherwise false.
    */
    checkIfAnyActive() {
        if ($('#results-list').children('.active').length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Retrieve all data items from the results list for export.
    * @function getAllReadyData
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {Array<Object>} Array of scraped data objects with `url` and `data` fields.
    */
    getAllReadyData() {
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
    * Format and export scraped data to Label Studio.
    * @function exportData
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {Array<Object>} dataArr - Data array to export.
    * @param {string} projID - Target Label Studio project ID.
    * @returns {void}
    */
    exportData(dataArr, projID) {
        this.disableWhileExporting();

        if (dataArr !== null) {
            var lsFormattedArr = [];
            var dbFormattedArr = [];

            for (var i = 0; i < dataArr.length; i++) {
                lsFormattedArr.push({
                    textData: dataArr[i].data
                });

                dbFormattedArr.push({
                    url: dataArr[i].url,
                    textData: dataArr[i].data
                });
            }

            this.lsAPI.exportDataToLS(JSON.stringify(lsFormattedArr), projID);
        } else {
            this.postAlert('No Data to Export', 'Missing Export Data');
        }
    }

    /**
    * Handle export logic for data collected in URL scrape mode.
    * @function urlModeExport
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    urlModeExport() {
        var data = this.getAllReadyData();
        var projID = $('#projectSelect-url').val();

        if (data !== null && data.length > 0) {
            this.exportData(data, projID);
        } else {
            this.postAlert('No Data to Export', 'Missing Export Data');
        }
    }

    /**
    * Handle export logic for manually entered data in manual scrape mode.
    * @function manModeExport
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    manModeExport() {
        var data = [{
            url: null,
            data: $('#manual-scrape-textarea').val()
        }];

        var projID = $('#projectSelect-man').val();

        if (data.textData !== '') {
            this.exportData(data, projID);
        } else {
            this.postAlert('Data Field Cannot Be Empty!', 'Empty String');
        }
    }


    /**
    * Handle the submit button press event in URL scrape mode.
    * Validates the URL and initiates scraping via Electron IPC.
    * @function submitBtnPressed
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    submitBtnPressed() {

        this.disableURLField();

        let url = $('#url-input').val();
        this.databaseAPI.addWebsiteToDatabase(url).then(r => this.logWarn('added website to database'));
        // Check if a URL was entered
        if (url) {
            // Prepend 'https://' if no protocol is specified
            if (!url.match(/^https?:\/\//i)) {
                url = 'https://' + url;
            }

            this.checkURL(url).then((res) => {
                // Validate the URL format before sending
                if (!res) {
                    this.postAlert('Please enter a valid URL', 'Invalid URL');
                    this.logWarn('Invalid URL entered.');
                    this.enableURLField();
                } else {
                    // Send the URL to the main process to open it
                    this.electronAPI.openExternal(url);

                    // Update the results container to display the submitted URL
                    $('#staticURL').val(url);
                }
            });
        } else {
            this.postAlert('Please enter a URL', 'Empty URL'); // Alert the user if no URL is entered
            this.logWarn('No URL entered.');
            this.enableURLField();
        }
    }

    /**
    * Validate a given URL by checking its format and availability.
    * @async
    * @function checkURL
    * @memberof module:PageController-Scrape.ScrapePageController
    * @param {string} url - The URL to validate.
    * @returns {Promise<boolean>} Resolves true if valid and accessible, else false.
    */
    checkURL(url) {
        let urlObj;
        return new Promise((resolve) => {
            try {  
                urlObj = new URL(url);
    
                if (urlObj.protocol !== "https:") {
                    return resolve(false);
                } 
        
                var req = new XMLHttpRequest(); 
                req.open('GET', url, true);
                req.onreadystatechange = function() {

                    if (req.readyState === 4) {
                        if ((req.status >= 200) && (req.status <= 299)) { // 200-299 are "all clear" status codes of various stripes
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                }
                req.send();
            } catch (err) {
                resolve(false);
            }
        }); 
    }

    /**
    * Reset all input fields and clear the results list on the Scrape page.
    * @function resetAllFields
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    resetAllFields() {
        this.clearScrapedList();
        $('#url-input').val('');
        $('#manual-scrape-textarea').val('');
    }

    /**
    * Disable all input fields and buttons during export to prevent interactions.
    * @function disableWhileExporting
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    disableWhileExporting() {
        this.disableManualScrape();
        this.disableURLField();
        this.disableResultsBtns();
    }

    /**
    * Re-enable all input fields and buttons after export completion.
    * @function reenableScrapePageFunctions
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    reenableScrapePageFunctions() {
        this.enableManualScrape();
        this.enableURLField();
        this.enableResultsBtns();
    }

    /**
    * Hide the results container UI element.
    * @function hideResultsContainer
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    hideResultsContainer() {
        $('#results-container').hide();
        $('#rmv-sel-btn').hide();
    }

    /**
    * Show the results container UI element.
    * @function showResultsContainer
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    showResultsContainer() {
        $('#results-container').show();
    }

    /**
    * Disable manual scrape input fields and buttons.
    * @function disableManualScrape
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    disableManualScrape() {
        $('#projectSelect-man').prop('disabled', true);
        $('#manual-submit-btn').prop('disabled', true);
        $('#manual-scrape-textarea').prop('disabled', true);
    }

    /**
    * Enable manual scrape input fields and buttons.
    * @function enableManualScrape
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    enableManualScrape() {
        $('#projectSelect-man').removeAttr('disabled');
        $('#manual-submit-btn').removeAttr('disabled');
        $('#manual-scrape-textarea').removeAttr('disabled');
    }

    /**
    * Disable URL input field and submit button.
    * @function disableURLField
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    disableURLField() {
        $('#url-input').prop('disabled', true);
        $('#submitURLBtn').prop('disabled', true);
    }

    /**
    * Enable URL input field and submit button.
    * @function enableURLField
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    enableURLField() {
        $('#url-input').removeAttr('disabled');
        $('#submitURLBtn').removeAttr('disabled');
    }

    /**
    * Disable buttons in the results container (URL mode).
    * @function disableResultsBtns
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    disableResultsBtns() {
        $('#rmv-all-btn').prop('disabled', true);
        $('#rmv-sel-btn').prop('disabled', true);
        $('#projectSelect-url').prop('disabled', true);
        $('#ls-export-btn').prop('disabled', true);
    }

    /**
    * Enable buttons in the results container (URL mode).
    * @function enableResultsBtns
    * @memberof module:PageController-Scrape.ScrapePageController
    * @returns {void}
    */
    enableResultsBtns() {
        $('#rmv-all-btn').removeAttr('disabled');
        $('#rmv-sel-btn').removeAttr('disabled');
        $('#projectSelect-url').removeAttr('disabled');
        $('#ls-export-btn').removeAttr('disabled');
    }
}
