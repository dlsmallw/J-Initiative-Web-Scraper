//preload.js
/**
 * This file is used to bridge separate Electron processes together
 */

// Import necessary modules from Electron
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'versions', {       // Expose version information to the renderer process through the context bridge
        // Method to get the Node.js version
        node: () => process.versions.node,
        // Method to get the Chrome version
        chrome: () => process.versions.chrome,
        // Method to get the Electron version
        electron: () => process.versions.electron
    }
);

// Expose a safe API for IPC communication between renderer and main processes
contextBridge.exposeInMainWorld(
    'electronAPI', {    // Expose a safe API for IPC communication between renderer and main processes
        // Method to send messages from renderer to main process
        send: (channel, data) => {
            // Define a list of valid channels to limit communication to safe ones only
            const validChannels = ['open-url', 'exit:request', 'log-info', 'log-debug', 'log-warn', 'log-error', 'openLSExternal:request'];
            // Only send the message if the channel is in the list of valid channels
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        // Method to receive messages from the main process in the renderer process
        receive: (channel, func) => {
            // Define a list of valid channels that the renderer can listen to
            const validChannels = ['open-url-error', 'openLSExternal-close', 'updateToProjectList', 'exportData:response'];
            // Only attach a listener if the channel is in the list of valid channels
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        // Method for performing a 2-way conversation in a single call
        invoke: (channel, data) => {
            const validChannels = ['get-logs', 'get-websites'];
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, data);
            } else {
                console.warn(`Channel ${channel} is not in validChannels`);
            }
        },
        // Method for sending a signal to Main to explicitly close the application
        exitSignal: () => {
            ipcRenderer.send('exit:request');
        },
         // Methods for logging
        logInfo: (message) => {
            ipcRenderer.send('log-info', message);
        },
        logDebug: (message) => {
            ipcRenderer.send('log-debug', message);
        },
        logWarn: (message) => {
            ipcRenderer.send('log-warn', message);
        },
        logError: (message) => {
            ipcRenderer.send('log-error', message);
        },
        // Used for openning an instance of the LS project in a separate window
        openLSExternal: (url) => {
            ipcRenderer.send('openLSExternal:request', url);
        },
        // Used for exporting scraped data to a linked LS project
        exportScrapedData: (data, projectID) => {
            ipcRenderer.send('exportData:request', data, projectID);
        },
        initLSVariables: (url, token) => {
            ipcRenderer.send('initLSVariables:request', url, token);
        },
        // Used to update the URL for the linked LS project
        updateLinkedLSProject: (url) => {
            ipcRenderer.send('updateLinkedLS:request', url);
        },
        // Used to update the API Token for the linked LS Project
        updateLSAPIToken: (token) => {
            ipcRenderer.send('updateAPIToken:request', token);
        },
        // Used to clear the linked LS Project (clears URL and API Token)
        clearLinkedLSProject: () => {
            ipcRenderer.send('clearLinkedLS:request');
        }
    }
);
