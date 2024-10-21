/**
 * This script is ran on every html file, to render information and other processes.
 */

// Determines the currently opened file.
var url = location.href;
var filename = url.substring(url.lastIndexOf('/') + 1);

if (filename === 'index.html') {
    // WIP
}

// Populates the version info on the About page
if (document.getElementById('about-container') !== null) {
    const nodeVersion = document.getElementById('node-version');
    nodeVersion.innerHTML = versions.node();

    const chromeVersion = document.getElementById('chrome-version');
    chromeVersion.innerHTML = versions.chrome();

    const electronVersion = document.getElementById('electron-version');
    electronVersion.innerHTML = versions.electron();
}

if (document.getElementById('scrape-container') !== null) {
    var submitBtn = document.getElementById("button-addon2");
    submitBtn.addEventListener('click', function() {
        
        var result = window.jspyAPI.helloPy();
        document.getElementById('staticURL').value = result;
    })
}
