/**
* @file log-page.js
* @fileoverview Controls the behavior and initialization of the Log page in the UI.
*
* @module PageController-Log
*/

/**
* Controller for managing the Log page.
*
* @class LogPageController
* @memberof module:PageController-Log
*/
export class LogPageController {
    htmlFilePath = '../src/frontend/components/templates/log.html';  // Filepath to HTML component
    name = 'logs';                  // Page name
    compID = '#log-container';     // Page component container ID

    logLines = []; // Store logs for filtering

    electronAPI = window.electronAPI;
    logger = window.log;

    /**
    * Get the HTML file path for this page.
    * @function getHtmlCompPath
    * @memberof module:PageController-Log.LogPageController
    * @returns {string} The HTML file path.
    */
    getHtmlCompPath() {
        return this.htmlFilePath;
    }

    /**
    * Get the name identifier for this page.
    * @function getName
    * @memberof module:PageController-Log.LogPageController
    * @returns {string} The page name.
    */
    getName() {
        return this.name;
    }

    /**
    * Get the DOM container ID for this page component.
    * @function getCompID
    * @memberof module:PageController-Log.LogPageController
    * @returns {string} The component container ID.
    */
    getCompID() {
        return this.compID;
    }

    /**
    * Generate the formatted navbar display name for this page.
    * @function navbarName
    * @memberof module:PageController-Log.LogPageController
    * @returns {string} The navbar display name.
    */
    navbarName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    /**
    * Initialize the Log page.
    * @function initPage
    * @memberof module:PageController-Log.LogPageController
    * @returns {void}
    */
    initPage() {
        var navLink = $(`<a class="nav-link" id="${this.name}-nav" href="#">${this.navbarName()}</a>`);
        // Append to the Pages dropdown
        $('#navbar-dropdown-list').append(navLink);


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
    * Initialize event listeners for this page's DOM elements.
    * Handles UI interactions such as linking Label Studio projects and external window management.
    * @function initPageListeners
    * @memberof module:PageController-Log.LogPageController
    * @returns {void}
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
    * Set the Annotation page as active and visible in the UI.
    * @function setPageActive
    * @memberof module:PageController-Log.LogPageController
    * @returns {void}
    */
    setPageActive() {
        $(`#${this.name}`).addClass('active-nav-item');
        $(this.compID).show();
    }

    /**
    * Deactivate the page, hide its content, and remove navigation highlight.
    * @function setPageInactive
    * @memberof module:PageController-Log.LogPageController
    * @returns {void}
    */
    setPageInactive() {
        $(this.compID).hide();
        $(`#${this.name}`).removeClass('active-nav-item');
    }

    //============================================================================================================================
    // Logging Helpers (WIP - Plan to move to a separate class that is imported)
    //============================================================================================================================

    /**
    * Display an alert message or error dialog, and log the event.
    * @function postAlert
    * @memberof module:PageController-Log.LogPageController
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
    * @memberof module:PageController-Log.LogPageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logInfo(message) {
        this.logger.info(message);
    }

    /**
    * Send a debug log message to the main process.
    * @function logDebug
    * @memberof module:PageController-Log.LogPageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logDebug(message) {
        this.logger.debug(message);
    }

    /**
    * Send a warning log message to the main process.
    * @function logWarn
    * @memberof module:PageController-Log.LogPageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logWarn(message) {
        this.logger.warn(message);
    }

    /**
    * Send an error log message to the main process.
    * @function logError
    * @memberof module:PageController-Log.LogPageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logError(message) {
        this.logger.error(message);
    }

    /**
    * Request logs from the main process via IPC.
    * @function requestLogs
    * @memberof module:PageController-Log.LogPageController
    * @returns {void}
    */
    requestLogs() {
        this.logger.requestLogs();
    }

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================

    /**
    * Convert a Date object into a localized date string (YYYY-MM-DD).
    * @function localizeDateValue
    * @memberof module:PageController-Log.LogPageController
    * @param {Date} dateObj - The date object to localize.
    * @returns {string} Localized date in YYYY-MM-DD format.
    */
    localizeDateValue(dateObj){
        const local = new Date(dateObj);
        local.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    };

    /**
    * Asynchronously load logs from the main process and display them in the UI.
    * Handles errors and logs debug/warning messages based on response.
    *
    * @async
    * @function loadLogs
    * @memberof module:PageController-Log.LogPageController
    * @returns {Promise<void>}
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
    * Add new log entries to the internal logLines array and refresh the display.
    * @function addLogLine
    * @memberof module:PageController-Log.LogPageController
    * @param {Array<Object>} logs - Array of log objects to add.
    * @returns {void}
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
    * Append a single raw log string as a new log entry in the UI.
    * @function appendLog
    * @memberof module:PageController-Log.LogPageController
    * @param {string} log - Raw log string to display.
    * @returns {void}
    */
    appendLog(log) {
        var $logEntry = $('<div>', {class: "log-entry"});
        $logEntry.text(log);
        $('#log-wrapper').append($logEntry);
    }

    /**
    * Display filtered logs in the UI based on selected type and date.
    * If no logs match filters, a message is shown.
    * @function displayLogs
    * @memberof module:PageController-Log.LogPageController
    * @returns {void}
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
    * Clear all logs both from the UI and via backend request.
    * Disables the clear button if no logs remain.
    *
    * @function clearLogs
    * @memberof module:PageController-Log.LogPageController
    * @returns {void}
    */
    clearLogs() {
        this.logger.clearLogs();
    }
}