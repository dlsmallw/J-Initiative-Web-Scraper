// webview_preload.js

// Import the ipcRenderer module from Electron
const { ipcRenderer } = require('electron');

// Listen for 'getSelected' messages from the host (renderer process)
ipcRenderer.on('getSelected', function () {
    // When received, send the selected text back to the host using 'ipcRenderer.sendToHost'
    ipcRenderer.sendToHost('selection', getSelectedText());
});

// Function to get the currently selected text in the webview
function getSelectedText() {
    return window.getSelection().toString();
}

// Export button listener inside the webview
document.addEventListener('DOMContentLoaded', () => {
    const exportButton = document.getElementById('exportBtn');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            const dataToExport = document.getElementById('imported_textarea')?.value || '';
            if (dataToExport) {
                ipcRenderer.sendToHost('export', {
                    formattedData: dataToExport,
                    rawData: dataToExport // You can customize raw data handling here
                });
                console.log('Data exported from webview:', dataToExport);
            } else {
                alert('No data to export!');
            }
        });
    }
});