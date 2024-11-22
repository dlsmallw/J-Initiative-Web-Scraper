const { ipcRenderer } = require('electron');

ipcRenderer.on('getSelected', function() {
    ipcRenderer.sendToHost('selection', getSelectedText());
});

function getSelectedText() {
    return window.getSelection().toString();
}