    // TODO: Check if Pages was defined, and only define it if it hasn't been initialized
        const Pages = {
            Home: {
                name: "home",
                state: null
            },
            Scrape: {
                name: "scrape",
                state: null
            },
            About: {
                name: "about",
                state: null
            },
            Logs: {
                name: "logs",
                state: null
            }

        };

        var currentPage;

        // Initializes all the pages by loading their HTML content and setting the default page to Home.
        async function initPages() {
            Pages.Home.state = await $.get("components/home.html");
            Pages.Scrape.state = await $.get("components/scrape.html");
            Pages.About.state = await $.get("components/about.html");
            Pages.Logs.state = await $.get("components/logs.html");
            currentPage = getPage("home");
            $('#d_content').html(Pages.Home.state);
        }

        // Updates the current state of the current page (stores the current state of the given element).
        function updatePageState() {
            currentPage.state = document.getElementById("d_content").children[0];
        }


        // Returns the corresponding Page 'enum' object (has name and state).
        function getPage(value) {
            return Pages[Object.keys(Pages).find(e => Pages[e].name === value)];
        }

        // Handles changing the page when a navigation link is clicked.
        function changePage(element) {
            var pageName = element.id.split('-')[0];
            var newPage = getPage(pageName);

            if (currentPage.name !== newPage.name) {
                updatePageState();
                $('#d_content').html(newPage.state);
                currentPage = newPage;
                console.log("Page Changed To " + pageName);
            } else {
                console.log("Page Not Changed");
            }
        }

        // Initializes the pages and the theme when the document is ready.
        $(document).ready(function() {
            initPages();
            initializeTheme(); // Initialize the theme based on saved user preference.
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
            }

            if (themeSelect) {
                // Set the dropdown to the saved value if available
                if (savedTheme) {
                    themeSelect.value = savedTheme;
                }

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


