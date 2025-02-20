import React, { useEffect, useRef, useState } from 'react'
// If you still want jQuery:
//import $ from 'jquery'

// If you are using Bootstrap in React, you typically do:
import 'bootstrap/dist/css/bootstrap.css'
// Then also import your custom styles
//import '../css/style.css'

// We'll assume `window.urlScrape` is your preload-based IPC object, as in the old code:
const ipcRenderer = window?.urlScrape

// This is the React component that replaces "scrape-window.html"
export default function ScrapeWindow() {
  const webviewRef = useRef(null)

  // Track whether we have a valid webview script:
  const [initialized, setInitialized] = useState(false)

  // ### 1) Setup your "preload" or "ipc-message" logic for <webview>
  useEffect(() => {
    const webview = webviewRef.current
    if (!webview) return

    // On DOMContentLoaded of the webview itself:
    // In a typical scenario, you might do:
    //   webview.addEventListener('dom-ready', ...)
    // but your existing code in `scrape-webview-preload.js` also runs in the webview's context.

    // Listen for messages from the webview (like your old "ipc-message" event)
    const handleIpcMessage = (event) => {
      const channel = event.channel
      const data = event.args[0]
      switch (channel) {
        case 'selection':
          appendNewScrapedItem(JSON.parse(data))
          break
        case 'export':
          exportDataToApp(/* data? */)
          break
        case 'enable-import':
          enableImportBtn()
          break
        case 'disable-import':
          disableImportBtn()
          break
        default:
          console.log('Unhandled ipc-message:', channel, data)
      }
    }

    webview.addEventListener('ipc-message', handleIpcMessage)

    // Cleanup
    return () => {
      webview.removeEventListener('ipc-message', handleIpcMessage)
    }
  }, [])

  // ### 2) Move your old "init" logic from webview_renderer.js into useEffect
  useEffect(() => {
    if (!ipcRenderer) return

    // (A) The "DOMContentLoaded" logic from your old file:
    // Instead of listening for DOMContentLoaded, we can just run it once here.
    initTheme()
    initDataContainer()
    initWinListeners()
    initScrapeUtilListeners()

    setInitialized(true)
  }, [])

  // ### 3) Minimally replicate your jQuery-based logic:
  function initTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.documentElement.className = savedTheme
    } else {
      document.documentElement.className = 'light-theme'
    }
  }

  function initDataContainer() {
    $('#data-container').hide()
    $('#clear-sel-btn').hide()

    $('#clear-sel-btn').on('click', () => {
      removeSelectedItems()
    })

    $('#clear-all-btn').on('click', () => {
      clearScrapedList()
    })
  }

  function initWinListeners() {
    $('#exit-scrape-win-btn').on('click', () => {
      // old code was: ipcRenderer.sendCloseSignal()
      // or so:
      ipcRenderer?.sendCloseSignal()
    })
  }

  function initScrapeUtilListeners() {
    // Listen for 'setUrl' from main process
    ipcRenderer?.receive('setUrl', (url) => {
      // Set the webview's src
      $('#webview-element').attr('src', url)
    })

    // Import selected text from the webview
    $('#importSelectedBtn').on('click', () => {
      webviewRef.current?.send('getSelected')
    })

    // Export data from data container
    $('#exportBtn').on('click', () => {
      const dataToExport = getAllReadyData()
      exportDataToApp(JSON.stringify(dataToExport))
    })
  }

  // ### 4) Migrate your jQuery-based functions (appendNewScrapedItem, etc.)
  function appendNewScrapedItem(dataObj) {
    const $newLI = $('<a>', {
      href: '#',
      class: 'list-group-item list-group-item-action scrape-item',
      style: 'border-width: 0px 0px 3px 0px;',
      text: dataObj.data
    }).attr('data-url', dataObj.url)

    $newLI.on('click', () => {
      if ($newLI.hasClass('active')) {
        $newLI.removeClass('active')
        if (!checkIfAnyActive()) {
          $('#clear-sel-btn').hide()
        }
      } else {
        $newLI.addClass('active')
        $('#clear-sel-btn').show()
      }
    })

    $('#data-list').append($newLI)
    $('#data-container').show()
  }

  function removeSelectedItems() {
    $('.active').remove()
    if (!checkIfAnyActive()) {
      $('#clear-sel-btn').hide()
    }

    if ($('#data-list').children().length === 0) {
      $('#data-container').hide()
      $('#clear-sel-btn').hide()
    }
  }

  function clearScrapedList() {
    $('#data-list').empty()
    $('#data-container').hide()
    $('#clear-sel-btn').hide()
  }

  function checkIfAnyActive() {
    return $('#data-list').children('.active').length > 0
  }

  function getAllReadyData() {
    const scrapedData = []
    const elemArr = $('.scrape-item')
    for (let i = 0; i < elemArr.length; i++) {
      const dataURL = $(elemArr[i]).attr('data-url')
      const textData = $(elemArr[i]).text()
      scrapedData.push({
        url: dataURL,
        data: textData
      })
    }
    return scrapedData
  }

  function enableImportBtn() {
    $('#importSelectedBtn').prop('disabled', false)
  }

  function disableImportBtn() {
    $('#importSelectedBtn').prop('disabled', true)
  }

  function exportDataToApp(data) {
    if (data) {
      // old code: ipcRenderer.send('scrapedData:export', data)
      ipcRenderer?.send('scrapedData:export', data)
      // closes the window
      ipcRenderer?.sendCloseSignal()
    } else {
      alert('No data to export!')
    }
  }

  // ### 5) Return your UI
  // This replicates your old .html structure, but as JSX:
  // (You might prefer to rewrite it in a more "React-like" style.)
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top draggable">
        <span className="navbar-brand mb-0 h1">Web Scraper</span>
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto mb-0 not-draggable" id="navbar-ul-2">
            <li className="nav-item">
              <button
                className="nav-link"
                id="exit-scrape-win-btn"
              >
                Close Window
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div id="content-container">
        <div id="webview-container">
          <webview
            id="webview-element"
            ref={webviewRef}
            preload="./js/scrape-webview-preload.js" // If you still have a separate webview preload
          />
        </div>

        <div id="selected-data-container">
          <div className="action-buttons mt-3" id="import-btn-container">
            <button
              className="btn btn-secondary border border-secondary"
              type="button"
              id="importSelectedBtn"
              disabled
            >
              Import Selected Data
            </button>
          </div>

          <div id="data-container">
            <div id="data-list-header" className="list-header">
              <div id="lbl-container" className="hdr-lbl-container">
                <span id="data-list-lbl" className="hdr-lbl">
                  Scraped Data
                </span>
              </div>
              <div id="data-list-btns" className="list-btn-container">
                <div>
                  <button
                    id="clear-all-btn"
                    type="button"
                    className="btn btn-secondary border border-secondary scrape-data-btn"
                  >
                    Clear All
                  </button>
                  <button
                    id="clear-sel-btn"
                    type="button"
                    className="btn btn-secondary border border-secondary scrape-data-btn"
                  >
                    Clear Selected
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-secondary border border-secondary"
                    type="button"
                    id="exportBtn"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div
              id="data-list"
              className="list-group list-group-flush overflow-auto scraped-list"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


