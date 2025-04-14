/**
 * @file preload.js
 * @description Securely bridges Electron's main and renderer processes via contextBridge.
 * Exposes limited, safe APIs for logging, Label Studio integration, URL scraping, and database interaction.
 */


// Import necessary modules from Electron
const { contextBridge, ipcRenderer} = require('electron');

/**
 * Exposes version information for Node.js, Chrome, and Electron to the renderer.
 * @namespace versions
 * @property {function(): string} node - Returns Node.js version.
 * @property {function(): string} chrome - Returns Chrome version.
 * @property {function(): string} electron - Returns Electron version.
 */
contextBridge.exposeInMainWorld(
    'versions', {       
        // Method to get the Node.js version
        node: () => process.versions.node,
        // Method to get the Chrome version
        chrome: () => process.versions.chrome,
        // Method to get the Electron version
        electron: () => process.versions.electron
    }
);

/**
 * Logging API exposed to renderer for sending log messages to the main process.
 * @namespace log
 * @property {function(string): void} info - Logs an info-level message.
 * @property {function(string): void} debug - Logs a debug-level message.
 * @property {function(string): void} warn - Logs a warning.
 * @property {function(string): void} error - Logs an error message.
 * @property {function(): Promise<Array>} requestLogs - Requests all current logs.
 * @property {function(Function): void} logUpdate - Listener for new log updates.
 * @property {function(): void} clearLogs - Clears log file content.
 * @property {function(Function): void} logsClearedUpdate - Listener for log-clear success.
 * @property {function(Function): void} logClearError - Listener for log-clear error.
 */
contextBridge.exposeInMainWorld(
    'log', {
        info: (message) => {
            ipcRenderer.send('log-info', message);
        },
        debug: (message) => {
            ipcRenderer.send('log-debug', message);
        },
        warn: (message) => {
            ipcRenderer.send('log-warn', message);
        },
        error: (message) => {
            ipcRenderer.send('log-error', message);
        },
        requestLogs: () => {
            return ipcRenderer.invoke('get-logs');
        },
        logUpdate: (func) => {
            ipcRenderer.on('update-to-logs', (event, ...args) => func(...args));
        },
        clearLogs: () => {
            ipcRenderer.send('logs:clear');
        },
        logsClearedUpdate: (func) => {
            ipcRenderer.on('logs:cleared', (event, ...args) => func(...args));
        },
        logClearError: (func) => {
            ipcRenderer.on('logs:cleared-error', (event, ...args) => func(...args));
        }

    }
);

/**
 * Label Studio (LS) API exposed to renderer for interacting with LS projects and windows.
 * @namespace lsAPI
 * @property {function(Object, string): void} exportDataToLS - Export data to linked LS project.
 * @property {function(Function): void} onExportResponse - Listener for LS export responses.
 * @property {function(string): void} openExternal - Opens LS project in external window.
 * @property {function(Function): void} setExtLSURL - Listener to receive URL in LS window.
 * @property {function(Function): void} extLSWinClosed - Listener for LS window close event.
 * @property {function(string): void} extLSURLChange - Sends LS URL change to main process.
 * @property {function(Function): void} urlChange - Listener for LS URL updates.
 * @property {function(): void} sendCloseSignal - Requests closing LS external window.
 * @property {function(Function): void} updateToProjectList - Listener for LS project list updates.
 * @property {function(string, string): void} initVariables - Initialize LS URL and token.
 * @property {function(string): void} updateURL - Update linked LS project URL.
 * @property {function(string): void} updateToken - Update LS project API token.
 * @property {function(): void} clearLinkedProject - Clears linked LS project data.
 */
contextBridge.exposeInMainWorld(
    'lsAPI', {
        //=================================================================================================
        // IPC Methods for handling LS app api calls
        //=================================================================================================
        // Used for exporting scraped data to a linked LS project
        exportDataToLS: (data, projectID) => {
            ipcRenderer.send('export-to-ls:request', data, projectID);
        },
        onExportResponse: (func) => {
            ipcRenderer.on('export-to-ls:response', (event, ...args) => func(...args));
        },
        
        //=================================================================================================
        // External LS Window IPC Methods
        //=================================================================================================
        // Used for openning an instance of the LS project in a separate window
        openExternal: (url) => {
            ipcRenderer.send('open-ls-ext:request', url);
        },
        setExtLSURL: (func) => {
            ipcRenderer.on('set-ls-url', (event, ...args) => func(...args));
        },
        extLSWinClosed: (func) => {
            ipcRenderer.on('ext-ls-win-closed', (event, ...args) => func(...args));
        },
        extLSURLChange: (url) => {
            ipcRenderer.send('ext-ls-url-change', url);
        },
        urlChange: (func) => {
            ipcRenderer.on('ls-navigation-update', (event, ...args) => func(...args));
        },
        sendCloseSignal: () => {
            ipcRenderer.send('close-anno-win');
        },

        //=================================================================================================
        // API calls to LS Linked App
        //=================================================================================================
        updateToProjectList: (func) => {
            ipcRenderer.on('ls-projects-update', (event, ...args) => func(...args));
        }, 

        //=================================================================================================
        // IPC Methods for updating info about linked LS app
        //=================================================================================================
        initVariables: (url, token) => {
            ipcRenderer.send('init-ls-vars:request', url, token);
        },
        // Used to update the URL for the linked LS project
        updateURL: (url) => {
            ipcRenderer.send('update-linked-ls:request', url);
        },
        // Used to update the API Token for the linked LS Project
        updateToken: (token) => {
            ipcRenderer.send('update-ls-api-token:request', token);
        },
        // Used to clear the linked LS Project (clears URL and API Token)
        clearLinkedProject: () => {
            ipcRenderer.send('clear-linked-ls:request');
        },

    }
);

