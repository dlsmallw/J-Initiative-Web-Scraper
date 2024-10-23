/**
 * This script runs on every HTML file to render information and other processes.
 */

// Determines the currently opened file.
document.addEventListener('DOMContentLoaded', () => {
    var url = location.href;
    var filename = url.substring(url.lastIndexOf('/') + 1);

    // Populates version info on the About page
    if (filename === 'about.html') {
        populateVersionInfo();
    }
});

/**
 * Populates the version info on the About page.
 */
function populateVersionInfo() {
    const nodeVersion = document.getElementById('node-version');
    const chromeVersion = document.getElementById('chrome-version');
    const electronVersion = document.getElementById('electron-version');

    if (nodeVersion && chromeVersion && electronVersion) {
        nodeVersion.innerHTML = versions.node();
        chromeVersion.innerHTML = versions.chrome();
        electronVersion.innerHTML = versions.electron();
    }
}

