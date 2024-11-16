 /**
 * This script runs on every HTML file to handle theme switching and other processes.
 */

// Use the IPC methods exposed by the preload script
const ipcRenderer = window.electronAPI;

// Pages object to manage different sections of the application
const Pages = {
    Home: {
        name: "home",
        id: '#home-container'
    },
    Scrape: {
        name: "scrape",
        id: '#scrape-container'
    },
    About: {
        name: "about",
        id: '#about-container'
    },
    LabelStudio: {
        name: "annotation",
        id: '#annotation-container'
    }
};

let currentPage;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme when the document is fully loaded
    initializeTheme();

    // Initialize pages by loading their content
    initPages();

    // Initializes 2-way renderer-main IPC listeners
    initIPCEventListeners();
});

/**
 * Initializes all the pages by loading their HTML content and setting the default page to Home
 */
async function initPages() {
    // Set default page to Home and display its content
    currentPage = getPage("home");

    $('#d_content')
        .append(await $.get("components/home.html"))
        .append(await $.get("components/scrape.html"))
        .append(await $.get("components/about.html"))
        .append(await $.get("components/annotation.html"));

    $(`#${currentPage.name}`).addClass('active-nav-item');

    $('#node-version').html(versions.node());
    $('#chrome-version').html(versions.chrome());
    $('#electron-version').html(versions.electron());

    // Initializes embedded content
    initEmbeddedContent();

    // Attach event listeners
    attachPageEventListeners();
}

/**
 * Handles changing the page when a navigation link is clicked
 * @param {*} event     The event corresponding to a page change.
 */
function changePage(event) {
    event.preventDefault(); // Prevent default link behavior
    const pageName = this.id.split('-')[0]; // Extract page name from element ID
    const newPage = getPage(pageName);

    // Only switch pages if the new page is different from the current page
    if (currentPage.name !== newPage.name) {
        $(currentPage.id).hide();
        $(`#${currentPage.name}`).removeClass('active-nav-item');

        currentPage = newPage;

        $(newPage.id).show();
        $(`#${currentPage.name}`).addClass('active-nav-item');

        console.log("Page Changed To " + pageName);
    } else {
        console.log("Page Not Changed");
    }
}

/**
 * Attach event listeners specific to the current page (e.g., buttons, input fields)
 */
function attachPageEventListeners() {
    // Add event listeners for navigation buttons to change pages
    $('#home-nav').on('click', changePage);
    $('#scrape-nav').on('click', changePage);
    $('#about-nav').on('click', changePage);
    $('#annotation-nav').on('click', changePage);

    // Fade in/out animation for button on annotation page
    $('#annotation-container')
        .on('mouseenter', function() { $('#ext-win-btn').stop( true, true ).fadeTo(500, 0.2); })
        .on('mouseleave', function() { $('#ext-win-btn').stop( true, true ).fadeOut(500); });

    // Event listener for the "Submit" button on the Scrape page
    $('#submitURLBtn').on('click', () => {
        submitBtnPressed();
    });

    // Event listener for the "Enter" key press in the input field
    $('#url-input').on('keypress', (event) => {
        if (event.key === 'Enter') {
            submitBtnPressed();     // Call the submit function
        }
    });

    $('#submitLSURLBtn').on('click', () => {
        lsURLSubmitted();
    });

    $('#ls-link-input').on('keypress', (event) => {
        if (event.key === 'Enter') {
            lsURLSubmitted();
        }
    });

    $('#ext-win-btn').on('click', () => {
        $('#ls-embedded').hide();
        $('#ls-external').show();
        var url = $('#annotation-iframe').attr('src');
        ipcRenderer.openLSExternal(url);
    });

    $('#clearLSLinkBtn').on('click', () => {
        localStorage.removeItem('lsURL');
        $('#ls-set').hide();
        $('#clearLSLinkBtn').hide();
        $('#ls-not-set').show();
        setLSLink(null);
    });

    ipcRenderer.receive('openLSExternal-close', () => {
        $('#ls-external').hide();
        $('#ls-embedded').show();
    });
    
    // Event listener for the "Exit" navigation link
    $('#exit-nav').on('click', () => {
        ipcRenderer.exitSignal();
    });

    // Listen for errors from main process related to URL opening
    ipcRenderer.receive('open-url-error', (errorMessage) => {
        alert(`Failed to open URL: ${errorMessage}`); // Display alert if there was an error opening the URL
    });
}

