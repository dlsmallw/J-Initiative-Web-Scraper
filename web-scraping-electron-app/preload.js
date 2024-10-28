/**
 * This file is used to bridge separate electron processes together (i.e., for loading various parts of the application
 * prior to starting those processes or pages).
 */

const { contextBridge, ipcRenderer } = require('electron');

// Effectively makes these available in the applications global scope
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
});

contextBridge.exposeInMainWorld(
    'jsapi', {
        invoke: (channel, data) => ipcRenderer.invoke(channel, data),
        exitSignal: (channel) => ipcRenderer.send(channel)
    }
);