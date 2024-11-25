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
    LabelStudio: {
        name: "annotation",
        id: '#annotation-container'
    },
    Database: {
        name: "database",
        id: '#database-container'
    },
    About: {
        name: "about",
        id: '#about-container'
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
        .append(await $.get("components/database.html"))
        .append(await $.get("components/annotation.html"));

    $(`#${currentPage.name}`).addClass('active-nav-item');

    $('#manual-scrape-container').hide();

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
    $('#database-nav').on('click', changePage);

    // initializes listeners on these pages (large number of listeners)
    initScrapePageListeners();
    initAnnotationPageListeners();
    

    // Handles receipt of updated project list
    ipcRenderer.receive('updateToProjectList', (res) => {
        var response = JSON.parse(res);

        if (response.ok) {
            updateProjectOptions(response.data);
        } else {
            postAlert(response.resMsg, response.errType);
        }
        
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
 * Updates the list of available projects to export to on the manual scrape page.
 * @param {*} projects      The returned list of available projects.
 */
function updateProjectOptions(projects) {
    $('#projectSelect').empty();

    $.each(projects, function(i, project) {
        $('#projectSelect').append($('<option>', {
            value: project.id,
            text: `${project.id} - ${project.project_name}`
        }));
    });
} 

/**
 * Initializes any event listeners for the Scrape page.
 */
function initScrapePageListeners() {
    // Toggles a manual mode or a URL entry mode (URL entry is default)
    $('#scrape-mode-toggle').on('click', () => {
        let curr = $('#scrape-mode-toggle').html();
        let next;

        if (curr === 'Manual Mode') {
            next = 'URL Mode';

            $('#url-scrape-container').hide();
            $('#manual-scrape-container').show();
        } else {
            next = 'Manual Mode';

            $('#manual-scrape-container').hide();
            $('#url-scrape-container').show();
        }

        $('#scrape-mode-toggle').html(next);
    });

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

    // Submit button pressed while in Manual Data Entry Mode
    $('#manual-submit-btn').on('click', async () => {
        let data = $('#manual-scrape-textarea').val();
        let projID = $('#projectSelect').val();

        if (data === '') {
            postAlert('Data Field Cannot Be Empty!', 'Empty String');
        } else {
            ipcRenderer.exportScrapedData(data, projID);
            disableManualScrape();

            ipcRenderer.receive('exportData:response', (res) => {
                var response = JSON.parse(res);
        
                if (response.ok) {
                    postAlert(response.resMsg);
                    $('#manual-scrape-textarea').val('');
                } else {
                    postAlert(response.resMsg, response.errType);
                }

                enableManualScrape();
            });
        }
    });
}

/**
 * Handles displaying an alert message for specific situations (error or otherwise).
 * @param {*} alertMsg          Message to display.
 * @param {*} cause             Cause if an error.
 */
function postAlert(alertMsg, cause) {
    if (cause === undefined) {
        alert(alertMsg);
    } else {
        alert(`ERROR: ${alertMsg}\nCAUSE: ${cause}`);
    }
    
}



/**
 * Initializes any event listeners for the Annotation page.
 */
function initAnnotationPageListeners() {
    // Fade in/out animation for button on annotation page
    $('#annotation-container')
        .on('mouseenter', function() { $('#ext-win-btn').stop( true, true ).fadeTo(500, 0.2); })
        .on('mouseleave', function() { $('#ext-win-btn').stop( true, true ).fadeOut(500); });

    // Handles openning the LS app in an external window
    $('#ext-win-btn').on('click', () => {
        $('#ls-embedded').hide();
        $('#ls-external').show();
        var url = $('#annotation-iframe').attr('src');
        ipcRenderer.openLSExternal(url);
    });

    // Handles when clicking the "Clear Linked Project" button
    $('#clearLSLinkBtn').on('click', () => {
        clearLinkedLSProject();
    });

    // Handles submission of new LS URL by submit button
    $('#submitLSURLBtn').on('click', () => {
        initLSURL();
    });

    // Handles submission of new LS URL by hitting enter
    $('#ls-link-input').on('keypress', (event) => {
        if (event.key === 'Enter') {
            initLSURL();
        }
    });

    $('#update-ls-link-btn').on('click', () => {
        updateLSURL();
    });

    $('#update-api-token-btn').on('click', () => {
        updateLSAPIToken();
    });

    ipcRenderer.receive('openLSExternal-close', () => {
        $('#ls-external').hide();
        $('#ls-embedded').show();
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

/**
 * Initializes any embedded content.
 */
function initEmbeddedContent() {
    const ls_url = localStorage.getItem('lsURL');
    const api_token = localStorage.getItem('apiToken');

    if (ls_url) {   // Label Studio project linked
        $('#annotation-iframe').attr('src', ls_url);
        showLSEmbeddedFrame();

        $('#ls-link-option').val(ls_url);
        ipcRenderer.updateLinkedLSProject(ls_url);

        if (api_token) {
            $('#ls-api-token-option').val(api_token);
            ipcRenderer.updateLSAPIToken(api_token);
        }
    } else {        // No Label Studio project linked
        hideLSEmbeddedFrame();
    }
}

/**
 * Method used to validate that the URL entered for linking a LS project is valid.
 * @param {*} url       The URL.
 * @returns             A boolean indicating if it is valid or not.
 */
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

/**
 * Function for handling the event where a LS URL is entered and submitted.
 */
function initLSURL() {
    var urlInput = $('#ls-link-input').val();

    if (urlInput !== '') {
        if (checkLSURL(urlInput)) {
            setLSURL(urlInput);
            showLSEmbeddedFrame();
        } else {
            alert("The URL '" + urlInput + "' is not valid");
            $('#ls-link-input').val('');
        }
    }
}

/**
 * Function for updating the LS URL using the URL field within the LS Config Menu.
 */
function updateLSURL() {
    var currURL = localStorage.getItem('lsURL');
    var urlInput = $('#ls-link-option').val();

    if (checkLSURL(urlInput)) {
        setLSURL(urlInput);
    } else {
        alert("The URL '" + urlInput + "' is not valid");
        $('#ls-link-option').val(currURL);
    }
}


/**
 * Function for setting the LS project URL within local storage.
 * @param {*} url 
 */
function setLSURL(url) {
    if (url) {
        localStorage.setItem('lsURL', url);
        $('#ls-link-option').val(url);
        $('#annotation-iframe').attr('src', url);
        ipcRenderer.updateLinkedLSProject(url);
    }
}

/**
 * Function for updating the API Token when using the API Field in the LS Config Menu.
 */
function updateLSAPIToken() {
    let regex = /^[A-Za-z0-9]+$/g;

    var tokenVal = $('#ls-api-token-option').val();
    var currToken = localStorage.getItem('apiToken');

    if (regex.test(tokenVal)) {
        localStorage.setItem('apiToken', tokenVal);
        setLSAPIToken(tokenVal)
    } else {
        alert('Invalid API Token');

        if (currToken) {
            $('#ls-api-token-option').val(currToken);
        }
    }
}

/**
 * Handles the logic for changing the stored API Token value.
 * @param {*} token         The new API Token.
 */
function setLSAPIToken(token) {
    if (token) {
        localStorage.setItem('apiToken', token);
        $('#ls-api-token-option').val(token);
        ipcRenderer.updateLSAPIToken(token);
    } 
}

/**
 * Function for handling clearing the linked LS project when clicking the "Clear Linked Project" button
 * in the LS Config Menu.
 */
function clearLinkedLSProject() {
    hideLSEmbeddedFrame();

    localStorage.removeItem('lsURL');
    $('#ls-link-option').val('');
    $('#annotation-iframe').attr('src', "");

    localStorage.removeItem('apiToken');
    $('#ls-api-token-option').val('');
    
    ipcRenderer.clearLinkedLSProject();
}

//===========================================================================================================
// Methods that directly change the UI
//===========================================================================================================

/**
 * Handles showing the LS embedded window (project linked).
 */
function showLSEmbeddedFrame() {
    $('#ls-not-set').hide();
    $('#ls-set').show();
    $('#ls-config-accordion').show();
}

/**
 * Handles hiding the LS Embedded window (project not linked) and showing the form
 * for taking a new URL.
 */
function hideLSEmbeddedFrame() {
    $('#ls-set').hide();
    $('#ls-config-accordion').hide();
    $('#ls-not-set').show();
}

/**
 * Method for disabling the input field and button while handling a request.
 */
function disableManualScrape() {
    $('#manual-submit-btn').prop('disabled', true);
    $('#manual-scrape-textarea').prop('disabled', true);
}

/**
 * Method for re-enabling the input field and button after handling a request.
 */
function enableManualScrape() {
    $('#manual-submit-btn').removeAttr('disabled');
    $('#manual-scrape-textarea').removeAttr('disabled');
}
