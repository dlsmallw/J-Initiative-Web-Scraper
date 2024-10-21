/**
 * This file is used to bridge separate electron processes together (i.e., for loading various parts of the application
 * prior to starting those processes or pages).
 */

const { contextBridge, ipcRenderer } = require('electron');
const { axios } = require('axios').default;

const HOST_URL = 'http://127.0.0.1:7777/';

// Effectively makes these available in the applications global scope
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
});

contextBridge.exposeInMainWorld('jspyAPI', {
    helloPy: () => {
        axios.get(HOST_URL)
            .then(function(res) {
                ipcRenderer.send('callPyAPI', res);
            });
    }
})