/**
 * This file will be used as the primary entry point for the application.
 */

const path = require('node:path');

const { app, BrowserWindow, nativeTheme } = require('electron');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWin;

function createMainWindow() {
    mainWin = new BrowserWindow({
        width: isDev ? 1200 : 800,
        height: 600,
        "minWidth": isDev ? 1200 : 800,
        "minHeight": 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Displays dev tools if in a dev environment
    if (isDev) {
        mainWin.webContents.openDevTools();
    }

    mainWin.setMenu(null);

    mainWin.loadFile('./renderer/index.html')
}

nativeTheme.themeSource = 'dark'

app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
})

// Exits upon all windows being closed
app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});

