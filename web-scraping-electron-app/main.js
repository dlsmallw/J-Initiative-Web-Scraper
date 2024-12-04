// main.js
/**
 * This file will be used as the primary entry point for the application.
 */

// Import necessary modules from Electron and Node.js

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const log = require('electron-log');
const { Tail } = require('tail');
const { Mutex } = require('async-mutex');

// API Imports
const { exportDataToLS, updateLinkedLSProject, updateAPIToken, clearLinkedLSProject } = require('./js/label-studio-api.js');

// Helper class for handling processing of Queued events.
class Queue {
    elements = {};
    headIdx = 0;
    tailIdx = 0;
    mutex = new Mutex();

    constructor() {
    }

    /**
     * Pushes an item to the Queue.
     * @param {*} item      Item to be added.
     */
    async enqueue(item) {
        await this.mutex.acquire().then(() => {
            this.elements[this.tailIdx] = item
            this.tailIdx++

            this.mutex.release();
        });
    }

    /**
     * Peeks the head of the Queue/
     * @returns         The head element of the Queue.
     */
    async peek() {
        var item;

        await this.mutex.acquire().then(() => {
            item = this.elements[this.headIdx];

            this.mutex.release();
        });

        return item;
    }

    hasElements() {
        return this.headIdx < this.tailIdx;
    }

    dequeue() {
        var item = this.elements[this.headIdx];
        delete this.elements[this.headIdx];
        this.headIdx++;

        return item;
    }

    /**
     * Returns a list of the pending logs.
     * @returns         A list.
     */
    async getPendingLogs() {
        var logList = [];

        await this.mutex.acquire().then(() => {
            while (this.hasElements()) {
                var item = this.dequeue();
                logList.push(item);
            }

            this.headIdx = 0;
            this.tailIdx = 0;

            this.mutex.release();
        });

        return logList;
    }
}

// Useful variables for app initialization
const isMac = process.platform === 'darwin';    // Determine if the operating system is macOS
const isDev = !app.isPackaged;                  // Determine if we are in development mode or production mode

// Reference for the main application window
let mainWin;
let urlWindow, lsWindow;
let tail;

let logReadQueue = new Queue();
let logIntervalUpdater;

const logFileMutex = new Mutex();

/**
 * Function to create the main application window.
 */
function createMainWindow() {
    logDebug('Creating main application window.');

    // Create the BrowserWindow instance with specific options
    mainWin = new BrowserWindow({
        frame: false,
        transparent: true, 
        width: isDev ? 1400 : 1200, // Set width: larger size for development
        height: 800, // Set height for the window
        minWidth: isDev ? 1400 : 1200, // Set minimum width to prevent shrinking beyond a set size
        minHeight: 800, // Set minimum height
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true
        }
    });

    // Open developer tools automatically if in development mode
    if (isDev) {
        logDebug('Opening developer tools.');
        mainWin.webContents.openDevTools();
    }

    // Disable the default application menu
    mainWin.setMenu(null);

    // Load the main HTML file for the renderer process
    mainWin.loadFile('./renderer/index.html').then(() => {
        logInfo('Main window loaded.');
    }).catch((error) => {
        logError(`Failed to load main window: ${error}`);
    });
}

function logInfo(log) {
    writeNewLog(log, 'info');
}

function logDebug(log) {
    writeNewLog(log, 'debug');
}

function logWarn(log) {
    writeNewLog(log, 'warn');
}

function logError(log) {
    writeNewLog(log, 'error');
}

// Info log handler
ipcMain.on('log-info', (event, message) => {
    logInfo(`Renderer: ${message}`);
});

// Debug log handler
ipcMain.on('log-debug', (event, message) => {
    logDebug(`Renderer: ${message}`);
});

// Warn log handler
ipcMain.on('log-warn', (event, message) => {
    logWarn(`Renderer: ${message}`);
});

// Error log handler
ipcMain.on('log-error', (event, message) => {
    logError(`Renderer: ${message}`);
});

ipcMain.handle('get-logs', async () => {
    var logFilePath = log.transports.file.getFile().path;
    logDebug(`Log file path: ${logFilePath}`);

    var logArr = log.transports.file.readAllLogs(logFilePath)[0].lines
    var logData = [];

    for (var i = 0; i < logArr.length; i++) {
        try {
            var line = logArr[i];

            if (line !== null && line !== '') {
                var logObj = formLogObject(line);
                logData.push(logObj);
            }
        } catch (err) {
            console.log(err);
        }
    }

    var logList = await logReadQueue.getPendingLogs();

    if (logList.length > 0) {
        logData.concat(logList);
    }

    initLogListener(logFilePath.toString());

    return logData;
});

function enableLogger() {
    loggerEnabled = true;
}

function disableLogger() {
    loggerEnabled = false;
}

