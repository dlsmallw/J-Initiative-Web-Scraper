/**
 * This file will be used as the primary entry point for the application.
 */

// Import necessary modules from Electron and Node.js
const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
const path = require('node:path');

// Determine if the operating system is macOS
const isMac = process.platform === 'darwin';

// Determine if we are in development mode or production mode
const isDev = process.env.NODE_ENV !== 'production';

// Reference for the main application window
let mainWin;

// Function to create the main application window
function createMainWindow() {
    // Create the BrowserWindow instance with specific options
    mainWin = new BrowserWindow({
        width: isDev ? 1200 : 800, // Set width: larger size for development
        height: 600, // Set height for the window
        minWidth: isDev ? 1200 : 800, // Set minimum width to prevent shrinking beyond a set size
        minHeight: 600, // Set minimum height
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Load the preload script
            nodeIntegration: false, // Disallow Node.js integration in renderer for security
            contextIsolation: true, // Isolate context to improve security
        }
    });

    // Open developer tools automatically if in development mode
    if (isDev) {
        mainWin.webContents.openDevTools();
    }

    // Disable the default application menu
    mainWin.setMenu(null);

    // Load the main HTML file for the renderer process
    mainWin.loadFile('./renderer/index.html');
}

// Set the default theme to dark mode
nativeTheme.themeSource = 'dark';

// When the application is ready, create the main window
app.whenReady().then(() => {
    createMainWindow();

    // macOS specific behavior to recreate window when the dock icon is clicked
    app.on('activate', () => {
        // Only create a new window if none are open
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

// When all windows are closed, quit the app unless running on macOS
app.on('window-all-closed', () => {
    if (!isMac) app.quit(); // macOS apps typically stay open until explicitly quit
});

// Listen for 'open-url' event from renderer to open a new window with the provided URL
ipcMain.on('open-url', (event, url) => {
    try {
        createURLWindow(url); // Attempt to create a new URL window
    } catch (error) {
        // Log error if URL cannot be opened and notify the renderer process
        console.error(`Error opening URL window: ${error.message}`);
        event.sender.send('open-url-error', error.message);
    }
});

// Function to create a new window to display the provided URL
function createURLWindow(url) {
    // Validate that the provided string is a valid URL
    try {
        new URL(url);
    } catch (err) {
        console.error(`Invalid URL: ${url}`); // Log error if URL is invalid
        return;
    }

    // Create a new BrowserWindow instance for the URL
    const urlWindow = new BrowserWindow({
        width: 1200, // Set width of the URL window
        height: 800, // Set height of the URL window
        webPreferences: {
            nodeIntegration: false, // Disable Node.js integration for security
            contextIsolation: true, // Isolate context for security
        }
    });

    // Load the specified URL in the window
    urlWindow.loadURL(url);

    // Prevent the window from navigating away from the original URL
    urlWindow.webContents.on('will-navigate', (event, navigateUrl) => {
        if (navigateUrl !== url) {
            event.preventDefault(); // Cancel any navigation to external URLs
        }
    });

    // Prevent the window from opening any new windows (e.g., pop-ups)
    urlWindow.webContents.setWindowOpenHandler(() => {
        return { action: 'deny' }; // Deny any requests to open new windows
    });
}

