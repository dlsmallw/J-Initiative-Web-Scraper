/**
* @file home-page.js
* @fileoverview Controls the behavior and initialization of the Home page in the UI.
*
* @module PageController-Home
*/

import { LoggerHelper } from '../../../backend/utils/logger-helper.js';

/**
* Controller for managing the Home page.
*
* @class HomePageController
* @memberof module:PageController-Home
*/
export class HomePageController {
    htmlFilePath = '../src/frontend/components/templates/home.html';  // Filepath to HTML component
    name = 'home';                  // Page name
    compID = '#home-container';     // Page component container ID

    logger = new LoggerHelper(this.name);
    electronAPI = window.electronAPI;


    /**
    * Get the HTML file path for this page.
    * @function getHtmlCompPath
    * @memberof module:PageController-Home.HomePageController
    * @returns {string} The HTML file path.
    */
    getHtmlCompPath() {
        return this.htmlFilePath;
    }

    /**
    * Get the name identifier for this page.
    * @function getName
    * @memberof module:PageController-Home.HomePageController
    * @returns {string} The page name.
    */
    getName() {
        return this.name;
    }

    /**
    * Get the DOM container ID for this page component.
    * @function getCompID
    * @memberof module:PageController-Home.HomePageController
    * @returns {string} The component container ID.
    */
    getCompID() {
        return this.compID;
    }

    /**
    * Generate the formatted navbar display name for this page.
    * @function navbarName
    * @memberof module:PageController-Home.HomePageController
    * @returns {string} The navbar display name.
    */
    navbarName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    /**
    * Initialize the Home page.
    * @function initPage
    * @memberof module:PageController-Home.HomePageController
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
    * @memberof module:PageController-Home.HomePageController
    * @returns {void}
    */
    initPageListeners() {
        // Insert code for listeners here
    }

    /**
    * Set the Annotation page as active and visible in the UI.
    * @function setPageActive
    * @memberof module:PageController-Home.HomePageController
    * @returns {void}
    */
    setPageActive() {
        $(`#${this.name}`).addClass('active-nav-item');
        $(this.compID).show();
    }

    /**
    * Deactivate the page, hide its content, and remove navigation highlight.
    * @function setPageInactive
    * @memberof module:PageController-Home.HomePageController
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
}