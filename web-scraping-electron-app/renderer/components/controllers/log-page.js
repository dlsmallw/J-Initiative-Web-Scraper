export class LogPageController {
    htmlFilePath = './components/log.html';  // Filepath to HTML component
    name = 'logs';                  // Page name
    compID = '#log-container';     // Page component container ID

    logLines = []; // Store logs for filtering

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
    async initPage() {
        var navLink = $(`<a class="nav-link" id="${this.name}-nav" href="#">${this.navbarName()}</a>`);
        var navbarItem = $(`<li class="nav-item" id="${this.name}"></li>`).append(navLink);

        $('#navbar-ul-1').append(navbarItem);

        const insertElement = async () => {
            $('#d_content').append( await $.get(this.htmlFilePath));
        }

        await this.loadLogs();

        insertElement().then(() => {
            this.initPageListeners();
        });

        this.logInfo("Log Page Initialized");
    }

    /**
     * Method for initializing the pages event listeners.
     */
    initPageListeners() {
        $('#log-filter').on('change', () => {
            this.filterLogs();
        });
        this.logDebug('Log filter event listener attached.');

        // Listens for new logs being made and then updates the UI for just that log
        this.logger.logUpdate((data) => {
            this.addLogLine(data);
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

            this.logLines = logs.split('\n').filter(line => line.trim() !== '');
            this.displayLogs(this.logLines);
        } catch (error) {
            this.logError(`Error loading logs: ${error}`);
        }
    }

    /**
     * Updates the logLines with a new log entry.
     * @param {*} line          The new log.
     */
    addLogLine(line) {
        this.logLines.push(line);
        this.filterLogs();
    }

    /**
     * Method for appending a new log line into the UI.
     * @param {*} log       The log to be inserted.
     */
    appendLog(log) {
        var $logEntry = $('<div>', {class: "log-entry"});
        $logEntry.text(log);
        $('#log-output').append($logEntry);
    }

    /**
     * Display logs in the UI.
     * @param {Array} logs - Array of log lines to display.
     */
    displayLogs(logs) {
        $('#log-output').empty();

        logs.forEach(line => {
            this.appendLog(line);
        });
    }

    /**
     * Filter logs based on selected log level.
     */
    filterLogs() {
        const filterValue = $('#log-filter').val();
        let filteredLogs = this.logLines;

        if (filterValue !== 'ALL') {
            // Split the filterValue into an array of levels
            const levels = filterValue.toLowerCase().split(',').map(s => s.trim());
            filteredLogs = this.logLines.filter(line => {
                // Extract the log level using regex
                const regex = /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\] \[(\w+)\]/;
                const match = line.match(regex);
                if (match && match[1]) {
                    const logLevel = match[1].toLowerCase();
                    return levels.includes(logLevel);
                }
                return false;
            });
        }

        this.displayLogs(filteredLogs);
    }
}