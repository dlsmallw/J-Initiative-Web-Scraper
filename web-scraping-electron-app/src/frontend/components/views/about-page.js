/**
 * @file about-page.js
 * @namespace View-About
 * @description Controls the behavior and initialization of the About page in the UI.
 */

 /**
* Controller for managing the Annotation page, including its UI interactions and Label Studio project linking.
* @class AboutPageController
* @memberof View-About
*/
export class AboutPageController {
    htmlFilePath = '../src/frontend/components/templates/about.html';  // Filepath to HTML component
    name = 'about';                  // Page name
    compID = '#about-container';     // Page component container ID

    electronAPI = window.electronAPI;

    /**
     * Get the HTML component filepath for this page.
     * @function getHtmlCompPath
     * @memberof View-About.AboutPageController
     * @returns {string} The HTML file path.
     */
    getHtmlCompPath() {
        return this.htmlFilePath;
    }

    /**
     * Get the name identifier for this page.
     * @function getName
     * @memberof View-About.AboutPageController
     * @returns {string} The page name.
     */
    getName() {
        return this.name;
    }

     /**
     * Get the DOM container ID for this page component.
     * @function getCompID
     * @memberof View-About.AboutPageController
     * @returns {string} The component container ID.
     */
    getCompID() {
        return this.compID;
    }

     /**
     * Generate the capitalized navbar name for this page.
     * @function navbarName
     * @memberof View-About.AboutPageController
     * @returns {string} The navbar display name.
     */
    navbarName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

     /**
     * Initialize the Annotation page, load its HTML, and configure Label Studio project linking.
     * @function initPage
     * @memberof View-About.AboutPageController
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
     * @memberof View-About.AboutPageController
     */
    initPageListeners() {
        $('#node-version').html(versions.node());
        $('#chrome-version').html(versions.chrome());
        $('#electron-version').html(versions.electron());
    }

    /**
     * Set the Annotation page as active and visible in the UI.
     * @function setPageActive
     * @memberof View-About.AboutPageController
     */
    setPageActive() {
        $(`#${this.name}`).addClass('active-nav-item');
        $(this.compID).show();
    }

    /**
     * Set the Annotation page as inactive and hidden in the UI.
     * @function setPageInactive
     * @memberof View-Annotation.AnnotationPageController
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
     * Display an alert message via Electron dialog and log it appropriately.
     * @function postAlert
     * @memberof View-About.AboutPageController
     * @param {*} alertMsg - Message to display.
     * @param {*} [cause] - Optional cause of the alert.
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
     * Log an informational message.
     * @function logInfo
     * @memberof View-About.AboutPageController
     * @param {string} message - The message to log.
     */
    logInfo(message) {
        this.logger.info(message);
    }

    /**
     * Log a debug message.
     * @function logDebug
     * @memberof View-About.AboutPageController
     * @param {string} message - The message to log.
     */
    logDebug(message) {
        this.logger.debug(message);
    }

   /**
     * Log a warning message.
     * @function logWarn
     * @memberof View-About.AboutPageController
     * @param {string} message - The message to log.
     */
    logWarn(message) {
        this.logger.warn(message);
    }

    /**
     * Log an error message.
     * @function logError
     * @memberof View-About.AboutPageController
     * @param {string} message - The message to log.
     */
    logError(message) {
        this.logger.error(message);
    }

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================
}