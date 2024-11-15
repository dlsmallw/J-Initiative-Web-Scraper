// url-preload.js

const { contextBridge, ipcRenderer } = require('electron');
console.log('url-preload.js loaded');

// Expose a safe API to the web page
contextBridge.exposeInMainWorld('electronAPI', {
    sendSelectedText: (text) => ipcRenderer.send('selected-text', text),
});

// Listen for mouseup events to capture text selection
window.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    console.log('Text Selected:', selectedText);
    if (selectedText) {
        window.electronAPI.sendSelectedText(selectedText);
    }
});
