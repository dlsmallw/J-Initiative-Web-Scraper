// main.js (ESM version)

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import log from 'electron-log'
import fs from 'fs'
import { Tail } from 'tail'
import { Mutex } from 'async-mutex'


// Local API file, also converted to ESM
import {
  exportDataToLS,
  updateLinkedLSProject,
  updateAPIToken,
  clearLinkedLSProject
} from './label-studio-api.js'

//====================================================================================
// Helper class for handling processing of Queued events.
//====================================================================================
class Queue {
  elements = {}
  headIdx = 0
  tailIdx = 0
  mutex = new Mutex()

  async enqueue(item) {
    await this.mutex.acquire().then(() => {
      let containsItem = false
      for (const elem in this.elements) {
        if (this.elements[elem] === item) {
          containsItem = true
          break
        }
      }
      if (!containsItem) {
        this.elements[this.tailIdx] = item
        this.tailIdx++
      }
      this.mutex.release()
    })
  }

  async peek() {
    let item
    await this.mutex.acquire().then(() => {
      item = this.elements[this.headIdx]
      this.mutex.release()
    })
    return item
  }

  hasElements() {
    return this.headIdx < this.tailIdx
  }

  dequeue() {
    const item = this.elements[this.headIdx]
    delete this.elements[this.headIdx]
    this.headIdx++
    return item
  }

  async getPendingLogs() {
    const logList = []
    await this.mutex.acquire().then(() => {
      while (this.hasElements()) {
        const item = this.dequeue()
        logList.push(item)
      }
      this.headIdx = 0
      this.tailIdx = 0
      this.mutex.release()
    })
    return logList
  }
}

//====================================================================================
// Variable Declarations
//====================================================================================
const isMac = process.platform === 'darwin'
const isDev = !app.isPackaged

let mainWin
let urlWindow, lsWindow
let tail

const logReadQueue = new Queue()
let logIntervalUpdater
let logListenerEnabled = true
const logFileMutex = new Mutex()

//====================================================================================
// Log-making functionality
//====================================================================================
function logInfo(msg) { writeNewLog(msg, 'info') }
function logDebug(msg) { writeNewLog(msg, 'debug') }
function logWarn(msg) { writeNewLog(msg, 'warn') }
function logError(msg) { writeNewLog(msg, 'error') }

function formLogObject(line) {
  const [rawDateTime, rawType] = line.match(/\[(.*?)\]/g)
  const [year, month, day] = rawDateTime.match(/\d{4}-\d{2}-\d{2}/)[0].split('-')
  const [hr, min, sec, millisec] = rawDateTime.match(/\b(\d{1,2}):(\d{2}):(\d{2})\.(\d{1,3})\b/).slice(1)

  const dateObj = new Date(year, month - 1, day, hr, min, sec, millisec)
  const type = rawType.replace(/[\[\]']+/g, '')
  const msg = line.substring(line.lastIndexOf(']') + 1).trim()
  const rawLogMsg = line

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
      case 'info':  log.info(line);  break
      case 'debug': log.debug(line); break
      case 'warn':  log.warn(line);  break
      case 'error': log.error(line); break
      default: break
    }
    logFileMutex.release()
  })
}

async function sendNewLogsToRenderer() {
  const logList = await logReadQueue.getPendingLogs()
  if (logList.length > 0) {
    mainWin.webContents.send('update-to-logs', logList)
  }
}

function startLoggingInterval(timeInterval) {
  logIntervalUpdater = setInterval(sendNewLogsToRenderer, timeInterval)
}

function clearLogUpdateInterval() {
  clearInterval(logIntervalUpdater)
}

function initLogListener(logFilePath) {
  tail = new Tail(logFilePath)
  tail.watch()
  tail.on('line', data => {
    logReadQueue.enqueue(formLogObject(data))
  })
}

function terminateLogListener() {
  if (tail) {
    tail.unwatch()
    tail = null
  }
}

//====================================================================================
// IPC for logs
//====================================================================================
ipcMain.on('log-info', (event, message) => { logInfo(`Renderer: ${message}`) })
ipcMain.on('log-debug', (event, message) => { logDebug(`Renderer: ${message}`) })
ipcMain.on('log-warn', (event, message) => { logWarn(`Renderer: ${message}`) })
ipcMain.on('log-error', (event, message) => { logError(`Renderer: ${message}`) })

