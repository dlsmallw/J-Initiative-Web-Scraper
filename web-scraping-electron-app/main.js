/**
 * This file will be used as the primary entry point for the application.
 */
const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
// const pyshell = require('python-shell');
const { PythonShell } = require('python-shell');
const path = require('node:path');

const { stopPyBackend, pingBackend, scrapeRequest } = require('./js-api.js');

// This will be needed when packaging the python code base as an executable (i.e., WIP)
// const PROD_API_PATH = path.join(process.resourcesPath, "")
const DEV_API_PATH = path.join(__dirname, "./backend/backend_api.py");
const fileExecutor = require("child_process").execFile;

const isMac = process.platform === 'darwin';
const isDev = !app.isPackaged;

let mainWin;

function createMainWindow() {
    mainWin = new BrowserWindow({
        width: isDev ? 1200 : 800,
        height: 600,
        "minWidth": isDev ? 1200 : 800,
        "minHeight": 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // Displays dev tools if in a dev environment
    if (isDev) {
        mainWin.webContents.openDevTools();
    }

    // Gets rid of the default toolbar (in favor of bootstrap navbar)
    mainWin.setMenu(null);

    mainWin.loadFile('./renderer/index.html');

    
}

if (isDev) {
    PythonShell.run(DEV_API_PATH, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            
        }
    });
} else {
    // fileExecutor(PROD_API_PATH, {
    // WIP
    // });
}

// Used to check if the backend is up
var failedPingCount = 0;
var pingIntervalTest = setInterval(function() {
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

// Waits for the app to be initialized before creating/displaying the main window
app.whenReady().then(() => {
    createMainWindow();

    // Opens the main window if now windows currently open
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    })
});

// Kills child processes when closing the app
app.on("before-quit", () => {
    if (!isDev) {
        fileExecutor.kill('SIGINT');
    } else {
        stopPyBackend()
            .then(res => {
                console.log(res.data.message);
            });
    }
});

// Exits upon all windows being closed
app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});

ipcMain.handle('scrape:request', async (event, arg) => {
    return JSON.stringify((await scrapeRequest(arg)).data);
});

ipcMain.on('exit:request', () => {
    mainWin.close();
})
