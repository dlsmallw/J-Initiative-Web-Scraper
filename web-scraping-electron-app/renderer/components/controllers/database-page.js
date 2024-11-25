export class DatabasePageController {
    htmlFilePath = '../database.html';  // Filepath to HTML component
    name = 'database';                  // Page name
    compID = '#database-container';     // Page component container ID

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
     * Method for intitializing the page in the application.
     */
    async initPage() {
        $('#d_content').append(await $.get(this.getHtmlCompPath));
    }

    /**
     * Method for initializing the pages event listeners.
     */
    initPageListeners() {

    }

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
}