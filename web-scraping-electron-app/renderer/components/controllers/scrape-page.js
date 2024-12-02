export class ScrapePageController {
    htmlFilePath = './components/scrape.html';  // Filepath to HTML component
    name = 'scrape';                  // Page name
    compID = '#scrape-container';     // Page component container ID

    electronAPI = window.electronAPI;
    lsAPI = window.lsAPI;

    /**
     * Returns the pages component html filepath.
     * @returns String          The html filepath.
     */
    getHtmlCompPath() {
        return this.htmlFilePath;
    }

    /**
     * Returns the pages name.
     * @returns string          The pages name.
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the pages component container ID.
     * @returns String          The component container ID.
     */
    getCompID() {
        return this.compID;
    }

    /**
     * Generates the navbar name for the specific page.
     * @returns String          The navbar name.
     */
    navbarName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    /**
     * Method for intitializing the page in the application.
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
     * Method for initializing the pages event listeners.
     */
    initPageListeners() {
        this.initResultsContainer();

        // Toggles a manual mode or a URL entry mode (URL entry is default)
        $('#scrape-mode-toggle').on('click', () => {
            let curr = $('#scrape-mode-toggle').html();
            let next;

            if (curr === 'Manual Mode') {
                next = 'URL Mode';

                $('#url-scrape-container').hide();
                $('#manual-scrape-container').show();
            } else {
                next = 'Manual Mode';

                $('#manual-scrape-container').hide();
                $('#url-scrape-container').show();
            }

            $('#scrape-mode-toggle').html(next);
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
            this.showResultsContainer()
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
    }

    /**
     * Sets the page active (visible).
     */
    setPageActive() {
        $(`#${this.name}`).addClass('active-nav-item');
        $(this.compID).show();
    }

    /**
     * Sets the page inactive (hidden).
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
     * Handles displaying an alert message for specific situations (error or otherwise).
     * @param {*} alertMsg          Message to display.
     * @param {*} cause             Cause if an error.
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
     * @param {string} message - The message to log.
     */
    logInfo(message) {
        this.logger.info(message);
    }

    /**
     * Send a debug log message to the main process.
     * @param {string} message - The message to log.
     */
    logDebug(message) {
        this.logger.debug(message);
    }

    /**
     * Send a warning log message to the main process.
     * @param {string} message - The message to log.
     */
    logWarn(message) {
        this.logger.warn(message);
    }

    /**
     * Send an error log message to the main process.
     * @param {string} message - The message to log.
     */
    logError(message) {
        this.logger.error(message);
    }

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================

    /**
     * Initializes the results container UI elements.
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
     * Takes data returned from external scrape window and parses it into the results container.
     * @param {*} data          The data being parsed.
     */
    parseScrapedDataToList(data) {
        for (var i = 0; i < data.length; i++) {
            this.appendNewScrapedItem(data[i]);
        }
        this.showResultsContainer();
    }

    /**
     * Adds a new data item to the results list.
     * @param {*} dataObj       The data being appended.
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
     * Removes any currently selected items from the results list.
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
     * Removes all items from the results list.
     */
    clearScrapedList() {
        $('#results-list').empty();
        this.hideResultsContainer();
        this.enableURLField();
    }
    
    checkIfAnyActive() {
        if ($('#results-list').children('.active').length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if there are any currently selected data itmes in the results list.
     * @returns         Boolean indicating if there are any selected items.
     */
    getAllReadyData() {
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

    /**
     * Method used to send the scraped data to main for exporting to Label Studio.
     * @param {*} dataArr           Data to be exported.
     * @param {*} projID            The LS project being exported to.
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
     * Logic that handles exporting data when using URL mode.
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
     * Logic that handles exporting data when using manual mode.
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
     * Function to handle the "Submit" button click on the Scrape page.
     */
    submitBtnPressed() {
        this.disableURLField();

        let url = $('#url-input').val();

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
        }
    }

    /**
     * Method used to validate that the URL entered is valid.
     * @param {*} url       The URL.
     * @returns             A boolean indicating if it is valid or not.
     */
    checkURL(url) {
        let urlObj;

        return new Promise((resolve) => {
            try {  
                urlObj = new URL(url);
    
                if (urlObj.protocol !== "https:") {
                    console.log('1');
                    return resolve(false);
                } 
        
                var req = new XMLHttpRequest();
                req.open('GET', url, true);
                req.onreadystatechange = function() {
                    if (req.readyState === 4) {
                        if (req.status === 404) {
                            console.log('2');
                            resolve(false);
                        } else {
                            console.log('3');
                            resolve(true);
                        }
                    }
                }
                req.send();
            } catch (err) {
                console.log('4');
                resolve(false);
            }
        }); 
    }

    /**
     * Method for resetting all scrape page fields.
     */
    resetAllFields() {
        this.clearScrapedList();
        $('#url-input').val('');
        $('#manual-scrape-textarea').val('');
    }

    /**
     * Disables all scrape page fields while performing a data export.
     */
    disableWhileExporting() {
        this.disableManualScrape();
        this.disableURLField();
        this.disableResultsBtns();
    }

    /**
     * Reenables scrape page functions after exporting data.
     */
    reenableScrapePageFunctions() {
        this.enableManualScrape();
        this.enableURLField();
        this.enableResultsBtns();
    }

    /**
     * Hides the URL mode results container.
     */
    hideResultsContainer() {
        $('#results-container').hide();
        $('#rmv-sel-btn').hide();
    }

    /**
     * Shows the URL mode results container.
     */
    showResultsContainer() {
        $('#results-container').show();
    }

    /**
     * Method for disabling the input field and button while handling a request.
     */
    disableManualScrape() {
        $('#projectSelect-man').prop('disabled', true);
        $('#manual-submit-btn').prop('disabled', true);
        $('#manual-scrape-textarea').prop('disabled', true);
    }

    /**
     * Method for re-enabling the input field and button after handling a request.
     */
    enableManualScrape() {
        $('#projectSelect-man').removeAttr('disabled');
        $('#manual-submit-btn').removeAttr('disabled');
        $('#manual-scrape-textarea').removeAttr('disabled');
    }

    /**
     * Disables the URL mode windows url field.
     */
    disableURLField() {
        $('#url-input').prop('disabled', true);
        $('#submitURLBtn').prop('disabled', true);
    }

    /**
     * Reenables the URL mode windows url field.
     */
    enableURLField() {
        $('#url-input').removeAttr('disabled');
        $('#submitURLBtn').removeAttr('disabled');
    }

    /**
     * Disables the results container buttons on the URL mode window.
     */
    disableResultsBtns() {
        $('#rmv-all-btn').prop('disabled', true);
        $('#rmv-sel-btn').prop('disabled', true);
        $('#projectSelect-url').prop('disabled', true);
        $('#ls-export-btn').prop('disabled', true);
    }

    /**
     * Reenables the results container buttons on the URL mode window.
     */
    enableResultsBtns() {
        $('#rmv-all-btn').removeAttr('disabled');
        $('#rmv-sel-btn').removeAttr('disabled');
        $('#projectSelect-url').removeAttr('disabled');
        $('#ls-export-btn').removeAttr('disabled');
    }
}