/**
 * @file annotation-page.js
 * @namespace View-Annotation
 * @description Controls the behavior and initialization of the Annotation page, including Label Studio integration.
 */

/**
* Controller for managing the Annotation page, including its UI interactions and Label Studio project linking.
* @class AnnotationPageController
* @memberof View-Annotation
*/
export class AnnotationPageController {
    htmlFilePath = '../src/frontend/components/templates/annotation.html';  // Filepath to HTML component
    name = 'annotation';                  // Page name
    compID = '#annotation-container';     // Page component container ID

    lsAPI = window.lsAPI;
    electronAPI = window.electronAPI;

     /**
     * Get the HTML component filepath for this page.
     * @function getHtmlCompPath
     * @memberof View-Annotation.AnnotationPageController
     * @returns {string} The HTML file path.
     */
    getHtmlCompPath() {
        return this.htmlFilePath;
    }

    /**
     * Get the name identifier for this page.
     * @function getName
     * @memberof View-Annotation.AnnotationPageController
     * @returns {string} The page name.
     */
    getName() {
        return this.name;
    }

    /**
     * Get the DOM container ID for this page component.
     * @function getCompID
     * @memberof View-Annotation.AnnotationPageController
     * @returns {string} The component container ID.
     */
    getCompID() {
        return this.compID;
    }

    /**
     * Generate the capitalized navbar name for this page.
     * @function navbarName
     * @memberof View-Annotation.AnnotationPageController
     * @returns {string} The navbar display name.
     */
    navbarName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    /**
     * Initialize the Annotation page, load its HTML, and configure Label Studio project linking.
     * @function initPage
     * @memberof View-Annotation.AnnotationPageController
     */
    initPage() {
        var navLink = $(`<a class="nav-link" id="${this.name}-nav" href="#">${this.navbarName()}</a>`);
        var navbarItem = $(`<li class="nav-item" id="${this.name}"></li>`).append(navLink);

        $('#navbar-ul-1').append(navbarItem);

        const insertElement = async () => {
            $('#d_content').append( await $.get(this.htmlFilePath));
        }

        insertElement().then(() => {
            const ls_url = localStorage.getItem('lsURL');
            const api_token = localStorage.getItem('apiToken');

            if (ls_url) {   // Label Studio project linked
                $('#annotation-webview').attr('src', ls_url);
                this.showLSEmbeddedFrame();

                $('#ls-link-option').val(ls_url);
                

                if (api_token) {
                    $('#ls-api-token-option').val(api_token);
                    this.lsAPI.initVariables(ls_url, api_token);
                } else {
                    this.lsAPI.updateURL(ls_url);
                }
            } else {        // No Label Studio project linked
                this.hideLSEmbeddedFrame();
            }

            this.initPageListeners();
        });
    }

     /**
     * Initialize event listeners for this page's DOM elements.
     * Handles UI interactions such as linking Label Studio projects and external window management.
     * @function initPageListeners
     * @memberof View-Annotation.AnnotationPageController
     */
    initPageListeners() {
        // Fade in/out animation for button on annotation page
        $('#annotation-container')
            .on('mouseenter', function() { $('#ext-win-btn').stop( true, true ).fadeTo(500, 0.2); })
            .on('mouseleave', function() { $('#ext-win-btn').stop( true, true ).fadeOut(500); });

        // Handles openning the LS app in an external window
        $('#ext-win-btn').on('click', () => {
            $('#ls-embedded').hide();
            $('#ls-external').show();
            var url = $('#annotation-webview').attr('src');
            this.lsAPI.openExternal(url);
        });

        // Handles when clicking the "Clear Linked Project" button
        $('#clearLSLinkBtn').on('click', () => {
            this.clearLinkedLSProject();
        });

        // Handles submission of new LS URL by submit button
        $('#submitLSURLBtn').on('click', () => {
            this.initLSURL();
        });

        // Handles submission of new LS URL by hitting enter
        $('#ls-link-input').on('keypress', (event) => {
            if (event.key === 'Enter') {
                this.initLSURL();
            }
        });

        $('#update-ls-link-btn').on('click', () => {
            this.updateLSURL();
        });

        $('#update-api-token-btn').on('click', () => {
            this.updateLSAPIToken();
        });

        $('#config-accordion').on('click', () => {
            if ($('#config-accordion').hasClass('collapsed')) {
                $('body').height($('body').height() - 270);
            } else {
                $('body').height($('body').height() + 270);
            }
        })

        this.lsAPI.urlChange((url) => {
            this.updatedLSWebviewSrc(url);
        })

        this.lsAPI.extLSWinClosed(() => {
            $('#ls-external').hide();
            $('#ls-embedded').show();
        });
    }

    /**
     * Set the Annotation page as active and visible in the UI.
     * @function setPageActive
     * @memberof View-Annotation.AnnotationPageController
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
     * @memberof View-Annotation.AnnotationPageController
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
     * @memberof View-Annotation.AnnotationPageController
     * @param {string} message - The message to log.
     */
    logInfo(message) {
        this.logger.info(message);
    }

    /**
     * Log a debug message.
     * @function logDebug
     * @memberof View-Annotation.AnnotationPageController
     * @param {string} message - The message to log.
     */
    logDebug(message) {
        this.logger.debug(message);
    }

