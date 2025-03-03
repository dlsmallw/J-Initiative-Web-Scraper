/**
 * main.js: This file will be used as the primary entry point for the application.
 */

//====================================================================================
// Import necessary modules from Electron and Node.js
//====================================================================================
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const log = require('electron-log');
const fs = require('fs');
const { Tail } = require('tail');
const { Mutex } = require('async-mutex');

// API Imports
const { exportDataToLS, updateLinkedLSProject, updateAPIToken, clearLinkedLSProject } = require('./js/label-studio-api.js');

// Firebase Imports
const { collection, getDocs, getFirestore, doc, getDoc, updateDoc, setDoc, arrayUnion} = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const firebaseConfig = {
  apiKey: "AIzaSyAhqRcDSUGoTiEka890A53u7cjS0J1IH48",
  authDomain: "ser-401-group8-firebase.firebaseapp.com",
  projectId: "ser-401-group8-firebase",
  storageBucket: "ser-401-group8-firebase.firebasestorage.app",
  messagingSenderId: "346387119771",
  appId: "1:346387119771:web:71d09aec636a6b1c06503e",
  measurementId: "G-QX3095X9GX"
};

// Initialize Firebase
const dbapp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(dbapp);

//====================================================================================
// Helper class for handling processing of Queued events.
//====================================================================================
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
            let containsItem = false;

            for (let elem in this.elements) {
                if (this.elements[elem] === item) {
                    containsItem = true;
                    break;
                }
            }

            if (!containsItem) {
                this.elements[this.tailIdx] = item
                this.tailIdx++
            }

            this.mutex.release();
        });
    }

    /**
     * Peeks the head of the Queue/
     * @returns         The head element of the Queue.
     */
    async peek() {
        let item;

        await this.mutex.acquire().then(() => {
            item = this.elements[this.headIdx];

            this.mutex.release();
        });

        return item;
    }

    /**
     * Checks if the Queue has elements
     * @returns         A boolean indicating if the queue has elements.
     */
    hasElements() {
        return this.headIdx < this.tailIdx;
    }

    /**
     * Method that removes the head-most element from the queue.
     * @returns         The removed item.
     */
    dequeue() {
        let item = this.elements[this.headIdx];
        delete this.elements[this.headIdx];
        this.headIdx++;

        return item;
    }

    /**
     * Returns a list of the pending logs.
     * @returns         A list.
     */
    async getPendingLogs() {
        let logList = [];

        await this.mutex.acquire().then(() => {
            while (this.hasElements()) {
                let item = this.dequeue();
                logList.push(item);
            }

            this.headIdx = 0;
            this.tailIdx = 0;

            this.mutex.release();
        });

        return logList;
    }
}

//====================================================================================
// Variable Declarations
//====================================================================================

// Useful variables for app initialization
const isMac = process.platform === 'darwin';    // Determine if the operating system is macOS
const isDev = !app.isPackaged;                  // Determine if we are in development mode or production mode

// Reference for the main application window
let mainWin;
let urlWindow, lsWindow;
let tail;

let logReadQueue = new Queue();
let logIntervalUpdater;
let logListenerEnabled = true;

const logFileMutex = new Mutex();

//====================================================================================
// Log-making functionality and listeners
//====================================================================================

// Log Functions
//####################################################################################

/**
 * Makes an info log entry.
 * @param {*} log       The log entry.
 */
function logInfo(log) {
    writeNewLog(log, 'info');
}

/**
 * Makes an debug log entry.
 * @param {*} log       The log entry.
 */
function logDebug(log) {
    writeNewLog(log, 'debug');
}

/**
 * Makes a warn log entry.
 * @param {*} log       The log entry.
 */
function logWarn(log) {
    writeNewLog(log, 'warn');
}

/**
 * Makes an error log entry.
 * @param {*} log       The log entry.
 */
function logError(log) {
    writeNewLog(log, 'error');
}

/**
 * Forms a JSON log object for managing log-related info.
 * @param {*} line          The log entry.
 * @returns                 The JSON log object.
 */
