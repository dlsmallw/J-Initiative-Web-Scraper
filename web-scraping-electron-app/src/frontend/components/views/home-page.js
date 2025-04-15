/**
* @file home-page.js
* @fileoverview Controls the behavior and initialization of the Home page in the UI.
*
* @module PageController-Home
*/

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
        window.notifications = ["No notifications."];

        $('#navbar-ul-1').append(navbarItem);

        const insertElement = async () => {
            $('#d_content').append( await $.get(this.htmlFilePath));
        }

        insertElement().then(() => {
            

            this.initPageListeners();
            this.checkForNotifications();
            window.setInterval(this.checkForNotifications, 500); //check notifications every 0.5 seconds.
            this.manageTutorial();
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
        document.getElementById("notification-button").addEventListener("click", this.displayNotifications);
        document.getElementById("notification-x-button").addEventListener("click", this.displayNotificationsHelper);
        document.getElementById("notification-dismiss-button").addEventListener("click", this.removeNotifications);
        document.getElementById("yes-tutorial").addEventListener("click", this.runTutorialHome);
        document.getElementById("no-tutorial").addEventListener("click", this.disableTutorial);
        document.getElementById("tutorial-x-button").addEventListener("click", this.disableTutorial);
    }

    /**
     * Method to check for notifications.
     */
    checkForNotifications() {
        if(notifications[0] === "No notifications.") {
            document.getElementById("notification-button").style.visibility = "hidden";
        } else {
            document.getElementById("notification-button").style.visibility = "visible";
        }

        document.getElementById("number-of-notifications").innerHTML = "" + notifications.length;
    }

    /**
     * Method to populate notifications.
     * @param notification to add.
     */
    addNotifications(...notification) {
        if(notifications[0] === "No notifications.") {
            notifications[0] = notification[0];

            for(let i = 1; i < notification.length; i++) {
                notifications[i] = notification[i];
            }
        } else {
            let temp = notifications.length, i = 0;
            while((notification.length + temp) > notifications.length) {
                notifications.push(notification[i]);
                i++;
            }

            notifications.length = (notification.length + temp);
        }

        return 0;
    };

    /**
     * Method to remove notifications.
     */
    removeNotifications() {
        let temp = document.getElementById("notification-box");

        alert("Notification dismissed.");
        let i = notifications.indexOf(temp.options[temp.selectedIndex].text);

        if (i > -1) {
            notifications.splice(i, 1);
        }

        temp.remove(temp.selectedIndex);

        document.getElementById("number-of-notifications").innerHTML = notifications.size;

        if(notifications.length === 0) {
            alert("No current notifications.");
            document.getElementById("notification-button").style.display = "hidden";
            document.getElementById("notification-x-button").style.visibility="hidden";
            document.getElementById("notification-box").style.visibility="hidden";
            document.getElementById("notification-dismiss-button").style.visibility="hidden";
        }
    }

    /**
     * Method for showing notifications.
     */
    displayNotifications() {
        if(notifications[0] !== "No notifications.") {
            document.getElementById("notification-button").style.display = "none";
            document.getElementById("notification-x-button").style.visibility = "visible";
            document.getElementById("notification-box").style.visibility="visible";
            document.getElementById("notification-dismiss-button").style.visibility="visible";
        }

        let notifs = document.getElementById('notification-box');

        notifications.forEach((element) => (notifs.add(new Option(element))));
    }

    /**
     * Helper method for displayNotifications().
     */
    displayNotificationsHelper() {
        document.getElementById("notification-button").style.display = "block";
        document.getElementById("notification-x-button").style.visibility="hidden";
        document.getElementById("notification-box").style.visibility="hidden";
        document.getElementById("notification-dismiss-button").style.visibility="hidden";

        let notifs = document.getElementById('notification-box');
        notifications.forEach((element) => (notifs.remove(element)));
    }

    /**
     * Manages optional tutorial for new users.
     */
    manageTutorial() {
        if(localStorage.getItem('tutorial') !== "disabled") {
            document.getElementById("tutorial").style.display = "block";
        }
    }

    /**
     * Runs the tutorial.
     */
    runTutorialHome() {
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("tutorial-content").style.display = "block";

        $('#embed-tutorial').load("../src/frontend/components/templates/tutorial.html");
        localStorage.setItem('tutorial', "disableOnExit");
    }

    /**
     * Disables the tutorial.
     */
    disableTutorial() {
        alert("Got it! Tutorial has been disabled.");

        localStorage.setItem('tutorial', "disabled");
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("tutorial-content").style.display = "none";
        $('#embed-tutorial').remove();
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

    //============================================================================================================================
    // Logging Helpers (WIP - Plan to move to a separate class that is imported)
    //============================================================================================================================
    logger = window.log;    // Variable created for ease of reading

    /**
    * Display an alert message or error dialog, and log the event.
    * @function postAlert
    * @memberof module:PageController-Home.HomePageController
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
    * @memberof module:PageController-Home.HomePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logInfo(message) {
        this.logger.info(message);
    }

   /**
    * Send a debug log message to the main process.
    * @function logDebug
    * @memberof module:PageController-Home.HomePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logDebug(message) {
        this.logger.debug(message);
    }

    /**
    * Send a warning log message to the main process.
    * @function logWarn
    * @memberof module:PageController-Home.HomePageController
    * @param {string} message - The message to log.
    * @returns {void}
    */
    logWarn(message) {
        this.logger.warn(message);
    }

   /**
    * Send an error log message to the main process.
    * @function logError
    * @memberof module:PageController-Home.HomePageController
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