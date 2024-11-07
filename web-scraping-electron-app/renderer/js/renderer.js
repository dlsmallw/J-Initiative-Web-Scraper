/**
 * This script runs on every HTML file to handle theme switching and other processes.
 */

// Page management object for handling dynamic content loading
if (!window.Pages) {
    window.Pages = {
        home: { name: "home", state: null },
        scrape: { name: "scrape", state: null },
        about: { name: "about", state: null }
    };
}

let currentPage;

// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.electronAPI.log.info('Renderer process DOM content loaded');

    // Initialize pages and theme
    initPages();
    initializeTheme();

    // Attach event listeners to specific elements
    setupPageNavigation();
    setupScrapeEventHandlers();
    setupExitButtonHandler();
});

/**
 * Initializes pages by loading their content and setting the default page.
 */
async function initPages() {
    try {
        window.electronAPI.log.info('Initializing pages...');
        Pages.home.state = await $.get("components/home.html");
        Pages.scrape.state = await $.get("components/scrape.html");
        Pages.about.state = await $.get("components/about.html");

        window.electronAPI.log.info('Loaded Home Content:', Pages.home.state);
        window.electronAPI.log.info('Loaded Scrape Content:', Pages.scrape.state);
        window.electronAPI.log.info('Loaded About Content:', Pages.about.state);

        currentPage = Pages.home;
        window.electronAPI.log.info('Setting initial page to: home');
        $('#d_content').html(currentPage.state);
    } catch (error) {
        window.electronAPI.log.info('Error initializing pages:', error);
        $('#d_content').html("<p>Error loading content. Please try again later.</p>");
    }
}

/**
 * Changes the page when a navigation link is clicked.
 * @param {string} pageName - The name of the page to navigate to.
 */
function changePage(pageName) {
    const newPage = Pages[pageName];
    if (newPage && newPage.state && currentPage !== newPage) {
        window.electronAPI.log.info(`Changing page to: ${pageName}`);
        currentPage = newPage;
        $('#d_content').html(newPage.state);
    } else {
        window.electronAPI.log.info("Page not changed: Either page is the same or content is undefined.");
    }
}

/**
 * Initializes the theme based on user preference or defaults.
 */
function initializeTheme() {
    window.electronAPI.log.info('Initializing theme...');
    const themeSelect = document.getElementById('theme-select');
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.documentElement.className = savedTheme;
    window.electronAPI.log.info(`Applied theme: ${savedTheme}`);

    if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', changeTheme);
        window.electronAPI.log.info('Theme select event listener attached.');
    }
}

/**
 * Changes the theme based on user selection and saves the choice to localStorage.
 */
function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    window.electronAPI.log.info(`Theme changed to: ${theme}`);
}

/**
 * Sets up event listeners for page navigation.
 */
function setupPageNavigation() {
    window.electronAPI.log.info('Setting up page navigation...');
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageName = event.target.id.split('-')[0];
            window.electronAPI.log.info(`Navigation link clicked: ${pageName}`);
            changePage(pageName);
        });
    });
}

/**
 * Populates version information on the About page.
 */
function populateVersionInfo() {
    if (document.getElementById('about-container')) {
        window.electronAPI.log.info('Populating version information...');
        document.getElementById('node-version').innerText = versions.node();
        document.getElementById('chrome-version').innerText = versions.chrome();
        document.getElementById('electron-version').innerText = versions.electron();
        window.electronAPI.log.info('Version information populated.');
    }
}

/**
 * Sets up event handlers for the scrape functionality if present on the page.
 */
function setupScrapeEventHandlers() {
    if (document.getElementById('scrape-container')) {
        window.electronAPI.log.info('Setting up scrape event handlers...');
        $('#button-addon2').on('click', () => {
            window.electronAPI.log.info('Scrape request initiated.');
            window.jsapi.send('scrape:request', {});
        });

        window.jsapi.on('scrape:result', (data) => {
            window.electronAPI.log.info('Scrape result received.');
            $('#staticURL').val(data.message);
            $('#results-container').show();
            document.getElementById('formatted-data-text').innerHTML = data.formattedData;
            document.getElementById('raw-data-text').innerHTML = data.rawData;
            window.electronAPI.log.info('UI updated with scrape results.');
        });
    }
}

/**
 * Sets up the event handler for the exit button.
 */
function setupExitButtonHandler() {
    window.electronAPI.log.info('Setting up exit button handler...');
    $('#exit-nav').on('click', () => {
        window.electronAPI.log.info('Exit request sent.');
        window.jsapi.send('exit:request', {});
    });
}