     /**
     * Log a warning message.
     * @function logWarn
     * @memberof View-Annotation.AnnotationPageController
     * @param {string} message - The message to log.
     */
    logWarn(message) {
        this.logger.warn(message);
    }

     /**
     * Log an error message.
     * @function logError
     * @memberof View-Annotation.AnnotationPageController
     * @param {string} message - The message to log.
     */
    logError(message) {
        this.logger.error(message);
    }

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================

    /**
     * Validate that the entered Label Studio URL is valid and secure (must use HTTPS and contain 'hf').
     * @function checkLSURL
     * @memberof View-Annotation.AnnotationPageController
     * @param {*} url - The URL to validate.
     * @returns {boolean} True if valid, false otherwise.
     */
    checkLSURL(url) {
        let lsURL;

        try {  
            lsURL = new URL(url);
        } catch (err) {
            return false;
        }

        if (lsURL.protocol !== "https:") {
            return false;
        } 
        
        var host = lsURL.host;
        var strArr = host.split('.');
        
        if (!strArr.find(st => st === 'hf')) {
            return false;
        }

        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 404) {
                    return false;
                }
            }
        }
        req.send();

        return true;
    }

    /**
     * Handle submission of a new Label Studio URL and store it if valid.
     * @function initLSURL
     * @memberof View-Annotation.AnnotationPageController
     */
    initLSURL() {
        var urlInput = $('#ls-link-input').val();

        if (urlInput !== '') {
            if (this.checkLSURL(urlInput)) {
                this.setLSURL(urlInput);
                this.showLSEmbeddedFrame();
            } else {
                this.postAlert("The URL '" + urlInput + "' is not valid", 'Invalid URL');
                $('#ls-link-input').val('');
            }
        }
    }

    /**
     * Update the stored Label Studio URL based on user input.
     * @function updateLSURL
     * @memberof View-Annotation.AnnotationPageController
     */
    updateLSURL() {
        var currURL = localStorage.getItem('lsURL');
        var urlInput = $('#ls-link-option').val();

        if (this.checkLSURL(urlInput)) {
            this.setLSURL(urlInput);
        } else {
            this.postAlert("The URL '" + urlInput + "' is not valid", 'Invalid URL');
            $('#ls-link-option').val(currURL);
        }
    }

    /**
     * Update the webview's displayed URL if it differs from the stored value.
     * @function updatedLSWebviewSrc
     * @memberof View-Annotation.AnnotationPageController
     * @param {*} url - The new URL to display.
     */
    updatedLSWebviewSrc(url) {
        var currURL = $('#annotation-webview').attr('src');

        if (currURL !== url) {
            $('#annotation-webview').attr('src', url);
        }
    }

    /**
     * Set the Label Studio project URL in local storage and update the embedded view.
     * @function setLSURL
     * @memberof View-Annotation.AnnotationPageController
     * @param {*} url - The Label Studio URL.
     */
    setLSURL(url) {
        if (url) {
            localStorage.setItem('lsURL', url);
            $('#ls-link-option').val(url);
            $('#annotation-webview').attr('src', url);
            this.lsAPI.updateURL(url);
        }
    }

     /**
     * Update the stored API token based on user input.
     * @function updateLSAPIToken
     * @memberof View-Annotation.AnnotationPageController
     */
    updateLSAPIToken() {
        let regex = /^[A-Za-z0-9]+$/g;

        var tokenVal = $('#ls-api-token-option').val();
        var currToken = localStorage.getItem('apiToken');

        if (regex.test(tokenVal)) {
            localStorage.setItem('apiToken', tokenVal);
            this.setLSAPIToken(tokenVal);
        } else {
            this.postAlert('The API Token is not valid', 'Invalid API Token');

            if (currToken) {
                $('#ls-api-token-option').val(currToken);
            }
        }
    }

     /**
     * Store a new API token and update the Label Studio API.
     * @function setLSAPIToken
     * @memberof View-Annotation.AnnotationPageController
     * @param {*} token - The new API token.
     */
    setLSAPIToken(token) {
        if (token) {
            localStorage.setItem('apiToken', token);
            $('#ls-api-token-option').val(token);
            this.lsAPI.updateToken(token);
        } 
    }

     /**
     * Clear the currently linked Label Studio project and reset related UI elements.
     * @function clearLinkedLSProject
     * @memberof View-Annotation.AnnotationPageController
     */
    clearLinkedLSProject() {
        this.hideLSEmbeddedFrame();

        localStorage.removeItem('lsURL');
        $('#ls-link-option').val('');
        $('#annotation-webview').attr('src', "");

        localStorage.removeItem('apiToken');
        $('#ls-api-token-option').val('');
        
        this.lsAPI.clearLinkedProject();
    }

   /**
     * Show the embedded Label Studio frame in the UI.
     * @function showLSEmbeddedFrame
     * @memberof View-Annotation.AnnotationPageController
     */
    showLSEmbeddedFrame() {
        $('#ls-not-set').hide();
        $('#ls-set').show();
        $('#ls-config-accordion').show();
    }

    /**
     * Hide the embedded Label Studio frame and show URL submission form.
     * @function hideLSEmbeddedFrame
     * @memberof View-Annotation.AnnotationPageController
     */
    hideLSEmbeddedFrame() {
        $('#ls-set').hide();
        $('#ls-config-accordion').hide();
        $('#ls-not-set').show();
    }
}