ipcMain.handle('get-logs', async () => {
  const logFilePath = log.transports.file.getFile().path
  logDebug(`Log file path: ${logFilePath}`)

  const logArr = log.transports.file.readAllLogs(logFilePath)[0].lines
  let logData = []
  for (let i = 0; i < logArr.length; i++) {
    try {
      const line = logArr[i]
      if (line) {
        const logObj = formLogObject(line)
        logData.push(logObj)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const logList = await logReadQueue.getPendingLogs()
  if (logList.length > 0) {
    logData.concat(logList)
  }

  initLogListener(logFilePath.toString())
  startLoggingInterval(5000)

  return logData
})

ipcMain.on('logs:clear', event => {
  const logFilePath = log.transports.file.getFile().path
  try {
    terminateLogListener()
    fs.writeFileSync(logFilePath, '')
    initLogListener(logFilePath)
    log.info('Logs cleared successfully.')
    event.sender.send('logs:cleared')
  } catch (error) {
    log.error(`Error clearing log file: ${error}`)
    event.sender.send('logs:cleared-error', error.message)
  }
})

//====================================================================================
// Window creation methods
//====================================================================================
function createMainWindow() {
  logDebug('Creating main application window.');

  const preloadPath = isDev
    ? path.join(__dirname, '../preload/index.js')
    : path.join(__dirname, '../preload/index.js');

  mainWin = new BrowserWindow({
    frame: false,
    transparent: true,
    width: isDev ? 1400 : 1200,
    height: 800,
    minWidth: isDev ? 1400 : 1200,
    minHeight: 800,
    webPreferences: {
      preload: preloadPath,
      webviewTag: true
    }
  });

  logDebug('Main window created successfully.');

  if (isDev) {
    // Attempt to load Vite dev server
    logDebug('Running in development mode. Attempting to load Vite dev server...');
    mainWin.loadURL('http://localhost:5173/')
      .then(() => {
        logInfo('Successfully loaded Vite dev server.');
      })
      .catch((err) => {
        logError(`Failed to load dev server: ${err}`);
        logInfo('Falling back to the production build (local build)...');

        // Use the correct fallback path
        const fallbackPath = path.join(__dirname, '../../frontend/dist/index.html');
        logInfo(`Attempting to load fallback file from: ${fallbackPath}`);

        mainWin.loadFile(fallbackPath)
          .then(() => {
            logInfo('Fallback build loaded successfully.');
          })
          .catch((error) => {
            logError(`Failed to load fallback build: ${error}`);
          });
      });

    mainWin.webContents.openDevTools();
    logDebug('Developer tools opened.');
  } else {
    // Production build
    logDebug('Running in production mode. Loading local build...');

    const productionPath = path.join(__dirname, '../../frontend/dist/index.html');
    logDebug(`Attempting to load production build from: ${productionPath}`);

    mainWin.loadFile(productionPath)
      .then(() => {
        logInfo('Successfully loaded production build.');
      })
      .catch((error) => {
        logError(`Failed to load the production build: ${error}`);
      });
  }

  // Remove the default Electron menu for a cleaner UI
  mainWin.setMenu(null);
  logDebug('Application menu has been disabled.');
}



function createURLWindow(url) {
  try {
    new URL(url);
  } catch (err) {
    logError(`Invalid URL: ${url}`);
    return;
  }

  logDebug(`Creating URL window for: ${url}`);

  urlWindow = new BrowserWindow({
    frame: false,
    width: 1400,
    height: 1000,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    },
  });

  urlWindow.hide();

  if (isDev) {
    // DEV: Load the Vite dev server route
    urlWindow
      .loadURL(`http://localhost:5173/#/scrape-window`)
      .then(() => {
        // (Optional) pass the `url` to the renderer
        urlWindow.webContents.send('setUrl', url);
        urlWindow.show();
        logInfo(`URL window loaded in dev mode: ${url}`);
      })
      .catch((error) => {
        closeScrapeWindow();
        logError(`Failed to load dev URL: ${error}`);
        dialog.showErrorBox(
          'Invalid URL',
          'Cannot open URL in dev mode!'
        );
      });

    urlWindow.webContents.openDevTools();
  } else {
    // PROD: Load the built React app in /frontend/dist, with #/scrape-window
    const distPath = path.join(__dirname, '../frontend/dist', 'index.html');

    urlWindow
      .loadURL(`file://${distPath}#/scrape-window`)
      .then(() => {
        // (Optional) pass the `url` to the renderer
        urlWindow.webContents.send('setUrl', url);
        urlWindow.show();
        logInfo(`URL window loaded in production: ${url}`);
      })
      .catch((error) => {
        closeScrapeWindow();
        logError(`Failed to load URL: ${error}`);
        dialog.showErrorBox(
          'Invalid URL',
          'Cannot open URL in production!'
        );
      });
  }

  // Optional: Block navigation to external sites once loaded
  urlWindow.webContents.on('will-navigate', (event, navigateUrl) => {
    if (navigateUrl !== url) {
      event.preventDefault();
      logWarn(`Navigation attempt to external URL blocked: ${navigateUrl}`);
    }
  });

  // Optional: Block new windows
  urlWindow.webContents.setWindowOpenHandler(() => {
    logWarn('Attempt to open a new window was blocked.');
    return { action: 'deny' };
  });
}

function closeScrapeWindow() {
  if (urlWindow) {
    urlWindow.close();
    urlWindow = null;
  }
  mainWin.webContents.send('ext-url-win-closed'); // if you still want to notify the main window
}

module.exports = { createURLWindow, closeScrapeWindow };



function closeLSWindow(url = null) {
  if (lsWindow) {
    lsWindow.close()
    lsWindow = null
  }
  mainWin.webContents.send('ext-ls-win-closed', url)
}

function closeAllWindows() {
  closeScrapeWindow()
  closeLSWindow()
}

//====================================================================================
// IPC handlers for external windows
//====================================================================================
ipcMain.on('open-url', (event, url) => {
  if (!urlWindow) {
    logDebug(`Received 'open-url' event for URL: ${url}`)
    try {
      createURLWindow(url)
    } catch (error) {
      logError(`Error opening URL window: ${error.message}`)
      event.sender.send('open-url-error', error.message)
    }
  }
})

ipcMain.on('open-ls-ext:request', (event, url) => {
  createLSExternal(url)
})

ipcMain.on('close-scrape-win', event => {
  closeScrapeWindow()
})

ipcMain.on('ext-ls-url-change', (event, url) => {
  mainWin.webContents.send('ls-navigation-update', url)
})

ipcMain.on('close-anno-win', event => {
  closeLSWindow()
})

//====================================================================================
// Application Initialization/Termination
//====================================================================================
function terminateApp() {
  logInfo('Terminating Application Processes')
  terminateLogListener()
  clearLogUpdateInterval()
  closeAllWindows()
  app.quit()
}

app.whenReady().then(() => {
  createMainWindow()
  logInfo('Application is ready')

  app.on('activate', () => {
    logDebug('App activated.')
    if (BrowserWindow.getAllWindows().length === 0) {
      logInfo('No windows open. Creating main window.')
      createMainWindow()
    }
  })
}).catch(error => {
  logError(`Error during app startup: ${error}`)
})

app.on('window-all-closed', () => {
  logInfo('All windows closed.')
  terminateApp()
})

ipcMain.on('exit:request', () => {
  logInfo('Received exit request from renderer.')
  terminateApp()
})

//====================================================================================
// Additional IPC for Label Studio
//====================================================================================
ipcMain.on('export-to-ls:request', async (event, data, projectID) => {
  const jsonObj = JSON.parse(data)
  exportDataToLS(jsonObj, projectID).then(res => {
    const response = JSON.stringify(res)
    mainWin.webContents.send('export-to-ls:response', response)
  })
})

ipcMain.on('init-ls-vars:request', (event, url, token) => {
  updateLinkedLSProject(url)
  updateAPIToken(token)
    .then(result => {
      mainWin.webContents.send('ls-projects-update', JSON.stringify(result))
    })
    .catch(err => {
      console.log(err)
    })
})

ipcMain.on('update-linked-ls:request', (event, url) => {
  updateLinkedLSProject(url)
})

ipcMain.on('update-ls-api-token:request', (event, token) => {
  updateAPIToken(token)
    .then(result => {
      mainWin.webContents.send('ls-projects-update', JSON.stringify(result))
    })
    .catch(err => {
      console.log(err)
    })
})

ipcMain.on('clear-linked-ls:request', () => {
  const res = clearLinkedLSProject()
  mainWin.webContents.send('ls-projects-update', JSON.stringify(res))
})

//====================================================================================
// Scraping-related
//====================================================================================
ipcMain.on('scrapedData:export', (event, data) => {
  if (mainWin) {
    mainWin.webContents.send('scrapedData:update', data)
  } else {
    console.error('Main window is not available to forward scraped data.')
  }
})

//====================================================================================
// Dialog generation
//====================================================================================
ipcMain.on('gen-dialog', (event, message) => {
  const json = JSON.parse(message)
  dialog.showMessageBox({ message: json.msg })
})

ipcMain.on('err-dialog', (event, message) => {
  const json = JSON.parse(message)
  dialog.showErrorBox(json.errType, json.msg)
})
