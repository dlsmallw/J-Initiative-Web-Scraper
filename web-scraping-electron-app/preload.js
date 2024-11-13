/**
 * This file is used to bridge separate Electron processes together
 */

    // Import necessary modules from Electron
    const { contextBridge, ipcRenderer } = require('electron');
    console.log('preload.js loaded');

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
                const validChannels = ['open-url', 'import-data', 'export-data', 'exit:request'];
                // Only send the message if the channel is in the list of valid channels
                if (validChannels.includes(channel)) {
                    ipcRenderer.send(channel, data);
                } else {
                console.warn(`Channel ${channel} is not allowed for send`);
                }
            },

            // Method to receive messages from the main process in the renderer process
            receive: (channel, func) => {
                // Define a list of valid channels that the renderer can listen to
                const validChannels = ['open-url-error', 'display-selected-text', 'data-imported', 'export-success', 'export-error', 'url-loaded'];
                // Only attach a listener if the channel is in the list of valid channels
                if (validChannels.includes(channel)) {
                    ipcRenderer.on(channel, (event, ...args) => func(...args));
                } else {
                    console.warn(`Channel ${channel} is not allowed for receive`);
                }
            },

            // Method for performing a 2-way conversation in a single call
            invoke: (channel, data) => {
                const validChannels = ['scrape:request', 'scrape-url', 'get-imported-data'];
                if (validChannels.includes(channel)) {
                    return ipcRenderer.invoke(channel, data);
                } else {
                    console.warn(`Channel ${channel} is not allowed for invoke`);
                }
            },

            // Method for sending a signal to Main to explicitly close the application
            exitSignal: () => {
                ipcRenderer.send('exit:request');
            }
        }
    );

