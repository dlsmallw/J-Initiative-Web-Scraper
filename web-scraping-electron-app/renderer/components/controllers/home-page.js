export class HomePageController {
    htmlFilePath = './components/home.html';  // Filepath to HTML component
    name = 'home';                  // Page name
    compID = '#home-container';     // Page component container ID

    ipcRenderer = window.electronAPI;

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
        window.notifications = ["No notifications."];

        $('#navbar-ul-1').append(navbarItem);

        const insertElement = async () => {
            $('#d_content').append( await $.get(this.htmlFilePath));
        }

        insertElement().then(() => {

            //this.addNotifications("Joe is going to be late.", "Meeting at 4:30 today."); example
            this.initPageListeners();
            this.checkForNotifications();
            window.setInterval(this.checkForNotifications, 500); //check notifications every 0.5 seconds.
            this.manageTutorial();
        });
    }

    /**
     * Method for initializing the pages event listeners.
     */
    initPageListeners() {
        document.getElementById("notification-button").addEventListener("click", this.displayNotifications);
        document.getElementById("notification-x-button").addEventListener("click", this.displayNotificationsHelper);
        document.getElementById("notification-dismiss-button").addEventListener("click", this.removeNotifications);
        document.getElementById("yes-tutorial").addEventListener("click", this.runTutorialHome);
        document.getElementById("no-tutorial").addEventListener("click", this.disableTutorial);
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

        document.getElementById("number-of-notifications").innerHTML = notifications.length;
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
        var temp = document.getElementById("notification-box");

        alert("Notification dismissed.");
        let i = notifications.indexOf(temp.options[temp.selectedIndex].text);

        if (i > -1) {
            notifications.splice(i, 1);
        }

        temp.remove(temp.selectedIndex);

        document.getElementById("number-of-notifications").innerHTML = notifications.length;

        if(notifications.length === 0) {
            alert("No current notifications.");
            document.getElementById("notification-button").style.display = "hidden";
            document.getElementById("notification-x-button").style.visibility="hidden";
            document.getElementById("notification-box").style.visibility="hidden"; //test
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

        var notifs = document.getElementById('notification-box');

        notifications.forEach((element) => (notifs.add(new Option(element))));
        //notifications.forEach((element) => (new Notification(element))); //Notifications on desktop
    }

    /**
     * Helper method for displayNotifications().
     */
    displayNotificationsHelper() {
            document.getElementById("notification-button").style.display = "block";
            document.getElementById("notification-x-button").style.visibility="hidden";
            document.getElementById("notification-box").style.visibility="hidden";
            document.getElementById("notification-dismiss-button").style.visibility="hidden";

            var notifs = document.getElementById('notification-box');
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
     * Runs the tutorial's home section.
     */
    runTutorialHome() {
        document.getElementById("tutorial").style.display = "none";

        document.getElementById("tutorial-home").style.display = "block";

        try { //notifications example for tutorial
            if(notifications[0] === "No notifications.") {
                notifications[0] = "Joe is going to be late.";
                notifications[1] = "Meeting at 4:30 today.";
            } else {
                notifications.push("Joe is going to be late.");
                notifications.push("Meeting at 4:30 today.");

                notifications.length += 2;
            }
        } catch(e) {
            console.log("Tutorial notifications were unable to be added.");
        }
    }

    disableTutorial() {
        alert("Got it! Tutorial has been disabled.");

        localStorage.setItem('tutorial', "disabled");
        document.getElementById("tutorial").style.display = "none";
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

    /**
     * Handles displaying an alert message for specific situations (error or otherwise).
     * @param {*} alertMsg          Message to display.
     * @param {*} cause             Cause if an error.
     */
    postAlert(alertMsg, cause) {
        if (cause === undefined) {
            alert(alertMsg);
        } else {
            alert(`ERROR: ${alertMsg}\nCAUSE: ${cause}`);
        }
    }

    /**
     * Send an info log message to the main process.
     * @param {string} message - The message to log.
     */
    logInfo(message) {
        this.ipcRenderer.send('log-info', message);
    }

    /**
     * Send a debug log message to the main process.
     * @param {string} message - The message to log.
     */
    logDebug(message) {
        this.ipcRenderer.send('log-debug', message);
    }

    /**
     * Send a warning log message to the main process.
     * @param {string} message - The message to log.
     */
    logWarn(message) {
        this.ipcRenderer.send('log-warn', message);
    }

    /**
     * Send an error log message to the main process.
     * @param {string} message - The message to log.
     */
    logError(message) {
        this.ipcRenderer.send('log-error', message);
    }

    //============================================================================================================================
    // Page Specific Methods
    //============================================================================================================================
}