// scrape-webview-preload.js
const { contextBridge, ipcRenderer } = require('electron');

// A small delay utility
const delay = (timeDelay) => new Promise(resolve => setTimeout(resolve, timeDelay));

// Expose an API to the "host" (i.e. the code in scrape-webview-renderer.js)
contextBridge.exposeInMainWorld('urlScrape', {
  // Equivalent to a custom “receive” – if you want to listen for, e.g., 'setUrl' in the webview
  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },

  // Equivalent to "send" to the main process
  emit: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  // For scenario: close-scrape-win
  sendCloseSignal: () => {
    ipcRenderer.send('close-scrape-win');
  }
});

// This script runs **inside** the <webview> context
document.addEventListener('DOMContentLoaded', () => {
  initMouseEventListeners();

  // If the host calls webview.send('getSelected'), we catch it here
  ipcRenderer.on('getSelected', function () {
    const jsonObj = {
      url: window.location.href.toString(),
      data: getSelectedText(),
    };
    // Send the selected text back to the host script
    ipcRenderer.sendToHost('selection', JSON.stringify(jsonObj));
  });
});

/**
 * Function to get the currently selected text in the webview
 * @returns {string} - The current selection
 */
function getSelectedText() {
  return window.getSelection().toString().trim();
}

/**
 * Checks if user has text selected and either enables or disables the import button
 * by sending a message (enable-import / disable-import) to the host script.
 */
function selectedTextCheck() {
  if (getSelectedText() !== '') {
    ipcRenderer.sendToHost('enable-import');
  } else {
    ipcRenderer.sendToHost('disable-import');
  }
}

/**
 * Sets up listeners to track text selection
 */
function initMouseEventListeners() {
  document.addEventListener('mousemove', () => {
    selectedTextCheck();
  });
  document.addEventListener('mouseup', async () => {
    await delay(50);
    selectedTextCheck();
  });
  document.addEventListener('mousedown', async () => {
    await delay(50);
    selectedTextCheck();
  });
}
