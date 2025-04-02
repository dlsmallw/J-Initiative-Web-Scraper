/**
* @file about-page.js
* @fileoverview Controls the behavior and initialization of the About page in the UI.
*
* @module PageController-About
*/

import { LoggerHelper } from '../../../backend/utils/logger-helper.js';

/**
* Controller for managing the Scrape page.
*
* @class AboutPageController
* @memberof module:PageController-About
*/
export class AboutPageController {
    htmlFilePath = '../src/frontend/components/templates/about.html';  // Filepath to HTML component
    name = 'about';                  // Page name
    compID = '#about-container';     // Page component container ID

    logger = new LoggerHelper(this.name);
    electronAPI = window.electronAPI;

    /**
    * Get the HTML component filepath for this page.
    * @function getHtmlCompPath
    * @memberof module:PageController-About.AboutPageController
    * @returns {string} The HTML file path.
    */
    getHtmlCompPath() {
        return this.htmlFilePath;
    }

    /**
    * Get the name identifier for this page.
    * @function getName
    * @memberof module:PageController-About.AboutPageController
    * @returns {string} The page name.
    */
    getName() {
        return this.name;
    }

    /**
    * Get the DOM container ID for this page component.
    * @function getCompID
    * @memberof module:PageController-About.AboutPageController
    * @returns {string} The component container ID.
    */
    getCompID() {
        return this.compID;
    }

    /**
    * Generate the capitalized navbar name for this page.
    * @function navbarName
    * @memberof module:PageController-About.AboutPageController
    * @returns {string} The navbar display name.
    */
    navbarName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    /**
    * Initialize the About page.
    * @function initPage
    * @memberof module:PageController-About.AboutPageController
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
    * @memberof module:PageController-About.AboutPageController
    * @returns {void}
    */
    initPageListeners() {
        $('#node-version').html(versions.node());
        $('#chrome-version').html(versions.chrome());
        $('#electron-version').html(versions.electron());
    }

    /**
    * Set the Annotation page as active and visible in the UI.
    * @function setPageActive
    * @memberof module:PageController-About.AboutPageController
    * @returns {void}
    */
    setPageActive() {
        $(`#${this.name}`).addClass('active-nav-item');
        $(this.compID).show();
    }

    /**
    * Deactivate the page, hide its content, and remove navigation highlight.
    * @function setPageInactive
    * @memberof module:PageController-About.AboutPageController
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
}