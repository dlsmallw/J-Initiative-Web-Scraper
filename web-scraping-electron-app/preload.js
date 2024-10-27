/**
 * This file is used to bridge separate Electron processes together
 */

// Import necessary modules from Electron
const { contextBridge, ipcRenderer } = require('electron');

// Expose version information to the renderer process through the context bridge
contextBridge.exposeInMainWorld('versions', {
    // Method to get the Node.js version
    node: () => process.versions.node,
    // Method to get the Chrome version
    chrome: () => process.versions.chrome,
    // Method to get the Electron version
    electron: () => process.versions.electron
});

// Expose a safe API for IPC communication between renderer and main processes
contextBridge.exposeInMainWorld('electronAPI', {
    // Method to send messages from renderer to main process
    send: (channel, data) => {
        // Define a list of valid channels to limit communication to safe ones only
        const validChannels = ['open-url', 'exit:request', 'scrape:request'];
        // Only send the message if the channel is in the list of valid channels
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    // Method to receive messages from the main process in the renderer process
    receive: (channel, func) => {
        // Define a list of valid channels that the renderer can listen to
        const validChannels = ['open-url-error', 'scrape:result'];
        // Only attach a listener if the channel is in the list of valid channels
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});

