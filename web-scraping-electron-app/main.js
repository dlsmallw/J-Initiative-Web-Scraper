/**
 * This file will be used as the primary entry point for the application.
 */

// Import necessary modules from Electron and Node.js
const {app, BrowserWindow, nativeTheme, ipcMain} = require('electron');
const path = require('node:path');

const { PythonShell } = require('python-shell');
const { stopPyBackend, pingBackend, scrapeRequest } = require('./js/js-api.js');

// This will be needed when packaging the python code base as an executable (i.e., WIP)
// const PROD_API_PATH = path.join(process.resourcesPath, "")
const DEV_API_PATH = path.join(__dirname, "./backend/backend_api.py");
const fileExecutor = require("child_process").execFile;
const { dialog } = require('electron')
// Determine if the operating system is macOS
const isMac = process.platform === 'darwin';
// Determine if we are in development mode or production mode
const isDev = !app.isPackaged;

// Reference for the main application window
let mainWin;

/**
 * Function to create the main application window.
 */
function createMainWindow() {
    // Create the BrowserWindow instance with specific options
    mainWin = new BrowserWindow({
        width: isDev ? 1200 : 800, // Set width: larger size for development
        height: 600, // Set height for the window
        minWidth: isDev ? 1200 : 800, // Set minimum width to prevent shrinking beyond a set size
        minHeight: 600, // Set minimum height
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // Open developer tools automatically if in development mode
    if (isDev) {
        mainWin.webContents.openDevTools();
    }

    // Disable the default application menu
    mainWin.setMenu(null);

    // Load the main HTML file for the renderer process
    mainWin.loadFile('./renderer/index.html').then(r => "success");
}

/**
 * Function to create a new window to display the provided URL
 * @param {*} url       The URL.
 */
function createURLWindow(url) {
    console.log('URL received in createURLWindow:', url);

    if (!isValidURL(url)) {
        console.error(`Invalid URL in createURLWindow: ${url}`);
        dialog.showErrorBox('Invalid URL', 'The URL you entered is invalid.');
        return;
    }

    const urlWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'url-preload.js'),
        }
    });

    const loadingWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    loadingWindow.loadFile(path.join(__dirname, 'renderer', 'assets', 'html', 'loadingscreen.html'))
        .then(() => console.log("Loading screen opened successfully"))
        .catch((error) => {
            console.error('Error loading loading screen:', error);
            loadingWindow.close();
        });

    urlWindow.hide();

    urlWindow.loadURL(url)
        .then(() => {
            urlWindow.show();
            loadingWindow.close();
        })
        .catch((error) => {
            console.error(`Error loading URL: ${url}`, error);
            urlWindow.close();
            loadingWindow.close();
            dialog.showErrorBox('Error', 'Failed to load the URL.');
        });

    urlWindow.webContents.on('will-navigate', (event, navigateUrl) => {
        if (navigateUrl !== url) {
            event.preventDefault();
        }
    });

    urlWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

// Initializes the application depending on if in a dev or production environment.
if (isDev) {
    PythonShell.run(DEV_API_PATH, function (err, res) {
        if (err) {
            console.log(err);
        }
    }).then(r => "success");
} else {
    // fileExecutor(PROD_API_PATH, {
    // WIP
    // });
}

// Used to check if the backend is up
var failedPingCount = 0;
var pingIntervalTest = setInterval(function () {
    pingBackend()
        .then(response => {
            console.log(response.data.message);
            clearInterval(pingIntervalTest);
        })
        .catch(err => {
            failedPingCount += 1;
            console.log("Attempted to ping the backend (attempt: " + failedPingCount + ")");
        });
}, 5000);

// When the application is ready, create the main window
app.whenReady()
    .then(createMainWindow)
    .then(() => {
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
        });
    });
// When all windows are closed, quit the app unless running on macOS
app.on('window-all-closed', () => {
    if (!isMac) app.quit(); // macOS apps typically stay open until explicitly quit
});

// Listen for 'open-url' event from renderer to open a new window with the provided URL
ipcMain.on('open-url', (event, url) => {
    console.log('Received URL in main process:', url);
    try {
        createURLWindow(url);
    } catch (error) {
        console.error(`Error opening URL window: ${error.message}`);
        event.sender.send('open-url-error', error.message);
    }
});


// Kills child processes when closing the app
app.on("before-quit", () => {
    stopPyBackend()
        .then(res => {
            console.log(res.data.message);
        });
});

// Handles a scrape request
ipcMain.handle('scrape:request', async (event, arg) => {
    return JSON.stringify((await scrapeRequest(arg)).data);
});

ipcMain.on('selected-text', (event, text) => {
    if (mainWin) {
        mainWin.webContents.send('display-selected-text', text);
    } else {
        console.error("Main window is not available to receive selected text.");
    }
});

ipcMain.on('import-data', (event, data) => {
    // Handle the imported data
    console.log('Imported Data:', data);
    event.sender.send('data-imported', 'Data imported successfully!');
});

ipcMain.on('export-data', async (event, data) => {
    try {
        await exportDataToDatabase(data);
        event.sender.send('export-success', 'Data exported successfully!');
    } catch (error) {
        console.error('Export Error:', error);
        event.sender.send('export-error', 'Failed to export data.');
    }
});

async function exportDataToDatabase(data) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

ipcMain.handle('scrape-url', async (event, url) => {
    try {
        const response = await axios.post('http://127.0.0.1:7777/url', { url });
        if (response.data.ok) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Error communicating with backend:', error);
        throw error;
    }
});


// Handles closing the application
ipcMain.on('exit:request', () => {
    app.quit();
})
