/**
* @file about-page.js
* @fileoverview Controls the behavior and initialization of the About page in the UI.
*
* @module PageController-About
*/

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
        // Append to the Pages dropdown
        $('#navbar-dropdown-list').append(navLink);


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

    //============================================================================================================================
    // Logging Helpers (WIP - Plan to move to a separate class that is imported)
    //============================================================================================================================
    logger = window.log;    // Variable created for ease of reading

    /**
    * Display an alert message or error dialog, and log the event.
    * @function postAlert
    * @memberof module:PageController-About.AboutPageController
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
    * @memberof module:PageController-About.AboutPageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logInfo(message) {
        this.logger.info(message);
    }

    /**
    * Send a debug log message to the main process.
    * @function logDebug
    * @memberof module:PageController-About.AboutPageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logDebug(message) {
        this.logger.debug(message);
    }

   /**
    * Send a warning log message to the main process.
    * @function logWarn
    * @memberof module:PageController-About.AboutPageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logWarn(message) {
        this.logger.warn(message);
    }

    /**
    * Send an error log message to the main process.
    * @function logError
    * @memberof module:PageController-About.AboutPageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logError(message) {
        this.logger.error(message);
    }

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================
}