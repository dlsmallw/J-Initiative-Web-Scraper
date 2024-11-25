// main.js
/**
 * This file will be used as the primary entry point for the application.
 */

// Import necessary modules from Electron and Node.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');

const { exportDataToLS, updateLinkedLSProject, updateAPIToken, clearLinkedLSProject } = require('./js/label-studio-api.js');

// Determine if the operating system is macOS
const isMac = process.platform === 'darwin';
// Determine if we are in development mode or production mode
const isDev = !app.isPackaged;
const fs = require('fs');
const log = require('electron-log');

// Reference for the main application window
let mainWin;
let lsWindow;

/**
 * Function to create the main application window.
 */
function createMainWindow() {
    log.debug('Creating main application window.');

    // Create the BrowserWindow instance with specific options
    mainWin = new BrowserWindow({
        frame: false,
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
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true
        }
    });

    const loadingWindow = new BrowserWindow( {
        width: 1200, // Set width of the URL window
        height: 800,
        webPreferences: {
            nodeIntegration: false, // Disable Node.js integration for security
            contextIsolation: true, // Isolate context for securitya
        }
    });

    loadingWindow.loadFile('./renderer/assets/html/loadingscreen.html').then(() => log.info("loading screen opened successfully"));

    urlWindow.hide();

     // Load the specified URL in the window, catch invalid url
    urlWindow.loadFile('./renderer/webview_window.html')
        .then(() => {
            urlWindow.webContents.send('setUrl', url);
            urlWindow.show();
            loadingWindow.close();
            log.info(`URL window loaded: ${url}`);
    }).catch((error) => {
            urlWindow.close()
            loadingWindow.close()
            log.error(`Failed to load URL: ${error}`);
            dialog.showErrorBox('Invalid URL', 'Cannot open URL: the URL you entered was invalid!');
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
        createURLWindow(url)
    } catch (error) {
        // Log error if URL cannot be opened and notify the renderer process
        log.error(`Error opening URL window: ${error.message}`);
        event.sender.send('open-url-error', error.message);
    }
});

/**
 * Opens the LS project app in a separate window.
 * @param {*} url       The url of the LS project.
 */
function createLSExternal(url) {
    // Create the BrowserWindow instance with specific options
    lsWindow = new BrowserWindow({
        width: 800, // Set width: larger size for development
        height: 600, // Set height for the window
        minWidth: 800, // Set minimum width to prevent shrinking beyond a set size
        minHeight: 600, // Set minimum height
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // Disable the default application menu
    // lsWindow.setMenu(null);

    try {
        lsWindow.loadURL(url);

        lsWindow.on('close', () => {
            // tell renderer to redisplay embbedded content
            mainWin.webContents.send('openLSExternal-close');
        });
    
        // Prevent the window from opening any new windows (e.g., pop-ups)
        lsWindow.webContents.setWindowOpenHandler(() => {
            return { action: 'deny' }; // Deny any requests to open new windows
        });
    } catch (err) {
        lsWindow.close();
        // tell renderer to redisplay embbedded content
        mainWin.webContents.send('openLSExternal-close');
    }
}

// Handles exporting data to the linked LS project
ipcMain.on('exportData:request', async (event, data, projectID) => {
    exportDataToLS(data, projectID)
        .then(response => {
            console.log(response)
            mainWin.webContents.send('exportData:response', JSON.stringify(response));
        });
});

// Handles openning the LS project in an external window
ipcMain.on('openLSExternal:request', (event, url) => {
    createLSExternal(url);
});

// Handles updating the linked LS project URL
ipcMain.on('initLSVariables:request', (event, url, token) => {
    updateLinkedLSProject(url);
    updateAPIToken(token)
        .then(result => {
            mainWin.webContents.send('updateToProjectList', JSON.stringify(result));
        }).catch(err => {
            console.log(err);
        }); 
});

// Handles updating the linked LS project URL
ipcMain.on('updateLinkedLS:request', (event, url) => {
    updateLinkedLSProject(url);
});

// Handles updating the linked LS project API Token
ipcMain.on('updateAPIToken:request', (event, token) => {
    updateAPIToken(token)
        .then(result => {
            mainWin.webContents.send('updateToProjectList', JSON.stringify(result));
        }).catch(err => {
            console.log(err);
        }); 
});

// Handles clearing the linked LS project (URL and API)
ipcMain.on('clearLinkedLS:request', () => {
    clearLinkedLSProject();
});

// Handles a scrape request
ipcMain.on('scrapedData:export', (event, data) => {
    console.log('Main process received scraped data:', data);

    if (mainWin) {
        mainWin.webContents.send('scrapedData:update', data);
        console.log('Forwarded scraped data to renderer.');
    } else {
        console.error('Main window is not available to forward scraped data.');
    }
});

// Handles closing the application
ipcMain.on('exit:request', () => {
    log.info('Received exit request from renderer.');
    app.quit();
});