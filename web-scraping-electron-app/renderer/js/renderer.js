// renderer.js

$(document).ready(function() {
    const Pages = {
        home: {
            name: "home",
            state: null
        },
        scrape: {
            name: "scrape",
            state: null
        },
        about: {
            name: "about",
            state: null
        }
    };
    let currentPage;

    // Initializes all the pages by loading their HTML content and setting the default page to Home.
    async function initPages() {
        try {
            Pages.home.state = await $.get("components/home.html");
            Pages.scrape.state = await $.get("components/scrape.html");
            Pages.about.state = await $.get("components/about.html");

            currentPage = getPage("home");
            $('#d_content').html(Pages.home.state);
        } catch (error) {
            console.error('Error loading pages:', error);
        }
    }

    // Updates the current state of the current page.
    function updatePageState() {
        currentPage.state = $('#d_content').children().first();
    }

    // Returns the corresponding Page object.
    function getPage(value) {
        return Pages[value];
    }

    // Handles changing the page when a navigation link is clicked.
    function changePage(event) {
        event.preventDefault();
        const pageName = event.target.id.split('-')[0];
        const newPage = getPage(pageName);

        if (newPage && currentPage.name !== newPage.name) {
            updatePageState();
            $('#d_content').html(newPage.state);
            currentPage = newPage;
            console.log("Page Changed To " + pageName);
        } else {
            console.log("Page Not Changed");
        }
    }

    // Initialize the theme based on saved user preference.
    function initializeTheme() {
        const themeSelect = $('#theme-select');

        // Load the saved theme from localStorage if it exists
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.className = savedTheme; // Apply saved theme to the document
        }

        if (themeSelect.length) {
            // Set the dropdown to the saved value if available
            if (savedTheme) {
                themeSelect.val(savedTheme);
            }

            // Add an event listener to change the theme whenever the user selects a new option
            themeSelect.on('change', changeTheme);
        }
    }

    // Changes the theme based on user selection and saves the choice to localStorage.
    function changeTheme() {
        const theme = $('#theme-select').val();

        // Set the selected theme class on the HTML element
        document.documentElement.className = theme;

        // Save the selected theme to localStorage so it persists across sessions
        localStorage.setItem('theme', theme);
    }

    // Attach event listeners to navigation links
    function attachEventListeners() {
        $('#home-nav').on('click', changePage);
        $('#scrape-nav').on('click', changePage);
        $('#about-nav').on('click', changePage);
        $('#exit-nav').on('click', exitApp);
    }

    // Function to exit the application.
    function exitApp(event) {
        event.preventDefault();
        window.electronAPI.exitApp();
    }

    // Initialize the application
    initPages();
    initializeTheme();
    attachEventListeners();
});

