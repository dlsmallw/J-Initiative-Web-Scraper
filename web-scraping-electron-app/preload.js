/**
 * This file is used to bridge separate electron processes together (i.e., for loading various parts of the application
 * prior to starting those processes or pages).
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendScrapeRequest: (url) => ipcRenderer.invoke('scrape-request', url),
  exitApp: () => ipcRenderer.invoke('exit-app'),
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
});
