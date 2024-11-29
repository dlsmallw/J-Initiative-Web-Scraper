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
        $('#manual-submit-btn').on('click', () => {
            let data = $('#manual-scrape-textarea').val();
            let projID = $('#projectSelect').val();

            if (data === '') {
                this.postAlert('Data Field Cannot Be Empty!', 'Empty String');
            } else {
                this.lsAPI.exportData(data, projID);
                this.disableManualScrape();

                this.lsAPI.onExportRes((res) => {
                    var response = JSON.parse(res);
            
                    if (response.ok) {
                        this.postAlert(response.resMsg);
                        $('#manual-scrape-textarea').val('');
                    } else {
                        this.postAlert(response.resMsg, response.errType);
                    }

                    this.enableManualScrape();
                });
            }
        });

        // Listen for errors from main process related to URL opening
        this.electronAPI.openURLErr((errorMessage) => {
            alert(`Failed to open URL: ${errorMessage}`); // Display alert if there was an error opening the URL
        });

        this.electronAPI.receive('scrapedData:update', (data) => {
            console.log('Updating scrape.html with imported data:', data);
    
            // Update the Formatted Data container
            $('#formatted-data-text').html(`<p>${data.formattedData}</p>`);
    
            // Update the Raw Data container
            $('#raw-data-text').html(`<p>${data.rawData}</p>`);
    
            // Ensure the results container is visible
            $('#results-container').show();
        });
        this.logDebug('Initialized listener for scraped data updates.');
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
        if (cause === undefined) {
            alert(alertMsg);
            this.logInfo(alertMsg);
        } else {
            alert(`ERROR: ${alertMsg}\nCAUSE: ${cause}`);
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
     * Function to handle the "Submit" button click on the Scrape page.
     */
    submitBtnPressed() {
        this.logDebug('Submit button pressed.');

        let url = $('#url-input').val();

        // Check if a URL was entered
        if (url) {
            // Prepend 'https://' if no protocol is specified
            if (!url.match(/^https?:\/\//i)) {
                url = 'https://' + url;
            }

            // Validate the URL format before sending
            if (!this.isValidURL(url)) {
                this.postAlert('Please enter a valid URL.');
                this.logWarn('Invalid URL entered.');
                return;
            }

            // Send the URL to the main process to open it
            this.electronAPI.openExternal(url);
            this.logInfo(`Requested to open URL: ${url}`);

            // Update the results container to display the submitted URL
            $('#staticURL').val(url);

            this.logInfo(`Opened URL successfully.`);

            // Additional code for scraping (if needed)
            // ...
        } else {
            alert('Please enter a URL.'); // Alert the user if no URL is entered
            this.logWarn('No URL entered.');
        }
    }

    /**
     * URL validation function to check if the URL is valid.
     * @param {*} url       The URL to validate.
     * @returns Bool        A boolean corresponding to if it is valid or not.
     */
    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Method for disabling the input field and button while handling a request.
     */
    disableManualScrape() {
        $('#manual-submit-btn').prop('disabled', true);
        $('#manual-scrape-textarea').prop('disabled', true);
    }

    /**
     * Method for re-enabling the input field and button after handling a request.
     */
    enableManualScrape() {
        $('#manual-submit-btn').removeAttr('disabled');
        $('#manual-scrape-textarea').removeAttr('disabled');
    }
}