/**
 * This script is ran on every html file, to render information and other processes.
 */

// Populates the version info on the About page
if (document.getElementById('about-container') !== null) {
    $('node-version').innerHTML(versions.node());
    $('chrome-version').innerHTML(versions.chrome());
    $('electron-version').innerHTML(versions.electron());
}

if (document.getElementById('scrape-container') !== null) {
    var submitBtn = $("#button-addon2");

    $("#button-addon2").on('click', () => {
        window.jsapi.send('scrape:request', {});
    })

    // WIP... JQuery has some bugs when used in conjunction with ipcRenderer and ipcMain
    window.jsapi.on('scrape:result', (data) => {
        $('#staticURL').val(data.message);
        $('#results-container').show();
        document.getElementById('formatted-data-text').innerHTML = data.formattedData;
        document.getElementById('raw-data-text').innerHTML = data.rawData;
    })
}
