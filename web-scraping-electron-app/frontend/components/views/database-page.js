export class DatabasePageController {
    htmlFilePath = './components/database.html';  // Filepath to HTML component
    name = 'database';                  // Page name
    compID = '#database-container';     // Page component container ID

    electronAPI = window.electronAPI;
    databaseAPI = window.databaseAPI;
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
        // Insert code for listeners here
    }

    /**
     * Sets the page active (visible).
     */
    setPageActive() {
        this.displayWebsiteData();
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

  async displayWebsiteData() {
    await new Promise(resolve => setTimeout(resolve, 50));
    const websiteInfo = document.getElementById('website-info');
    if (!websiteInfo) {
      this.logError('website-info element not found.');
      return;
    }
    websiteInfo.innerHTML = '';
    const websites = await this.databaseAPI.getWebsiteData();
    const websiteList = websites.split(/\n/);
    for (let website of websiteList) {
      let entries = await this.databaseAPI.getWebsiteEntries(website);
      entries = entries.split(/\n/);
      website = decodeURIComponent(website);
      let counter = 1;
      for (const entry of entries) {
        if(entry !== '') {
          website += '\n    ' + 'Entry ' + counter + ': ' + entry;
          counter++;
        }
      }
      const websiteEntry = document.createElement('div');
      websiteEntry.className = 'website-entry';
      websiteEntry.textContent = website;
      websiteInfo.appendChild(websiteEntry);
    }
    this.logDebug('website data displayed in UI.');
  }
}
