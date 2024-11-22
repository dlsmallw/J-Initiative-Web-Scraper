const ipcRenderer = window.urlScrape;

document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.receive('setUrl', (url) => {
        $('#ext-url-window').attr('src', url);
    });

    var webview = document.getElementById('ext-url-window');

    $('#importSelectedBtn').on('click', () => {
        webview.send('getSelected');
    });

    webview.addEventListener('ipc-message', function(event, selection) {
        $('#imported_textarea').val(event.args[0]);
    });
});