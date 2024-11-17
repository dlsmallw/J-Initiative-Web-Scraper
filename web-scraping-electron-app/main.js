/**
 * This file will be used as the primary entry point for the application.
 */

// Import necessary modules from Electron and Node.js
console.log('Renderer process loaded at', new Date().toISOString());

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
 * Create the main application window.
 */
function createMainWindow() {
    console.log('Creating main application window');

    mainWin = new BrowserWindow({
        width: isDev ? 1200 : 800,
        height: 600,
        minWidth: isDev ? 1200 : 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWin.on('focus', () => {
        console.log('Main window regained focus at', new Date().toISOString());
        mainWin.webContents.send('main-window-focus');
    });

    mainWin.on('blur', () => {
    console.log('Main window lost focus at', new Date().toISOString());

    const allWindows = BrowserWindow.getAllWindows();
    console.log('All windows:', allWindows.map(win => win.getTitle()));

    const focusedWindows = allWindows.filter(win => win.isFocused());
    console.log('Currently focused windows:', focusedWindows.map(win => win.getTitle()));

    console.log('Main window state:', {
        isVisible: mainWin.isVisible(),
        isMinimized: mainWin.isMinimized(),
        isFocused: mainWin.isFocused(),
    });

    // Refocus main window if no other windows are focused
    if (focusedWindows.length === 0 && !mainWin.isMinimized() && mainWin.isVisible()) {
        console.log('No focused windows detected. Refocusing main window.');
        mainWin.focus();
    }
});


    if (isDev) mainWin.webContents.openDevTools();

    mainWin.setMenu(null);

    mainWin.loadFile('./renderer/index.html')
        .then(() => console.log('Main window loaded successfully'))
        .catch(error => console.error('Error loading main window:', error));
}

/**
 * Create a new window to display the provided URL.
 * @param {string} url The URL to open in the new window.
 */
function createURLWindow(url) {
    console.log('Received URL to open:', url);

    // Validate the URL
    if (!isValidURL(url)) {
        console.error(`Invalid URL: ${url}`);
        dialog.showErrorBox('Invalid URL', 'The URL you entered is invalid.');
        return;
    }

    // Create the URL window
    const urlWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        alwaysOnTop: true, // Keeps the window on top
        webPreferences: {
            preload: path.join(__dirname, 'url-preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    console.log('URL window created');

   urlWindow.on('blur', () => {
        console.log('urlWindow lost focus');
        if (mainWin && !mainWin.isMinimized() && !mainWin.isDestroyed()) {
            console.log('Refocusing main window from urlWindow blur');
            mainWin.focus();
        }
    });

    urlWindow.once('closed', () => {
    console.log('urlWindow closed at', new Date().toISOString());
        if (mainWin && !mainWin.isMinimized() && !mainWin.isDestroyed()) {
            console.log('Refocusing main window');
            mainWin.focus();
        }
    });

    // Load the URL and show the window
    urlWindow.loadURL(url)
        .then(() => {
            console.log('URL loaded successfully:', url);
            urlWindow.show();
        })
        .catch(error => {
            console.error('Error loading URL:', error);
            dialog.showErrorBox('Error', 'Failed to load the URL.');
            urlWindow.close();
        });
}


/**
 * Validate if a string is a valid URL.
 * @param {string} url The URL to validate.
 * @returns {boolean} True if valid, otherwise false.
 */
function isValidURL(url) {
    try {
        new URL(url);
        console.log('Valid URL:', url);
        return true;
    } catch {
        console.error('Invalid URL:', url);
        return false;
    }
}

/**
 * Export data to a database (simulated).
 * @param {any} data Data to export.
 */
async function exportDataToDatabase(data) {
    console.log('Simulating data export:', data);
    return new Promise(resolve => setTimeout(resolve, 1000));
}

/**
 * Set up IPC handlers and listeners.
 */
function setupIPCHandlers() {
    ipcMain.on('open-url', (event, url) => {
        console.log('IPC Event: open-url with URL:', url);
        try {
            createURLWindow(url);
        } catch (error) {
            console.error('Error handling open-url:', error);
            event.sender.send('open-url-error', error.message);
        }
    });

    ipcMain.on('selected-text', (event, text) => {
        console.log('IPC Event: selected-text with text:', text);
        if (mainWin) {
            mainWin.webContents.send('display-selected-text', text);
        } else {
            console.error('Main window is not available to receive selected text');
        }
    });

    ipcMain.on('import-data', (event, data) => {
        console.log('IPC Event: import-data with data:', data);
        event.sender.send('data-imported', 'Data imported successfully!');
    });

    ipcMain.on('export-data', async (event, data) => {
        console.log('IPC Event: export-data with data:', data);
        try {
            await exportDataToDatabase(data);
            event.sender.send('export-success', 'Data exported successfully!');
        } catch (error) {
            console.error('Export Error:', error);
            event.sender.send('export-error', 'Failed to export data.');
        }
    });

    ipcMain.handle('scrape:request', async (event, arg) => {
        console.log('IPC Handle: scrape:request with arg:', arg);
        try {
            const response = await scrapeRequest(arg);
            return JSON.stringify(response.data);
        } catch (error) {
            console.error('Error in scrape:request:', error);
            throw error;
        }
    });
}

/**
 * Initialize the application.
 */
function initializeApp() {
    app.whenReady()
        .then(() => {
            console.log('Application ready');
            createMainWindow();
            setupIPCHandlers();
        })
        .catch(error => console.error('Error initializing app:', error));

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });

    app.on('window-all-closed', () => {
        if (!isMac) app.quit();
    });

    app.on('before-quit', () => {
        console.log('Application quitting');
        stopPyBackend()
            .then(res => console.log('Backend stopped:', res.data.message))
            .catch(error => console.error('Error stopping backend:', error));
    });
}

/**
 * Start backend and monitor its status.
 */
function startBackend() {
    const backendPath = isDev ? DEV_API_PATH : ''; // Adjust as necessary for production
    if (isDev) {
        console.log('Starting backend in development mode');
        PythonShell.run(backendPath, (err) => {
            if (err) console.error('Error starting backend:', err);
        });
    }

    let failedPingCount = 0;
    const pingInterval = setInterval(() => {
        pingBackend()
            .then(response => {
                console.log('Backend ping success:', response.data.message);
                clearInterval(pingInterval);
            })
            .catch(() => {
                failedPingCount += 1;
                console.warn(`Failed backend ping attempt ${failedPingCount}`);
            });
    }, 5000);
}

ipcMain.on('log-message', (event, { level, message }) => {
    const timestamp = new Date().toISOString();
    if (level === 'error') {
        console.error(`[${timestamp}] [ERROR]: ${message}`);
    } else {
        console.log(`[${timestamp}] [INFO]: ${message}`);
    }
});
// Refocus main window programmatically
ipcMain.on('refocus-main-window', () => {
    console.log('Refocusing main window programmatically');
    if (mainWin && !mainWin.isFocused()) {
        mainWin.focus();
    }
});

setInterval(() => {
    const focusedWindows = BrowserWindow.getAllWindows().filter(win => win.isFocused());
    if (focusedWindows.length === 0 && mainWin && !mainWin.isMinimized()) {
        console.log('No focused windows detected. Refocusing main window.');
        mainWin.focus();
    }
}, 5000); // Check every 5 seconds


// Start the application and backend
initializeApp();
startBackend();