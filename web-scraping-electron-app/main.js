/**
 * This file will be used as the primary entry point for the application.
 */
const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
// const pyshell = require('python-shell');
const { PythonShell } = require('python-shell');
const kill = require('tree-kill');
const path = require('node:path');

const { testCommWithPyAPI, stopPyBackend } = require('./js-api.js');

// This will be needed when packaging the python code base as an executable (i.e., WIP)
// const PROD_API_PATH = path.join(process.resourcesPath, "")
const DEV_API_PATH = path.join(__dirname, "./backend/backend_api.py");
const fileExecutor = require("child_process").execFile;

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWin;

if (isDev) {
    console.log("Python FastAPI server started")
    
    PythonShell.run(DEV_API_PATH, function(err, res) {
        if (err) {
            console.log(err);
        }
    });
} else {
    // fileExecutor(PROD_API_PATH, {
    // WIP
    // });
}

function createMainWindow() {
    mainWin = new BrowserWindow({
        width: isDev ? 1200 : 800,
        height: 600,
        "minWidth": isDev ? 1200 : 800,
        "minHeight": 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
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

// This is a current placeholder for seeting the color mode of the app window to dark theme
nativeTheme.themeSource = 'dark';

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
                console.log(res.message);
            })
    }
});

// Exits upon all windows being closed
app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});

ipcMain.on('scrape:request', () => {
    testCommWithPyAPI()
        .then(function(data) {
            mainWin.webContents.send('scrape:result', data);
        });
})
