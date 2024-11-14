// main.js
/**
 * This file will be used as the primary entry point for the application.
 */

// Import necessary modules from Electron and Node.js
const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
const path = require('node:path');

const { PythonShell } = require('python-shell');
const { stopPyBackend, pingBackend, scrapeRequest } = require('./js/js-api.js');

// This will be needed when packaging the python code base as an executable (i.e., WIP)
// const PROD_API_PATH = path.join(process.resourcesPath, "")
const DEV_API_PATH = path.join(__dirname, "./backend/backend_api.py");
const fileExecutor = require("child_process").execFile;

// Determine if the operating system is macOS
const isMac = process.platform === 'darwin';
// Determine if we are in development mode or production mode
const isDev = !app.isPackaged;
const fs = require('fs');
const log = require('electron-log');

// Reference for the main application window
let mainWin;


/**
 * Function to create the main application window.
 */
function createMainWindow() {
    log.debug('Creating main application window.');

    // Create the BrowserWindow instance with specific options
    mainWin = new BrowserWindow({
        width: isDev ? 1200 : 800, // Set width: larger size for development
        height: 600, // Set height for the window
        minWidth: isDev ? 1200 : 800, // Set minimum width to prevent shrinking beyond a set size
        minHeight: 600, // Set minimum height
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // Open developer tools automatically if in development mode
    if (isDev) {
        log.debug('Opening developer tools.');
        mainWin.webContents.openDevTools();
    }

    // Disable the default application menu
    mainWin.setMenu(null);

    // Load the main HTML file for the renderer process
    mainWin.loadFile('./renderer/index.html').then(() => {
        log.info('Main window loaded.');
    }).catch((error) => {
        log.error(`Failed to load main window: ${error}`);
    });
}

// Info log handler
ipcMain.on('log-info', (event, message) => {
    log.info(`Renderer: ${message}`);
});

// Debug log handler
ipcMain.on('log-debug', (event, message) => {
    log.debug(`Renderer: ${message}`);
});

// Warn log handler
ipcMain.on('log-warn', (event, message) => {
    log.warn(`Renderer: ${message}`);
});

// Error log handler
ipcMain.on('log-error', (event, message) => {
    log.error(`Renderer: ${message}`);
});

ipcMain.handle('get-logs', async () => {
    const logFilePath = log.transports.file.getFile().path;
    log.debug(`Log file path: ${logFilePath}`);
    try {
        const data = fs.readFileSync(logFilePath, 'utf8');
        log.debug('Log data read successfully.');
        return data; // Return the log data to the renderer process
    } catch (error) {
        log.error(`Error reading log file: ${error}`);
        return ''; // Return empty string on error
    }
});

/**
 * Function to create a new window to display the provided URL
 * @param {*} url       The URL.
 */
function createURLWindow(url) {
    // Validate that the provided string is a valid URL
    try {
        new URL(url);
    } catch (err) {
        log.error(`Invalid URL: ${url}`);
        return;
    }

    log.debug(`Creating URL window for: ${url}`);

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
    urlWindow.loadURL(url).then(() => {
        log.info(`URL window loaded: ${url}`);
    }).catch((error) => {
        log.error(`Failed to load URL: ${error}`);
    });

    // Prevent the window from navigating away from the original URL
    urlWindow.webContents.on('will-navigate', (event, navigateUrl) => {
        if (navigateUrl !== url) {
            event.preventDefault(); // Cancel any navigation to external URLs
            log.warn(`Navigation attempt to external URL blocked: ${navigateUrl}`);
        }
    });

    // Prevent the window from opening any new windows (e.g., pop-ups)
    urlWindow.webContents.setWindowOpenHandler(() => {
        log.warn('Attempt to open a new window was blocked.');
        return { action: 'deny' }; // Deny any requests to open new windows
    });
}

// Initializes the application depending on if in a dev or production environment.
if (isDev) {
    log.debug('Running backend Python script in development mode.');
    PythonShell.run(DEV_API_PATH, function(err, res) {
        if (err) {
            log.error(`PythonShell error: ${err}`);
        } else {
            log.debug('PythonShell ran successfully.');
        }
    });
} else {
    // fileExecutor(PROD_API_PATH, {
    // WIP
    // });
}

// Used to check if the backend is up
var failedPingCount = 0;
var maxPingAttempts = 5;
var pingIntervalTest = setInterval(function() {
    pingBackend()
        .then(response => {
            log.info(`Backend ping successful: ${response.data.message}`);
            clearInterval(pingIntervalTest);
        })
        .catch(err => {
            failedPingCount += 1;
            log.warn(`Attempted to ping the backend (attempt: ${failedPingCount})`);
            if (failedPingCount >= maxPingAttempts) {
                log.error('Backend failed to respond after maximum attempts.');
                clearInterval(pingIntervalTest);
                // Handle the failure accordingly
            }
        });
}, 5000);

// When the application is ready, create the main window
app.whenReady().then(() => {
    createMainWindow();
    log.info('Application is ready');

    // macOS specific behavior to recreate window when the dock icon is clicked
    app.on('activate', () => {
        log.debug('App activated.');
        // Only create a new window if none are open
        if (BrowserWindow.getAllWindows().length === 0) {
            log.info('No windows open. Creating main window.');
            createMainWindow();
        }
    });
}).catch((error) => {
    log.error(`Error during app startup: ${error}`);
});

// When all windows are closed, quit the app unless running on macOS
app.on('window-all-closed', () => {
    log.info('All windows closed.');
    if (!isMac) {
        log.info('Quitting application.');
        app.quit(); // macOS apps typically stay open until explicitly quit
    }
});

// Listen for 'open-url' event from renderer to open a new window with the provided URL
ipcMain.on('open-url', (event, url) => {
    log.debug(`Received 'open-url' event for URL: ${url}`);
    try {
        createURLWindow(url); // Attempt to create a new URL window
    } catch (error) {
        // Log error if URL cannot be opened and notify the renderer process
        log.error(`Error opening URL window: ${error.message}`);
        event.sender.send('open-url-error', error.message);
    }
});

// Kills child processes when closing the app
app.on("before-quit", () => {
    log.info('Application is quitting. Attempting to stop backend.');
    stopPyBackend()
        .then(res => {
            log.info(`Backend stopped: ${res.data.message}`);
        })
        .catch(err => {
            log.error(`Error stopping backend: ${err}`);
        });
});

// Handles a scrape request
ipcMain.handle('scrape:request', async (event, arg) => {
    log.debug(`Received 'scrape:request' with argument: ${JSON.stringify(arg)}`);
    try {
        const response = await scrapeRequest(arg);
        log.debug('Scrape request successful.');
        return JSON.stringify(response.data);
    } catch (error) {
        log.error(`Scrape request failed: ${error}`);
        throw error;
    }
});

// Handles closing the application
ipcMain.on('exit:request', () => {
    log.info('Received exit request from renderer.');
    app.quit();
});