function formLogObject(line) {
    var [rawDateTime, rawType] = line.match(/\[(.*?)\]/g);

    var [year, month, day] = rawDateTime.match(/\d{4}-\d{2}-\d{2}/)[0].split('-');
    var [hr, min, sec, millisec] = rawDateTime.match(/\b(\d{1,2}):(\d{2}):(\d{2})\.(\d{1,3})\b/).slice(1);
   
    var dateObj = new Date(year, month - 1, day, hr, min, sec, millisec);
    var type = rawType.replace(/[\[\]']+/g, '');
    var msg = line.substring(line.lastIndexOf(']') + 1).trim();
    var rawLogMsg = line;

    // console.log(`${year}-${month}-${day}`);
    // console.log(`${hr}-${min}-${sec}-${millisec}`);
    // console.log(type)
    // console.log(msg)

    return {
        logDateTime: dateObj,
        logType: type,
        logMsg: msg,
        rawLogStr: rawLogMsg
    }
}

function writeNewLog(line, type) {
    logFileMutex.acquire().then(() => {

        switch (type) {
            case 'info':
                log.info(line);
                break;
            case 'debug':
                log.debug(line);
                break;
            case 'warn':
                log.warn(line);
                break;
            case 'error':
                log.error(line);
                break;
            default:
                break;
        }

        logFileMutex.release();
    });
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
        logError(`Invalid URL: ${url}`);
        return;
    }

    logDebug(`Creating URL window for: ${url}`);

    // Create a new BrowserWindow instance for the URL
    urlWindow = new BrowserWindow({
        frame: false,
        width: 1400, // Set width of the URL window
        height: 1000, // Set height of the URL window
        minWidth: 1200, // Set minimum width to prevent shrinking beyond a set size
        minHeight: 800, // Set minimum height
        webPreferences: {
            nodeIntegration: false, // Disable Node.js integration for security
            contextIsolation: true, // Isolate context for security
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true
        }
    });

    // const loadingWindow = new BrowserWindow({
    //     width: 1200, // Set width of the URL window
    //     height: 800,
    //     webPreferences: {
    //         nodeIntegration: false, // Disable Node.js integration for security
    //         contextIsolation: true, // Isolate context for securitya
    //     }
    // });

    // loadingWindow.loadFile('./renderer/assets/html/loadingscreen.html').then(() => log.info("loading screen opened successfully"));

    urlWindow.hide();
    urlWindow.webContents.openDevTools();

     // Load the specified URL in the window, catch invalid url
    urlWindow.loadFile('./renderer/window-templates/scrape-window.html')
        .then(() => {
            urlWindow.webContents.send('setUrl', url);
            urlWindow.show();
            // loadingWindow.close();
            logInfo(`URL window loaded: ${url}`);
    }).catch((error) => {
            closeScrapeWindow();
            // loadingWindow.close()
            logError(`Failed to load URL: ${error}`);
            dialog.showErrorBox('Invalid URL', 'Cannot open URL: the URL you entered was invalid!');
    });

    // Prevent the window from navigating away from the original URL
    urlWindow.webContents.on('will-navigate', (event, navigateUrl) => {
        if (navigateUrl !== url) {
            event.preventDefault(); // Cancel any navigation to external URLs
            logWarn(`Navigation attempt to external URL blocked: ${navigateUrl}`);
        }
    });

    // Prevent the window from opening any new windows (e.g., pop-ups)
    urlWindow.webContents.setWindowOpenHandler(() => {
        logWarn('Attempt to open a new window was blocked.');
        return { action: 'deny' }; // Deny any requests to open new windows
    });
}

// When the application is ready, create the main window
app.whenReady().then(() => {
    createMainWindow();
    logInfo('Application is ready');

    // macOS specific behavior to recreate window when the dock icon is clicked
    app.on('activate', () => {
        logDebug('App activated.');
        // Only create a new window if none are open
        if (BrowserWindow.getAllWindows().length === 0) {
            logInfo('No windows open. Creating main window.');
            createMainWindow();
        }
    });
}).catch((error) => {
    logError(`Error during app startup: ${error}`);
});

// When all windows are closed, quit the app unless running on macOS
app.on('window-all-closed', () => {
    logInfo('All windows closed.');
    terminateApp();
});

// Listen for 'open-url' event from renderer to open a new window with the provided URL
ipcMain.on('open-url', (event, url) => {
    if (!urlWindow) {
        logDebug(`Received 'open-url' event for URL: ${url}`);
        try {
            createURLWindow(url);
        } catch (error) {
            // Log error if URL cannot be opened and notify the renderer process
            logError(`Error opening URL window: ${error.message}`);
            event.sender.send('open-url-error', error.message);
        }
    }
});

ipcMain.on('close-scrape-win', (event) => {
    closeScrapeWindow();
});

/**
 * Opens the LS project app in a separate window.
 * @param {*} url       The url of the LS project.
 */
function createLSExternal(url) {
    // Create the BrowserWindow instance with specific options
    lsWindow = new BrowserWindow({
        frame: false,
        width: 1400, // Set width of the LS window
        height: 1000, // Set height of the LS window
        minWidth: 1200, // Set minimum width to prevent shrinking beyond a set size
        minHeight: 800, // Set minimum height
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true
        }
    });

    // Disable the default application menu
    lsWindow.setMenu(null);

    lsWindow.webContents.openDevTools();

    try {
        lsWindow.loadFile('./renderer/window-templates/anno-window.html')
            .then(() => {
                lsWindow.webContents.send('set-ls-url', url);
                lsWindow.show();
            }).catch((err) => {
                closeLSWindow();
                logError('Failed to open external LS window');
                dialog.showErrorBox('Failed to open external LS window', 'Window Initialization Error');
            });

        lsWindow.on('close', () => {
            // tell renderer to redisplay embbedded content
            mainWin.webContents.send('open-ls-ext:response');
        });
    
        // Prevent the window from opening any new windows (e.g., pop-ups)
        lsWindow.webContents.setWindowOpenHandler(() => {
            return { action: 'deny' }; // Deny any requests to open new windows
        });
    } catch (err) {
        closeLSWindow();
    }
}

