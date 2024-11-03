/**
 * This file will be used as the primary entry point for the application.
 */
// main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createMainWindow() {
    const mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // For security
            nodeIntegration: false, // Disable Node.js integration in renderer
        },
    });

    mainWin.loadFile('index.html');
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Handle IPC
ipcMain.handle('exit-app', () => {
    app.quit();
});