/**
 * Initializes any atypical IPC communication listeners.
 * NOTE: Separated for organization purposes.
 */
function initIPCEventListeners() {
    // Listen for errors from main process related to URL opening
    ipcRenderer.receive('open-url-error', (errorMessage) => {
        alert(`Failed to open URL: ${errorMessage}`); // Display alert if there was an error opening the URL
    });
}

/**
 * Function to handle the "Submit" button click on the Scrape page.
 */
function submitBtnPressed() {
    console.log('Submit button pressed');

    let url = $('#url-input').val();

    // Check if a URL was entered
    if (url) {
        // Prepend 'https://' if no protocol is specified
        if (!url.match(/^https?:\/\//i)) {
            url = 'https://' + url;
        }

        // Validate the URL format before sending
        if (!isValidURL(url)) {
            alert('Please enter a valid URL.');
            return;
        }

        // Send the URL to the main process to open it
        ipcRenderer.send('open-url', url);

        // Update the results container to display the submitted URL
        $('#staticURL').val(url);

        $('#results-container').css('display', 'block');

        // This is the necessary code for performing a basic web scrape using the webscrape_test.py file
        // var response = JSON.parse(await ipcRenderer.invoke('scrape:request', $('#url-input').val()));
        // if (response.ok) {
        //     $('#staticURL').val(response.url);
        //     $('#results-container').show();
        //     $('#formatted-data-text').text(response.formattedData);
        //     $('#raw-data-text').text(response.rawData);
        // } else {
        //     // WIP: This is were we would handle an error response (i.e., display a "Failed to scrape web url")
        // }
    } else {
        alert('Please enter a URL.'); // Alert the user if no URL is entered
    }
}

/**
 * URL validation function to check if the URL is valid.
 * @param {*} url       The URL to validate.
 * @returns Bool        A boolean corresponding to if it is valid or not.
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Initializes the theme based on the user's saved preference or defaults to light theme.
 */
function initializeTheme() {
    const themeSelect = $('#theme-select');

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
        themeSelect.val(savedTheme || 'light-theme');

        // Add an event listener to change the theme whenever the user selects a new option
        themeSelect.on('change', changeTheme);
    }
}

/**
 * Changes the theme based on user selection and saves the choice to localStorage.
 */
function changeTheme() {
    const theme = $('#theme-select').val();

    // Set the selected theme class on the HTML element
    document.documentElement.className = theme;

    // Save the selected theme to localStorage so it persists across sessions
    localStorage.setItem('theme', theme);
}

/**
 * Returns the corresponding Page object based on the page name.
 * @param {*} value     The page name to be searched for.
 * @returns Page        The page.
 */
function getPage(value) {
    return Pages[Object.keys(Pages).find(e => Pages[e].name === value)];
}

function initEmbeddedContent() {
    const ls_url = localStorage.getItem('lsURL');

    if (ls_url) {   // Label Studio project linked
        $('#annotation-iframe').attr('src', ls_url);
        $('#ls-not-set').hide();
        $('#ext-win-btn').show();
    } else {        // No Label Studio project linked
        $('#ls-set').hide();
        $('#clearLSLinkBtn').hide();
    }
}

function checkLSURL(url) {
    let lsURL;

    try {  
        lsURL = new URL(url);
    } catch (err) {
        return false;
    }

    if (lsURL.protocol !== "https:") {
        return false;
    } 
    
    var host = lsURL.host;
    var strArr = host.split('.');
    
    if (!strArr.find(st => st === 'hf')) {
        return false;
    }

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 404) {
                return false;
            }
        }
    }
    req.send();

    return true;
}

function lsURLSubmitted() {
    var urlInput = $('#ls-link-input').val();

    if (urlInput !== '') {
        if (checkLSURL(urlInput)) {
            setLSLink(urlInput);
            $('#ls-not-set').hide();
            $('#ls-set').show();
            $('#clearLSLinkBtn').show();
        } else {
            alert("The URL '" + urlInput + "' is not valid");
            $('#ls-link-input').val('');
        }
    }
}

function setLSLink(url) {
    if (url) {
        localStorage.setItem('lsURL', url);
        $('#annotation-iframe').attr('src', url);
    } else {
        localStorage.removeItem('lsURL');
        $('#annotation-iframe').attr('src', "");
    }
}