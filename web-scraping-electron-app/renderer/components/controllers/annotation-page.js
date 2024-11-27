export class AnnotationPageController {
    htmlFilePath = './components/annotation.html';  // Filepath to HTML component
    name = 'annotation';                  // Page name
    compID = '#annotation-container';     // Page component container ID

    lsAPI = window.lsAPI;

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
            const ls_url = localStorage.getItem('lsURL');
            const api_token = localStorage.getItem('apiToken');

            if (ls_url) {   // Label Studio project linked
                $('#annotation-iframe').attr('src', ls_url);
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
     * Method for initializing the pages event listeners.
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
            var url = $('#annotation-iframe').attr('src');
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

        this.lsAPI.onOpenExtRes(() => {
            $('#ls-external').hide();
            $('#ls-embedded').show();
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

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================

    /**
     * Method used to validate that the URL entered for linking a LS project is valid.
     * @param {*} url       The URL.
     * @returns             A boolean indicating if it is valid or not.
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
     * Function for handling the event where a LS URL is entered and submitted.
     */
    initLSURL() {
        var urlInput = $('#ls-link-input').val();

        if (urlInput !== '') {
            if (this.checkLSURL(urlInput)) {
                this.setLSURL(urlInput);
                this.showLSEmbeddedFrame();
            } else {
                alert("The URL '" + urlInput + "' is not valid");
                $('#ls-link-input').val('');
            }
        }
    }

    /**
     * Function for updating the LS URL using the URL field within the LS Config Menu.
     */
    updateLSURL() {
        var currURL = localStorage.getItem('lsURL');
        var urlInput = $('#ls-link-option').val();

        if (this.checkLSURL(urlInput)) {
            this.setLSURL(urlInput);
        } else {
            alert("The URL '" + urlInput + "' is not valid");
            $('#ls-link-option').val(currURL);
        }
    }


    /**
     * Function for setting the LS project URL within local storage.
     * @param {*} url 
     */
    setLSURL(url) {
        if (url) {
            localStorage.setItem('lsURL', url);
            $('#ls-link-option').val(url);
            $('#annotation-iframe').attr('src', url);
            this.lsAPI.updateURL(url);
        }
    }

    /**
     * Function for updating the API Token when using the API Field in the LS Config Menu.
     */
    updateLSAPIToken() {
        let regex = /^[A-Za-z0-9]+$/g;

        var tokenVal = $('#ls-api-token-option').val();
        var currToken = localStorage.getItem('apiToken');

        if (regex.test(tokenVal)) {
            localStorage.setItem('apiToken', tokenVal);
            this.setLSAPIToken(tokenVal);
        } else {
            alert('Invalid API Token');

            if (currToken) {
                $('#ls-api-token-option').val(currToken);
            }
        }
    }

    /**
     * Handles the logic for changing the stored API Token value.
     * @param {*} token         The new API Token.
     */
    setLSAPIToken(token) {
        if (token) {
            localStorage.setItem('apiToken', token);
            $('#ls-api-token-option').val(token);
            this.lsAPI.updateToken(token);
        } 
    }

    /**
     * Function for handling clearing the linked LS project when clicking the "Clear Linked Project" button
     * in the LS Config Menu.
     */
    clearLinkedLSProject() {
        this.hideLSEmbeddedFrame();

        localStorage.removeItem('lsURL');
        $('#ls-link-option').val('');
        $('#annotation-iframe').attr('src', "");

        localStorage.removeItem('apiToken');
        $('#ls-api-token-option').val('');
        
        this.lsAPI.clearLinkedProject();
    }

    /**
     * Handles showing the LS embedded window (project linked).
     */
    showLSEmbeddedFrame() {
        $('#ls-not-set').hide();
        $('#ls-set').show();
        $('#ls-config-accordion').show();
    }

    /**
     * Handles hiding the LS Embedded window (project not linked) and showing the form
     * for taking a new URL.
     */
    hideLSEmbeddedFrame() {
        $('#ls-set').hide();
        $('#ls-config-accordion').hide();
        $('#ls-not-set').show();
    }
}