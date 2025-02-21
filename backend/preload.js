// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// Optional arrays if you want to strictly validate which channels can be used
const validSendChannels = [
  'log-info',
  'log-debug',
  'log-warn',
  'log-error',
  'logs:clear',
  'export-to-ls:request',
  'open-ls-ext:request',
  'ext-ls-url-change',
  'close-anno-win',
  'init-ls-vars:request',
  'update-linked-ls:request',
  'update-ls-api-token:request',
  'clear-linked-ls:request',
  'open-scrape-window',      // For opening a separate scrape window
  'open-url',                // If you want to open external URLs from React
  'exit:request',
  'gen-dialog',
  'err-dialog',
];

const validReceiveChannels = [
  'update-to-logs',
  'logs:cleared',
  'logs:cleared-error',
  'export-to-ls:response',
  'set-ls-url',
  'ext-ls-win-closed',
  'ls-navigation-update',
  'ls-projects-update',
  'open-url-error',
  'ext-url-win-closed',
  'update-to-logs',
  // etc. Add any other channels the main process might send
];

// Expose a single "electronAPI" object
contextBridge.exposeInMainWorld('electronAPI', {

  // ----- Versions (like your old 'versions' object) -----
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },

  // ----- Logging Methods (like your old 'log' object) -----
  log: {
    info: (message) => {
      ipcRenderer.send('log-info', message);
    },
    debug: (message) => {
      ipcRenderer.send('log-debug', message);
    },
    warn: (message) => {
      ipcRenderer.send('log-warn', message);
    },
    error: (message) => {
      ipcRenderer.send('log-error', message);
    },
    requestLogs: () => ipcRenderer.invoke('get-logs'),

    logUpdate: (func) => {
      ipcRenderer.on('update-to-logs', (event, ...args) => func(...args));
    },
    clearLogs: () => {
      ipcRenderer.send('logs:clear');
    },
    logsClearedUpdate: (func) => {
      ipcRenderer.on('logs:cleared', (event, ...args) => func(...args));
    },
    logClearError: (func) => {
      ipcRenderer.on('logs:cleared-error', (event, ...args) => func(...args));
    },
  },

  // ----- Label Studio API (like your old 'lsAPI' object) -----
  lsAPI: {
    // Exporting scraped data to a linked LS project
    exportDataToLS: (data, projectID) => {
      ipcRenderer.send('export-to-ls:request', data, projectID);
    },
    onExportResponse: (func) => {
      ipcRenderer.on('export-to-ls:response', (event, ...args) => func(...args));
    },

    // External LS Window
    openExternal: (url) => {
      ipcRenderer.send('open-ls-ext:request', url);
    },
    setExtLSURL: (func) => {
      ipcRenderer.on('set-ls-url', (event, ...args) => func(...args));
    },
    extLSWinClosed: (func) => {
      ipcRenderer.on('ext-ls-win-closed', (event, ...args) => func(...args));
    },
    extLSURLChange: (url) => {
      ipcRenderer.send('ext-ls-url-change', url);
    },
    urlChange: (func) => {
      ipcRenderer.on('ls-navigation-update', (event, ...args) => func(...args));
    },
    sendCloseSignal: () => {
      ipcRenderer.send('close-anno-win');
    },

    // API calls to LS Linked App
    updateToProjectList: (func) => {
      ipcRenderer.on('ls-projects-update', (event, ...args) => func(...args));
    },

    // IPC Methods for updating info about linked LS app
    initVariables: (url, token) => {
      ipcRenderer.send('init-ls-vars:request', url, token);
    },
    updateURL: (url) => {
      ipcRenderer.send('update-linked-ls:request', url);
    },
    updateToken: (token) => {
      ipcRenderer.send('update-ls-api-token:request', token);
    },
    clearLinkedProject: () => {
      ipcRenderer.send('clear-linked-ls:request');
    },
  },

  // ----- Additional “universal” methods, e.g. openScrapeWindow, openURL, exit, dialogs, etc. -----
  send: (channel, data) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.warn(`Blocked sending on invalid channel: ${channel}`);
    }
  },
  receive: (channel, func) => {
    if (validReceiveChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      console.warn(`Blocked receiving on invalid channel: ${channel}`);
    }
  },

  // Direct method for opening a scrape window from React
  openScrapeWindow: (url) => {
    ipcRenderer.send('open-scrape-window', url);
  },

  // If you had an "open-url" style
  openExternalURL: (url) => {
    ipcRenderer.send('open-url', url);
  },
  openURLErr: async (func) => {
    ipcRenderer.on('open-url-error', (event, ...args) => func(...args));
  },
  onExtWindowClose: (func) => {
    ipcRenderer.on('ext-url-win-closed', (event, ...args) => func(...args));
  },

  sendCloseSignal: () => {
    ipcRenderer.send('close-scrape-win');
  },

  exitSignal: () => {
    ipcRenderer.send('exit:request');
  },

  // Dialog sub-object
  postDialog: {
    general: (message) => {
      ipcRenderer.send('gen-dialog', message);
    },
    error: (message) => {
      ipcRenderer.send('err-dialog', message);
    },
  },
});
