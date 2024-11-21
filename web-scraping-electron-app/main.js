/**
 * This file will be used as the primary entry point for the application.
 */

// Import necessary modules from Electron and Node.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const { exportDataToLS, updateLinkedLSProject, updateAPIToken: updateAPIToken, clearLinkedLSProject } = require('./js/label-studio-api.js');

// Determine if the operating system is macOS
const isMac = process.platform === 'darwin';
// Determine if we are in development mode or production mode
const isDev = !app.isPackaged;

// Reference for the main application window
let mainWin;
let lsWindow;

/**
 * Function to create the main application window.
 */
function createMainWindow() {
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
        mainWin.webContents.openDevTools();
    }

    // Disable the default application menu
    mainWin.setMenu(null);

    // Load the main HTML file for the renderer process
    mainWin.loadFile('./renderer/index.html');
}

/**
 * Function to create a new window to display the provided URL
 * @param {*} url       The URL.
 */
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

// // Kills child processes when closing the app
// app.on("before-quit", () => {
//     stopPyBackend()
//         .then(res => {
//             console.log(res.data.message);
//         });
// });

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

// Handles closing the application
ipcMain.on('exit:request', () => {
    app.quit();
});

//===============================================================================================================
// Logic to be removed
//===============================================================================================================
// const { stopPyBackend, pingBackend, scrapeRequest } = require('./js/js-api.js');
// 
// const { PythonShell } = require('python-shell');
// // This will be needed when packaging the python code base as an executable (i.e., WIP)
// // const PROD_API_PATH = path.join(process.resourcesPath, "")
// const DEV_API_PATH = path.join(__dirname, "./backend/backend_api.py");
// const fileExecutor = require("child_process").execFile;
// 
// // Initializes the application depending on if in a dev or production environment.
// if (isDev) {
//     PythonShell.run(DEV_API_PATH, function(err, res) {
//         if (err) {
//             console.log(err);
//         } 
//     });
// } else {
//     // fileExecutor(PROD_API_PATH, {
//     // WIP
//     // });
// }

// // Used to check if the backend is up
// var failedPingCount = 0;
// var pingIntervalTest = setInterval(function() {
//     pingBackend()
//             .then(response => {
//                 console.log(response.data.message);
//                 clearInterval(pingIntervalTest);
//             })
//             .catch(err => {
//                 failedPingCount += 1;
//                 console.log("Attempted to ping the backend (attempt: " + failedPingCount + ")");
//             });
// }, 5000);
// 
// ipcMain.handle('scrape:request', async (event, arg) => {
//     return JSON.stringify((await scrapeRequest(arg)).data);
// });