export class LogPageController {
    htmlFilePath = './components/log.html';  // Filepath to HTML component
    name = 'logs';                  // Page name
    compID = '#log-container';     // Page component container ID

    logLines = []; // Store logs for filtering

    electronAPI = window.electronAPI;
    logger = window.log;

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
            $('#date-filter').val(this.localizeDateValue(new Date()));

            this.loadLogs();
            this.initPageListeners();
            this.logInfo("Log Page Initialized");
        });
    }

    /**
     * Method for initializing the pages event listeners.
     */
    initPageListeners() {
        $('#log-filter').on('change', () => {
            this.displayLogs();
        });

        $('#date-filter').on('change', () => {
            this.displayLogs(); // Reapply filters whenever the date changes
        });

        // Attach clear logs handler
        $('#clearLogsBtn').on('click', () => {
            if (confirm('Are you sure you want to clear all logs?')) {
                this.clearLogs();
            }
        });

        this.logDebug('Log filter and date filter event listeners attached.');

        // Listens for new logs being made and then updates the UI for just that log
        this.logger.logUpdate((data) => {
            this.addLogLine(data);
        });

        this.logger.logsClearedUpdate(() => {
            this.logLines = [];
            this.displayLogs();
        });

        this.logger.logClearError((errRes) => {
            this.postAlert('Failed to clear logs', errRes);
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

    /**
     * Method for making an IPC log request.
     */
    requestLogs() {
        this.logger.requestLogs();
    }

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================

    /**
     * Takes a date object and converts it into the localized datetime.
     * @param {*} dateObj           The date object.
     * @returns                     The localized date time.
     */
    localizeDateValue(dateObj){
        const local = new Date(dateObj);
        local.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    };

    /**
     * Load and display logs.
     */
    async loadLogs() {
        try {
            // Wait for the DOM to be updated
            await new Promise(resolve => setTimeout(resolve, 50));
            const logs = await this.logger.requestLogs();

            this.logDebug('Logs received from main process.');
            if (!logs) {
                this.logWarn('No logs received from main process.');
                return;
            }

            this.logLines = logs;
            this.displayLogs();
        } catch (error) {
            this.logError(`Error loading logs: ${error}`);
        }
    }

    /**
     * Updates the logLines with a new log entry.
     * @param {*} line          The new log.
     */
    addLogLine(logs) {
        if (logs) {
            logs.forEach(logObj => {
                this.logLines.push(logObj);
            });

            this.displayLogs();
        }
    }

    /**
     * Method for appending a new log line into the UI.
     * @param {*} log       The log to be inserted.
     */
    appendLog(log) {
        var $logEntry = $('<div>', {class: "log-entry"});
        $logEntry.text(log);
        $('#log-wrapper').append($logEntry);
    }

    /**
     * Display logs in the UI.
     */
     ////////////////////////////  UPDATE  PLEASE TEST /////////////////////////////////////////////
     /**
    * Filters logs by the selected date and type while ensuring compatibility across time zones.
    *
    * - The selected filter date is normalized to the local timezone (e.g., user's system timezone).
    * - Log entry timestamps are parsed into local Date objects and compared as date strings (YYYY-MM-DD).
    * - Only the date part is considered, ignoring time and timezone offsets, making it consistent across regions.
    *
    * This ensures the method works correctly regardless of the user's timezone (e.g., California vs. Japan).
    */
    ////////////////////////////////////////////////////////////////////////////////////////////////
    displayLogs() {
    const typeFilter = $('#log-filter').val();
    const dateFilterValue = $('#date-filter').val();

    // Ensure date filter is parsed correctly as local date
    const dateFilter = dateFilterValue ? new Date(dateFilterValue + 'T00:00:00') : null;

    //console.log('Type Filter:', typeFilter);
    //console.log('Date Filter Value:', dateFilterValue);
    //console.log('Parsed Date Filter:', dateFilter);

    const logOutput = $('#log-wrapper');
    logOutput.empty(); // Clear existing logs

    // Filter logs
    const logs = this.logLines.filter(logObj => {
        let meetsDateFilter = true;
        let meetsTypeFilter = true;

        if (dateFilter) {
            // Parse the log date as local date
            const logDate = new Date(logObj.logDateTime);
            const logDateString = logDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            const filterDateString = dateFilter.toISOString().split('T')[0]; // Format as YYYY-MM-DD

            //console.log('Log Entry Date:', logDateString);
            //console.log('Filter Date:', filterDateString);

            meetsDateFilter = logDateString === filterDateString;
            //console.log('Meets Date Filter:', meetsDateFilter);
        }

        if (typeFilter !== 'ALL') {
            meetsTypeFilter = logObj.logType === typeFilter;
            //console.log('Log Type:', logObj.logType, 'Meets Type Filter:', meetsTypeFilter);
        }

        const matchesFilters = meetsDateFilter && meetsTypeFilter;
        //console.log('Log Entry Matches Filters:', matchesFilters);
        return matchesFilters; // Only include logs that match all filters
    });

    //console.log('Filtered Logs:', logs);

    // Display logs or show a "no logs" message
    if (logs.length === 0) {
        //console.log('No logs found for the selected filters.');
        const noLogsMessage = $('<div>', { class: 'no-logs-message text-center text-muted' });
        noLogsMessage.text('No logs found for the selected filters.');
        logOutput.append(noLogsMessage);
    } else {
        logs.forEach(logObj => {
            this.appendLog(logObj.rawLogStr); // Add each log to the UI
        });
        //console.log('Logs displayed in UI:', logs.length);
    }

    // Enable or disable the "Clear Logs" button based on logs presence
    if (this.logLines.length > 0) {
        $('#clearLogsBtn').removeAttr('disabled');
    } else {
        $('#clearLogsBtn').prop('disabled', true);
    }
}
     /**
     * Clear logs both in the UI and on the backend.
     */
    clearLogs() {
        this.logger.clearLogs();
    }
}