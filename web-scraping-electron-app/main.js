/**
 * This file will be used as the primary entry point for the application.
 */

const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
const { PythonShell } = require('python-shell');
const path = require('node:path');
const log = require('./logger');
const { testCommWithPyAPI, stopPyBackend } = require('./js-api.js');

const DEV_API_PATH = path.join(__dirname, "./backend/backend_api.py");
const fileExecutor = require("child_process").execFile;
//const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWin;

// Start Python backend if in development mode
if (isDev) {
    log.info("Starting Python FastAPI server...");
    PythonShell.run(DEV_API_PATH, (err) => {
        if (err) log.error('Error starting Python server:', err);
    });
}

/**
 * Creates and configures the main application window.
 */
function createMainWindow() {
    mainWin = new BrowserWindow({
        width: isDev ? 1200 : 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    if (isDev) mainWin.webContents.openDevTools();

    mainWin.setMenu(null);
    mainWin.loadFile('./renderer/index.html');

    log.info('Main window created');
}

// This is a current placeholder for setting the color mode of the app window to dark theme
nativeTheme.themeSource = 'dark';

// Handle app ready state
app.whenReady().then(() => {
    createMainWindow();
    log.info('Application is ready');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

// Kills child processes when closing the app
app.on('before-quit', () => {
    if (isDev) {
        stopPyBackend().then(res => {
            log.info('Python backend stopped:', res.message);
        }).catch(err => {
            log.error('Error stopping Python backend:', err);
        });
    }
    log.info('Application quitting...');
});

// Exit the app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Handle log-info events from the renderer
ipcMain.on('log-info', (event, message) => {
    //console.log(`[INFO] ${message}`); // Logs to the terminal console
    log.info(message); // Also logs to the file if needed
});

ipcMain.on('log-error', (event, message) => {
    //console.error(`[ERROR] ${message}`); // Logs to the terminal console
    log.error(message); // Also logs to the file if needed
});

// Handle scrape requests from renderer
ipcMain.on('scrape:request', () => {
    testCommWithPyAPI().then(data => {
        mainWin.webContents.send('scrape:result', data);
    }).catch(err => log.error('Error processing scrape request:', err));
});

// Handle exit request from renderer
ipcMain.on('exit:request', () => {
    log.info('Exit request received from renderer');
    mainWin.close();
});