/**
 * General IPC API for communicating between renderer and main processes.
 * Restricts access to allowed channels for security.
 * @namespace electronAPI
 * @property {function(string, any): void} send - Send data to main process (validated channels).
 * @property {function(string, Function): void} receive - Listen for data from main (validated channels).
 * @property {function(string): void} openExternal - Request opening a URL in external window.
 * @property {function(Function): void} openURLErr - Listen for URL open error.
 * @property {function(Function): void} onExtWindowClose - Listen for external window close.
 * @property {function(): void} exitSignal - Request app termination.
 * @property {Object} postDialog - Dialog utilities.
 * @property {function(string): void} postDialog.general - Shows general message dialog.
 * @property {function(string): void} postDialog.error - Shows error dialog.
 */
contextBridge.exposeInMainWorld(
    'electronAPI', {    // Expose a safe API for IPC communication between renderer and main processes
        // Method to send messages from renderer to main process
        send: (channel, data) => {
            // Define a list of valid channels to limit communication to safe ones only
            const validChannels = ['scrapedData:export', 'logs:clear'];
            // Only send the message if the channel is in the list of valid channels
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        // Method to receive messages from the main process in the renderer process
        receive: (channel, func) => {
            // Define a list of valid channels that the renderer can listen to
            const validChannels = ['exportData:response', 'scrapedData:update', 'logs:cleared', 'logs:cleared-error'];
            // Only attach a listener if the channel is in the list of valid channels
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        openExternal: (url) => {
            ipcRenderer.send('open-url', url);
        },
        openURLErr: async (func) => {
            ipcRenderer.on('open-url-error', (event, ...args) => func(...args));
        },
        onExtWindowClose: (func) => {
            ipcRenderer.on('ext-url-win-closed', (event, ...args) => func(...args));
        },
        exitSignal: () => {
            ipcRenderer.send('exit:request');
        },
        postDialog: {
            general: (message) => {
                ipcRenderer.send('gen-dialog', message);
            },
            error: (message) => {
                ipcRenderer.send('err-dialog', message);
            }
        }
    }
);

/**
 * URL Scraping API for sending and receiving data during scraping sessions.
 * @namespace urlScrape
 * @property {function(string, any): void} send - Send data via IPC.
 * @property {function(string, Function): void} receive - Listen for data.
 * @property {function(): void} sendCloseSignal - Requests scrape window closure.
 */
contextBridge.exposeInMainWorld('urlScrape', {
    send: (channel, data) => {
        const validChannels = ['scrapedData:export'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        const validChannels = ['setUrl'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    sendCloseSignal: () => {
        ipcRenderer.send('close-scrape-win');
    }
});

/**
 * Database API for interacting with Firebase-hosted website data.
 * @namespace databaseAPI
 * @property {function(): Promise<string>} getWebsiteData - Get list of websites.
 * @property {function(string): Promise<string>} getWebsiteEntries - Get entries for a given website.
 * @property {function(string): Promise<string>} getWebsiteLastAccessed - Get last accessed for a given website.
 * @property {function(string): Promise<void>} addWebsiteToDatabase - Add new website URL.
 * @property {function(Array): Promise<void>} addScrapedDataToDatabase - Add scraped data for a website.
 */
contextBridge.exposeInMainWorld('databaseAPI', {
  getWebsiteData: () => {
    return ipcRenderer.invoke('get-websites');
  },
  getWebsiteEntries: (url) => {
    return ipcRenderer.invoke('get-websites-entries', url);
  },
  getWebsiteLastAccessed: (url) => {
    return ipcRenderer.invoke('get-websites-LastAccessed', url);
  },
  addWebsiteToDatabase: (url) => {
    return ipcRenderer.invoke('add-website', url);
  },
  addScrapedDataToDatabase: (data) => {
    return ipcRenderer.invoke('add-scraped-data', data);
  }
});
