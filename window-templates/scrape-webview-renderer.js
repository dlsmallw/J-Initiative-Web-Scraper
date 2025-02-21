// scrape-webview-renderer.js
// Runs in the same context as "scrape-window.html" (the host),
// NOT inside the <webview> itself. It interacts with window.urlScrape.

const { on, emit, sendCloseSignal } = window.urlScrape || {};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDataContainer();
  initWinListeners();
  initScrapeUtilListeners();
});

/**
 * Initializes the theme for the window.
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.className = savedTheme;
  } else {
    document.documentElement.className = 'light-theme';
  }
}

/**
 * Sets up window listeners for top-bar actions (Close Window, etc.).
 */
function initWinListeners() {
  const exitBtn = document.getElementById('exit-scrape-win-btn');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      // Closes the window via main process
      if (typeof sendCloseSignal === 'function') {
        sendCloseSignal();
      }
    });
  }
}

/**
 * Sets up scraping-related listeners (URL events, buttons, etc.).
 */
function initScrapeUtilListeners() {
  // 1. Listen for 'setUrl' from main process (use 'on' from contextBridge)
  if (typeof on === 'function') {
    on('setUrl', (url) => {
      const webview = document.getElementById('webview-element');
      if (webview) {
        webview.setAttribute('src', url);
      }
    });
  }

  // 2. "Import Selected" button
  const importSelectedBtn = document.getElementById('importSelectedBtn');
  if (importSelectedBtn) {
    importSelectedBtn.addEventListener('click', () => {
      const webview = document.getElementById('webview-element');
      if (webview && typeof webview.send === 'function') {
        // Tells the webview's preload script to handle 'getSelected'
        webview.send('getSelected');
      }
    });
  }

  // 3. Listen for messages from the <webview>
  const webviewElement = document.getElementById('webview-element');
  if (webviewElement) {
    // The <webview> uses an event 'ipc-message' for sendToHost
    webviewElement.addEventListener('ipc-message', (event) => {
      const { channel } = event;
      const data = event.args[0]; // If any arguments

      switch (channel) {
        case 'selection':
          // data is a JSON string => { url, data }
          const res = JSON.parse(data);
          appendNewScrapedItem(res);
          break;
        case 'export':
          // Possibly call exportDataToApp if needed
          exportDataToApp(exportData);
          break;
        case 'enable-import':
          enableImportBtn();
          break;
        case 'disable-import':
          disableImportBtn();
          break;
        default:
          console.warn('Unhandled ipc-message channel:', channel);
      }
    });
  }

  // 4. "Export" button
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataToExport = getAllReadyData();
      exportDataToApp(JSON.stringify(dataToExport));
    });
  }
}

/**
 * Manages the data container UI (e.g., show/hide, clearing, etc.).
 */
function initDataContainer() {
  $('#data-container').hide();
  $('#clear-sel-btn').hide();

  $('#clear-sel-btn').on('click', removeSelectedItems);
  $('#clear-all-btn').on('click', clearScrapedList);
}

/**
 * Appends a new data item (URL + text) to the list.
 */
function appendNewScrapedItem(dataObj) {
  const $newLI = $('<a>', {
    href: '#',
    class: 'list-group-item list-group-item-action scrape-item',
    style: 'border-width: 0px 0px 3px 0px;'
  });

  $newLI.text(dataObj.data);
  $newLI.attr('data-url', dataObj.url);

  $newLI.on('click', () => {
    if ($newLI.hasClass('active')) {
      $newLI.removeClass('active');
      if (!checkIfAnyActive()) {
        $('#clear-sel-btn').hide();
      }
    } else {
      $newLI.addClass('active');
      $('#clear-sel-btn').show();
    }
  });

  $('#data-list').append($newLI);
  $('#data-container').show();
}

/**
 * Removes selected items (active) from the list.
 */
function removeSelectedItems() {
  $('.active').remove();
  if (!checkIfAnyActive()) {
    $('#clear-sel-btn').hide();
  }
  if ($('#data-list').children().length === 0) {
    $('#data-container').hide();
    $('#clear-sel-btn').hide();
  }
}

/**
 * Clears all items from the list.
 */
function clearScrapedList() {
  $('#data-list').empty();
  $('#data-container').hide();
  $('#clear-sel-btn').hide();
}

/**
 * Checks if any items are currently active (selected).
 */
function checkIfAnyActive() {
  return $('#data-list').children('.active').length > 0;
}

/**
 * Gather all data in the list for exporting.
 */
function getAllReadyData() {
  const scrapedData = [];
  const elemArr = $('.scrape-item');

  for (let i = 0; i < elemArr.length; i++) {
    const dataURL = $(elemArr[i]).attr('data-url');
    const textData = $(elemArr[i]).text();
    scrapedData.push({ url: dataURL, data: textData });
  }
  return scrapedData;
}

/**
 * Enables the "Import Selected" button.
 */
function enableImportBtn() {
  $('#importSelectedBtn').prop('disabled', false);
}

/**
 * Disables the "Import Selected" button.
 */
function disableImportBtn() {
  $('#importSelectedBtn').prop('disabled', true);
}

/**
 * Sends final scraped data to the main process, then closes the window.
 */
function exportDataToApp(data) {
  if (data) {
    // Send 'scrapedData:export' to main
    if (typeof emit === 'function') {
      emit('scrapedData:export', data);
    }
    // Or if you prefer the older style:
    // ipcRenderer.send('scrapedData:export', data);

    // Then close the scrape window
    if (typeof sendCloseSignal === 'function') {
      sendCloseSignal();
    }
  } else {
    alert('No data to export!');
  }
}
