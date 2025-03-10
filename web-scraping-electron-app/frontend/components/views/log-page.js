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
    displayLogs() {
        var typeFilter = $('#log-filter').val();
        var dateFilter = new Date($('#date-filter').val());

        const logOutput = $('#log-wrapper');
        logOutput.empty(); // Clear existing logs

        var logs = this.logLines.filter(logObj => {
            var meetsDateFilter = true ? (dateFilter === undefined || (logObj.logDateTime.toDateString() === dateFilter.toDateString())) : false;
            var meetsTypeFilter = true ? (typeFilter === 'ALL' || logObj.logType === typeFilter) : false;

            if (meetsDateFilter && meetsTypeFilter) {
                return true;
            }

            return false;
        });

        if (logs.length === 0) {
            // If no logs match, display a message in the log output
            const noLogsMessage = $('<div>', { class: 'no-logs-message text-center text-muted' });
            noLogsMessage.text('No logs found for the selected filters.');
            logOutput.append(noLogsMessage);
        } else {
            logs.forEach(logObj => {
                this.appendLog(logObj.rawLogStr);
            });
        }
        
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