ipcMain.on('ext-ls-url-change', (event, url) => {
    mainWin.webContents.send('ls-navigation-update', url);
})

// Handles a close request for the external Label Studio Window
ipcMain.on('close-anno-win', (event) => {
    closeLSWindow();
});

// Handles exporting data to the linked LS project
ipcMain.on('export-to-ls:request', async (event, data, projectID) => {
    var jsonObj = JSON.parse(data);
    exportDataToLS(jsonObj, projectID).then((res) => {
        var response = JSON.stringify(res);
        mainWin.webContents.send('export-to-ls:response', response);
    });
});

// Handles openning the LS project in an external window
ipcMain.on('open-ls-ext:request', (event, url) => {
    createLSExternal(url);
});

// Handles updating the linked LS project URL
ipcMain.on('init-ls-vars:request', (event, url, token) => {
    updateLinkedLSProject(url);
    updateAPIToken(token)
        .then(result => {
            mainWin.webContents.send('ls-projects-update', JSON.stringify(result));
        }).catch(err => {
            console.log(err);
        }); 
});

// Handles updating the linked LS project URL
ipcMain.on('update-linked-ls:request', (event, url) => {
    updateLinkedLSProject(url);
});

// Handles updating the linked LS project API Token
ipcMain.on('update-ls-api-token:request', (event, token) => {
    updateAPIToken(token)
        .then(result => {
            mainWin.webContents.send('ls-projects-update', JSON.stringify(result));
        }).catch(err => {
            console.log(err);
        }); 
});

// Handles clearing the linked LS project (URL and API)
ipcMain.on('clear-linked-ls:request', () => {
    clearLinkedLSProject();
});

// Handles a scrape request
ipcMain.on('scrapedData:export', (event, data) => {
    console.log('Main process received scraped data:', data);

    if (mainWin) {
        mainWin.webContents.send('scrapedData:update', data);
        console.log('Forwarded scraped data to renderer.');
    } else {
        console.error('Main window is not available to forward scraped data.');
    }
});

// Handles closing the application
ipcMain.on('exit:request', () => {
    logInfo('Received exit request from renderer.');
    terminateApp();
});

async function sendNewLogsToRenderer() {
    var logList = await logReadQueue.getPendingLogs();

    if (logList.length > 0) {
        mainWin.webContents.send('update-to-logs', logList);
    }
}

function startLoggingInterval(timeInterval) {
    logIntervalUpdater = setInterval(sendNewLogsToRenderer, timeInterval);
}

function clearLogUpdateInterval() {
    clearInterval(logIntervalUpdater);
}

function initLogListener(logFilePath) {
    // File stream listener that watches for changes to log file and only sends the most recent line.
    tail = new Tail(logFilePath);
    tail.watch();
    tail.on('line', (data) => {
        logReadQueue.enqueue(formLogObject(data));
    });

    startLoggingInterval(10000)
}

function terminateLogListener() {
    if (tail) {
        tail.unwatch()
        tail = null;
    }

    clearLogUpdateInterval();
}

function closeScrapeWindow() {
    if (urlWindow) {
        urlWindow.close();
        urlWindow = null;
    }

    mainWin.webContents.send('ext-url-win-closed');
}

function closeLSWindow(url = null) {
    if (lsWindow) {
        lsWindow.close();
        lsWindow = null;
    }

    var urlToSend = url ? url !== null : '';

    // tell renderer to redisplay embbedded content
    mainWin.webContents.send('ext-ls-win-closed', url);
}

function closeAllWindows() {
    closeScrapeWindow();
    closeLSWindow();
}

function terminateApp() {
    logInfo('Terminating Application Processes');

    terminateLogListener();
    closeAllWindows();

    app.quit();
}

ipcMain.on('gen-dialog', (event, message) => {
    var json = JSON.parse(message);

    dialog.showMessageBox(json.msg);
});

ipcMain.on('err-dialog', (event, message) => {
    var json = JSON.parse(message);

    dialog.showErrorBox(json.errType, json.msg);
});




