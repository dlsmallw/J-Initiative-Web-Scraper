/**
* @file database-page.js
* @fileoverview Controls the behavior and interaction of the Database page UI in the Electron application. Handles page lifecycle, dynamic content insertion, event listeners, and logging.
*
* @module PageController-Database
*/

/**
* Controller for managing the Database page in the Electron application. Handles page rendering, dynamic data display, navigation control, and logging.
*
* @class DatabasePageController
* @memberof module:PageController-Database
*/
export class DatabasePageController {
    htmlFilePath = '../src/frontend/components/templates/database.html';  // Filepath to HTML component
    name = 'database';                  // Page name
    compID = '#database-container';     // Page component container ID

    electronAPI = window.electronAPI;
    databaseAPI = window.databaseAPI;

   /**
    * Get the HTML file path for this page.
    * @function getHtmlCompPath
    * @memberof module:PageController-Database.DatabasePageController
    * @returns {string} The HTML file path.
    */
    getHtmlCompPath() {
        return this.htmlFilePath;
    }

    /**
    * Get the name identifier for this page.
    * @function getName
    * @memberof module:PageController-Database.DatabasePageController
    * @returns {string} The page name.
    */
    getName() {
        return this.name;
    }

    /**
    * Get the DOM container ID for this page component.
    * @function getCompID
    * @memberof module:PageController-Database.DatabasePageController
    * @returns {string} The component container ID.
    */
    getCompID() {
        return this.compID;
    }

    /**
    * Generate the formatted navbar display name for this page.
    * @function navbarName
    * @memberof module:PageController-Database.DatabasePageController
    * @returns {string} The navbar display name.
    */
    navbarName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    /**
    * Initialize the Database page by adding its navigation link and loading its HTML content.
    * @function initPage
    * @memberof module:PageController-Database.DatabasePageController
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


            this.initPageListeners();
        });
    }

    /**
    * Initialize event listeners for this page's DOM elements.
    * Handles UI interactions such as linking Label Studio projects and external window management.
    * @function initPageListeners
    * @memberof module:PageController-Database.DatabasePageController
    * @returns {void}
    */
    initPageListeners() {
        // Insert code for listeners here
    }

    /**
    * Activate the page, display its content, and highlight its navigation link.
    * @function setPageActive
    * @memberof module:PageController-Database.DatabasePageController
    * @returns {void}
    */
    setPageActive() {
        this.displayWebsiteData();
        $(`#${this.name}`).addClass('active-nav-item');
        $(this.compID).show();
    }

    /**
    * Deactivate the page, hide its content, and remove navigation highlight.
    * @function setPageInactive
    * @memberof module:PageController-Database.DatabasePageController
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
    * @memberof module:PageController-Database.DatabasePageController
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
    * @memberof module:PageController-Database.DatabasePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logInfo(message) {
        this.logger.info(message);
    }

    /**
    * Send a debug log message to the main process.
    * @function logDebug
    * @memberof module:PageController-Database.DatabasePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logDebug(message) {
        this.logger.debug(message);
    }

    /**
    * Send a warning log message to the main process.
    * @function logWarn
    * @memberof module:PageController-Database.DatabasePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logWarn(message) {
        this.logger.warn(message);
    }

    /**
    * Send an error log message to the main process.
    * @function logError
    * @memberof module:PageController-Database.DatabasePageController
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
    * Retrieve and display website data and entries from the database in the UI.
    * Each website is decoded and its entries are listed under it.
    * Logs an error if the target DOM element is not found.
    * @async
    * @function displayWebsiteData
    * @memberof module:PageController-Database.DatabasePageController
    * @returns {Promise<void>}
    *
    * @example
    * const controller = new DatabasePageController();
    * await controller.displayWebsiteData();
    */
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
      const fragment = document.createDocumentFragment();
      let headerCheck = true;
      let hasData = false;
      let currentPercentage = 0;
      const tempContainer = document.createElement('div');
      for (let website of websiteList) {
        if(website !== "") {
          hasData = true;
          currentPercentage++;
          websiteInfo.innerHTML = 'Loading table: ' + ((currentPercentage / websiteList.length) * 100).toFixed(2) + '%';
          this.logDebug("website: " + website);
          if(headerCheck) {
            let headerRow = document.createElement('tr');
            let headerWebsite = document.createElement("td");
            let headerEntry = document.createElement("td");
            let headerLastAccessed = document.createElement("td");

            headerWebsite.textContent = "Websites";
            headerEntry.textContent = "Entries";
            headerLastAccessed.textContent = "Time Last Accessed";

            headerRow.appendChild(headerWebsite);
            headerRow.appendChild(headerEntry);
            headerRow.appendChild(headerLastAccessed);
            tempContainer.appendChild(headerRow);
            headerCheck = false;
          }




          let entries = await this.databaseAPI.getWebsiteEntries(website);
          let time = await this.databaseAPI.getWebsiteLastAccessed(website);
          entries = entries.split(/\n/);
          website = decodeURIComponent(website);
          let newRow = document.createElement('tr');
          let newTime = document.createElement("td");
          let newURL = document.createElement("td");
          let newEntry = document.createElement("td");
          let counter = 1;
          for (let entry of entries) {
            if(entry !== '') {
              newEntry.textContent += '\n    ' + 'Entry ' + counter + ': ' + entry;
              counter++;
            }
          }



          newURL.textContent = website;
          newTime.textContent = time;

          newRow.appendChild(newURL);
          newRow.appendChild(newEntry);
          newRow.appendChild(newTime);
          tempContainer.appendChild(newRow);

        }

      }
      websiteInfo.innerHTML = '';
      if (hasData) {
        while (tempContainer.firstChild) {
          fragment.appendChild(tempContainer.firstChild);
        }
        websiteInfo.appendChild(fragment);
      }
      this.logDebug('website data displayed in UI.');
    }
}
