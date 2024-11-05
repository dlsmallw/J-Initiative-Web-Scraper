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

contextBridge.exposeInMainWorld('jsapi', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});

contextBridge.exposeInMainWorld('electronAPI', {
  log: {
    info: (message) => ipcRenderer.send('log-info', message),
    error: (message) => ipcRenderer.send('log-error', message),
  },
});