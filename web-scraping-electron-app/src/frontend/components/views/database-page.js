/**
* @file database-page.js
* @fileoverview Controls the behavior and interaction of the Database page UI in the Electron application. Handles page lifecycle, dynamic content insertion, event listeners, and logging.
*
* @module PageController-Database
*/

import { LoggerHelper } from '../../../backend/utils/logger-helper.js';

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

    logger = new LoggerHelper(this.name);
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

    /**
    * Wrapper for alert + logging.
    * @param {string} alertMsg - The alert message.
    * @param {*} [cause] - Optional error cause.
    */
    postAlert(alertMsg, cause) {
        this.logger.postAlert(alertMsg, cause);
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
        this.logger.logDebug('website data displayed in UI.');
    }
}