function formLogObject(line) {
    let [rawDateTime, rawType] = line.match(/\[(.*?)\]/g);

    let [year, month, day] = rawDateTime.match(/\d{4}-\d{2}-\d{2}/)[0].split('-');
    let [hr, min, sec, millisec] = rawDateTime.match(/\b(\d{1,2}):(\d{2}):(\d{2})\.(\d{1,3})\b/).slice(1);
   
    let dateObj = new Date(year, month - 1, day, hr, min, sec, millisec);
    let type = rawType.replace(/[\[\]']+/g, '');
    let msg = line.substring(line.lastIndexOf(']') + 1).trim();
    let rawLogMsg = line;

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

/**
 * Facilitates writing a new log to the log file.
 * @param {*} line          The log entry.
 * @param {*} type          The log type.
 */
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
 * Function that sends the current queue of logs to be read to the renderer.
 */
async function sendNewLogsToRenderer() {
    let logList = await logReadQueue.getPendingLogs();

    if (logList.length > 0) {
        mainWin.webContents.send('update-to-logs', logList);
    }
}

/**
 * Function that handles sending the renderer the new logs on a set periodicity.
 * @param {*} timeInterval          The desired periodicity.
 */
function startLoggingInterval(timeInterval) {
    logIntervalUpdater = setInterval(sendNewLogsToRenderer, timeInterval);
}

/**
 * Function for clearing the log update interval.
 */
function clearLogUpdateInterval() {
    clearInterval(logIntervalUpdater);
}

/**
 * Initializes the log file listener for detecting new log entries.
 * @param {*} logFilePath           The log file path. 
 */
function initLogListener(logFilePath) {
    // File stream listener that watches for changes to log file and only sends the most recent line.
    tail = new Tail(logFilePath);
    tail.watch();

    tail.on('line', (data) => {
        logReadQueue.enqueue(formLogObject(data));
    });
}

/**
 * Function for terminating the log file listener.
 */
function terminateLogListener() {
    if (tail) {
        tail.unwatch()
        tail = null;
    }
}

// function enableLogger() {
//     loggerEnabled = true;
// }

// function disableLogger() {
//     loggerEnabled = false;
// }

// Log Listeners
//####################################################################################

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
    let logFilePath = log.transports.file.getFile().path;
    logDebug(`Log file path: ${logFilePath}`);

    let logArr = log.transports.file.readAllLogs(logFilePath)[0].lines
    let logData = [];

    for (let i = 0; i < logArr.length; i++) {
        try {
            let line = logArr[i];

            if (line !== null && line !== '') {
                let logObj = formLogObject(line);
                logData.push(logObj);
            }
        } catch (err) {
            console.log(err);
        }
    }

    let logList = await logReadQueue.getPendingLogs();

    if (logList.length > 0) {
        logData.concat(logList);
    }

    initLogListener(logFilePath.toString());
    startLoggingInterval(5000);

    return logData;
});

ipcMain.on('logs:clear', (event) => {
    const logFilePath = log.transports.file.getFile().path;
    try {
        terminateLogListener();
        fs.writeFileSync(logFilePath, ''); // Overwrite the log file with an empty string
        initLogListener(logFilePath);

        log.info('Logs cleared successfully.');
        event.sender.send('logs:cleared'); // Notify renderer process that logs were cleared
    } catch (error) {
        log.error(`Error clearing log file: ${error}`);
        event.sender.send('logs:cleared-error', error.message); // Notify renderer process of the error
    }
});

//====================================================================================
// adding websites to database page methods
//====================================================================================

ipcMain.handle('get-websites', async () => {
  let websiteData = '';
  try {
    const docRef = doc(db, "Websites", "Website List");
    const docSnap = await getDoc(docRef);
    const documentData = docSnap.data();
    const websiteList = documentData.List;
    websiteList.forEach(website => {
      websiteData += website + '\n';
    });
    return websiteData;
  } catch (error) {
    return ''; // Return empty string on error
  }
});

ipcMain.handle('get-websites-entries', async (event, url) => {
  let entries = '';
  try {
    const docRef = doc(db, "Websites", url);
    const docSnap = await getDoc(docRef);
    const documentData = docSnap.data();
    const entryList = documentData.Entries;
    entryList.forEach(entry => {
      entries += entry + '\n';
    });
    return entries;
  } catch (error) {
    return ''; // Return empty string on error
  }
});


ipcMain.handle('add-website', async (event, url) => {
//adding website to database
  const encodedURL = encodeURIComponent(url);
  let docRef = doc(db, "Websites", "Website List");
  await updateDoc(docRef, {
    List: arrayUnion(encodedURL)
}).then(r => log.info(`website added to website list: ${encodedURL}`));
  docRef = doc(db, "Websites", encodedURL);
  log.info('creating doc: ' + encodedURL);
  await setDoc(docRef, {
    website_url: encodedURL
  }, { merge: true });

});

ipcMain.handle('add-scraped-data', async (event, data) => {
for (let i = 0; i < data.length; i++) {
  const entry = data[i];
  const url = entry.url;
  const scrapedData = entry.data;
  const encodedURL = encodeURIComponent(url);
  const docRef = doc(db, "Websites", encodedURL);
  updateDoc(docRef, {
    Entries: arrayUnion(scrapedData)
  }).then(r => log.info(`entry "${scrapedData}" added to website: ${encodedURL}`));

}
});




//====================================================================================
// Window creation methods
//====================================================================================

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

    urlWindow.webContents.openDevTools();
    urlWindow.hide();

    // Load the specified URL in the window, catch invalid url
    urlWindow.loadFile('./renderer/window-templates/scrape-window.html')
        .then(() => {
            urlWindow.webContents.send('setUrl', url);
            urlWindow.show();
            logInfo(`URL window loaded: ${url}`);
    }).catch((error) => {
            closeScrapeWindow();
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

    urlWindow.webContents.focus()
}

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

    // lsWindow.webContents.openDevTools();

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
            // tell renderer to redisplay embedded content
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

/**
 * Handles closing the external scrape window if it exists.
 */
function closeScrapeWindow() {
    if (urlWindow) {
        urlWindow.close();
        urlWindow = null;
    }

    mainWin.webContents.send('ext-url-win-closed');
}

/**
 * Handles closing the external LS window if it exists.
 * @param {*} url           The URL of the LS window prior to closing.
 */
function closeLSWindow(url = null) {
    if (lsWindow) {
        lsWindow.close();
        lsWindow = null;
    }

    let urlToSend = url ? true : '';

    // tell renderer to redisplay embedded content
    mainWin.webContents.send('ext-ls-win-closed', url);
}

/**
 * Method for closing all external windows.
 */
function closeAllWindows() {
    closeScrapeWindow();
    closeLSWindow();
}

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

// Handles opening the LS project in an external window
ipcMain.on('open-ls-ext:request', (event, url) => {
    createLSExternal(url);
});

ipcMain.on('close-scrape-win', (event) => {
    closeScrapeWindow();
});

ipcMain.on('ext-ls-url-change', (event, url) => {
    mainWin.webContents.send('ls-navigation-update', url);
});

// Handles a close request for the external Label Studio Window
ipcMain.on('close-anno-win', (event) => {
    closeLSWindow();
});

//====================================================================================
// Application Initialization/Termination Functions and Listeners
//====================================================================================

/**
 * Method that handles termination of any processes prior to closing the application.
 */
function terminateApp() {
    logInfo('Terminating Application Processes');

    terminateLogListener();
    clearLogUpdateInterval();
    closeAllWindows();

    app.quit();
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

// Handles closing the application
ipcMain.on('exit:request', () => {
    logInfo('Received exit request from renderer.');
    terminateApp();
});

//====================================================================================
// Additional IPC channel listeners
//====================================================================================

// Label Studio related listeners
//####################################################################################

// Handles exporting data to the linked LS project
ipcMain.on('export-to-ls:request', async (event, data, projectID) => {
    let jsonObj = JSON.parse(data);
    exportDataToLS(jsonObj, projectID).then((res) => {
        let response = JSON.stringify(res);
        mainWin.webContents.send('export-to-ls:response', response);
    });
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
    let res = clearLinkedLSProject();
    mainWin.webContents.send('ls-projects-update', JSON.stringify(res));
});

// Scraping related listeners
//####################################################################################

// Handles a scrape request
ipcMain.on('scrapedData:export', (event, data) => {
    if (mainWin) {
        mainWin.webContents.send('scrapedData:update', data);
    } else {
        console.error('Main window is not available to forward scraped data.');
    }
});

// Dialog window generation listeners
//####################################################################################

ipcMain.on('gen-dialog', (event, message) => {
    let json = JSON.parse(message);
    dialog.showMessageBox({message: json.msg});
});

ipcMain.on('err-dialog', (event, message) => {
    let json = JSON.parse(message);
    dialog.showErrorBox(json.errType, json.msg);
});
