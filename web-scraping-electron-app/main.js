/**
 * This file will be used as the primary entry point for the application.
 */

const path = require('node:path');

const { app, BrowserWindow} = require('electron');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let homeWin;
let aboutWin;

function createHomeWindow() {
    homeWin = new BrowserWindow({
        width: isDev ? 1200 : 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Displays dev tools if in a dev environment
    if (isDev) {
        homeWin.webContents.openDevTools();
    }

    homeWin.setMenu(null);

    homeWin.loadFile('./renderer/index.html')
}

app.whenReady().then(() => {
    createHomeWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createHomeWindow()
    })
})

// Exits upon all windows being closed
app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});

