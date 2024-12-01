//preload.js
/**
 * This file is used to bridge separate Electron processes together
 */

// Import necessary modules from Electron
const { contextBridge, ipcRenderer} = require('electron');

// Expose version information to the renderer process through the context bridge
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

// Methods for logging
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
        }
    }
);

contextBridge.exposeInMainWorld(
    'lsAPI', {
        // Used for openning an instance of the LS project in a separate window
        openExternal: (url) => {
            ipcRenderer.send('open-ls-ext:request', url);
        },
        onOpenExtRes: (func) => {
            ipcRenderer.on('open-ls-ext:response', (event, ...args) => func(...args));
        },
        // Used for exporting scraped data to a linked LS project
        exportDataToLS: async (data, projectID) => {
            ipcRenderer.invoke('export-to-ls:request', data, projectID)
                .then(r => console.log(r))
                .catch(err => {
                    console.log(err);
                });
        },
        onExportRes: async (func) => {
            ipcRenderer.on('export-to-ls:response', (event, ...args) => func(...args));
        },
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
        updateToProjectList: async (func) => {
            ipcRenderer.on('ls-projects-update', (event, ...args) => func(...args));
        }
    }
);

// Expose a safe API for IPC communication between renderer and main processes
contextBridge.exposeInMainWorld(
    'electronAPI', {    // Expose a safe API for IPC communication between renderer and main processes
        // Method to send messages from renderer to main process
        send: (channel, data) => {
            // Define a list of valid channels to limit communication to safe ones only
            const validChannels = ['scrapedData:export'];
            // Only send the message if the channel is in the list of valid channels
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        // Method to receive messages from the main process in the renderer process
        receive: (channel, func) => {
            // Define a list of valid channels that the renderer can listen to
            const validChannels = ['exportData:response', 'scrapedData:update'];
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