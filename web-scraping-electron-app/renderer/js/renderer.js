/**
 * This script runs on every HTML file to handle theme switching and other processes.
 */

// Wait until the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Determine the currently opened file
    var url = location.href;
    var filename = url.substring(url.lastIndexOf('/') + 1);

    // Populate version info on the About page
    if (filename === 'about.html') {
        populateVersionInfo();
    }

    // Initialize theme based on saved preference or default
    initializeTheme();
});

/**
 * Initializes the theme based on the user's saved preference or defaults.
 */
function initializeTheme() {
    const themeSelect = document.getElementById('theme-select');

    // Load the saved theme from localStorage if it exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.className = savedTheme; // Apply saved theme to the document
    } else {
        // Set default theme if none is saved
        document.documentElement.className = 'light-theme';
    }

    if (themeSelect) {
        // Set the dropdown to the saved value if available
        themeSelect.value = savedTheme || 'light-theme';

        // Add an event listener to change the theme whenever the user selects a new option
        themeSelect.addEventListener('change', changeTheme);
    }
}

/**
 * Changes the theme based on user selection and saves the choice to localStorage.
 */
function changeTheme() {
    const theme = document.getElementById('theme-select').value;

    // Set the selected theme class on the HTML element
    document.documentElement.className = theme;

    // Save the selected theme to localStorage so it persists across sessions
    localStorage.setItem('theme', theme);
}

// Populates the version info on the About page
if ($.get('#about-container') !== null) {
    $('#node-version').html(versions.node());
    $('#chrome-version').html(versions.chrome());
    $('#electron-version').html(versions.electron());
}

if ($.get('#scrape-container') !== null) {
    var submitBtn = $("#button-addon2");

    $("#button-addon2").on('click', () => {
        console.log("SUBMIT PRESSED!")
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

$('#exit-nav').on('click', () => {
    window.jsapi.send('exit:request', {});
})