export class LogPageController {
    htmlFilePath = './components/log.html';  // Filepath to HTML component
    name = 'logs';                  // Page name
    compID = '#log-container';     // Page component container ID

    ipcRenderer = window.electronAPI;

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
    initPage() {
        var navLink = $(`<a class="nav-link" id="${this.name}-nav" href="#">${this.navbarName()}</a>`);
        var navbarItem = $(`<li class="nav-item" id="${this.name}"></li>`).append(navLink);

        $('#navbar-ul-1').append(navbarItem);

        const insertElement = async () => {
            $('#d_content').append( await $.get(this.htmlFilePath));
        }

        insertElement().then(() => {
            this.initPageListeners();
        });
    }

    /**
     * Method for initializing the pages event listeners.
     */
    initPageListeners() {
        $('#log-filter').on('change', () => {
            this.filterLogs()
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
        if (cause === undefined) {
            alert(alertMsg);
        } else {
            alert(`ERROR: ${alertMsg}\nCAUSE: ${cause}`);
        }
    }

    /**
     * Send an info log message to the main process.
     * @param {string} message - The message to log.
     */
    logInfo(message) {
        this.ipcRenderer.send('log-info', message);
    }

    /**
     * Send a debug log message to the main process.
     * @param {string} message - The message to log.
     */
    logDebug(message) {
        this.ipcRenderer.send('log-debug', message);
    }

    /**
     * Send a warning log message to the main process.
     * @param {string} message - The message to log.
     */
    logWarn(message) {
        this.ipcRenderer.send('log-warn', message);
    }

    /**
     * Send an error log message to the main process.
     * @param {string} message - The message to log.
     */
    logError(message) {
        this.ipcRenderer.send('log-error', message);
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

            const logs = await this.ipcRenderer.invoke('get-logs');
            this.logDebug('Logs received from main process.');
            if (!logs) {
                this.logWarn('No logs received from main process.');
                return;
            }

            this.logLines = logs.split('\n').filter(line => line.trim() !== '');
            this.displayLogs(this.logLines);

            // Attach event listener for log filter
            const logFilter = document.getElementById('log-filter');
            if (logFilter) {
                logFilter.addEventListener('change', filterLogs);
                this.logDebug('Log filter event listener attached.');
            } else {
                this.logWarn('Log filter element not found.');
            }
        } catch (error) {
            this.logError(`Error loading logs: ${error}`);
        }
    }

    /**
     * Display logs in the UI.
     * @param {Array} logs - Array of log lines to display.
     */
    displayLogs(logs) {
        const logOutput = document.getElementById('log-output');
        if (!logOutput) {
            this.logError('log-output element not found.');
            return;
        }
        logOutput.innerHTML = '';

        logs.forEach(line => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = line;
            logOutput.appendChild(logEntry);
        });

        this.logDebug('Logs displayed in UI.');
    }

    /**
     * Filter logs based on selected log level.
     */
    filterLogs() {
        const logFilter = document.getElementById('log-filter');
        const filterValue = logFilter ? logFilter.value : 'ALL';
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
            this.logInfo(`Logs filtered by level: ${filterValue}`);
        } else {
            this.logInfo('Log filter reset to show all logs.');
        }

        this.displayLogs(filteredLogs);
    }
}