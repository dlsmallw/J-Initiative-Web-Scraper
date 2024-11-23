//webview_renderer.js
const ipcRenderer = window.urlScrape;

document.addEventListener('DOMContentLoaded', () => {
    // Listen for 'setUrl' messages from the main process to set the webview's URL
    ipcRenderer.receive('setUrl', (url) => {
        $('#ext-url-window').attr('src', url); // Set the webview source to the received URL
    });

    const webview = document.getElementById('ext-url-window');

    // Import selected text from the webview
    $('#importSelectedBtn').on('click', () => {
        webview.send('getSelected'); // Request selected text from the webview
    });

    // Handle messages from the webview
    webview.addEventListener('ipc-message', (event) => {
        const channel = event.channel;
        const data = event.args[0];

        if (channel === 'selection') {
            console.log('Selected text received from webview:', data);
            $('#imported_textarea').val(data); // Populate the textarea with the selected text
        }

        if (channel === 'export') {
            console.log('Exported data received from webview:', data);
            ipcRenderer.send('scrapedData:export', data); // Forward exported data to the main process
        }
    });

    // Clear the textarea
    $('#clearBtn').on('click', () => {
        $('#imported_textarea').val('');
        console.log('Cleared textarea.');
    });

    // Export data from textarea to the main process
    $('#exportBtn').on('click', () => {
        const dataToExport = $('#imported_textarea').val();
        if (dataToExport) {
            const exportData = {
                formattedData: dataToExport,
                rawData: dataToExport
            };
            ipcRenderer.send('scrapedData:export', exportData);
            console.log('Exported data sent to main process:', exportData);
        } else {
            alert('No data to export!');
            console.log('Export button clicked with no data in textarea.');
        }
    });

});