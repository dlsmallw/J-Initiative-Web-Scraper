// logger.js

const log = require('electron-log');

// Configure logging levels and formats
log.transports.file.level = 'info';
log.transports.console.level = 'debug';
log.transports.file.format = '{h}:{i}:{s} [{level}] {text}';

// Export the logger for use in other modules
module.exports = log;


//Electron Log Library: The core logging logic uses the electron-log library,
//which is a specialized logger for Electron applications. This library is responsible
//for writing log messages to files, the console, or other outputs.
//It is imported and used in the main process (main.js).

//Electron IPC API:

/* ipcRenderer: Used in the renderer process to send log messages to the main process. This
is exposed to the renderer process via contextBridge in the preload.js file.
ipcMain: Used in the main process to receive and handle log messages from the renderer
process and log them using electron-log.

How the API Works:
The renderer process uses window.electronAPI.log.info() or window.electronAPI.log.error() to send log messages.
These functions internally call ipcRenderer.send(), which sends the log message to the main process.
The main process has ipcMain.on() handlers that listen for these messages and log them using electron-log.

Breakdown:
electron-log: The actual logging library that handles logging in the main process.

Electron IPC:
ipcRenderer: Used to send log requests from the renderer to the main process.
ipcMain: Listens for log requests in the main process and calls electron-log methods to log the messages.*/
