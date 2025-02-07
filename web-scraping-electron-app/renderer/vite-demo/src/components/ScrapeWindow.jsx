import React, { useEffect, useRef, useState } from "react";
import { ipcRenderer } from "electron";

export default function ScrapeWindow() {
  const webviewRef = useRef(null);
  const [preloadPath, setPreloadPath] = useState("");

  useEffect(() => {

    ipcRenderer.invoke("get-preload-path").then((path) => {
      console.log("Preload Path Received:", path);
      setPreloadPath(path);
    });

    const webview = webviewRef.current;
    if (!webview) return;

    // ✅ Listen for messages from the webview
    webview.addEventListener("ipc-message", (event) => {
      const { channel, args } = event;

      if (channel === "selection") {
        const res = JSON.parse(args[0]);
        appendNewScrapedItem(res);
      } else if (channel === "enable-import") {
        enableImportBtn();
      } else if (channel === "disable-import") {
        disableImportBtn();
      }
    });

    // ✅ Set URL dynamically from IPC
    ipcRenderer.on("setUrl", (_, url) => {
      webview.src = url;
    });

    return () => {
      ipcRenderer.removeAllListeners("setUrl");
    };
  }, []);

  return (
    <div className="scrape-window">
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top draggable">
        <span className="navbar-brand mb-0 h1">Web Scraper</span>
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto mb-0 not-draggable">
            <li className="nav-item">
              <button
                className="nav-link"
                id="exit-scrape-win-btn"
                onClick={() => ipcRenderer.send("close-scrape-win")}
              >
                Close Window
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Webview */}
      <div id="content-container">
        <div id="webview-container">
          {preloadPath && (
            <webview
              id="webview-element"
              ref={webviewRef}
              preload={preloadPath} // ✅ Dynamically set preload path
            />
          )}
        </div>

        {/* Data Section */}
        <div id="selected-data-container">
          <div className="action-buttons mt-3">
            <button
              className="btn btn-secondary border border-secondary"
              type="button"
              id="importSelectedBtn"
              disabled
              onClick={() => webviewRef.current?.send("getSelected")}
            >
              Import Selected Data
            </button>
          </div>

          <div id="data-container">
            <div id="data-list-header" className="list-header">
              <div id="lbl-container" className="hdr-lbl-container">
                <span id="data-list-lbl" className="hdr-lbl">Scraped Data</span>
              </div>
              <div id="data-list-btns" className="list-btn-container">
                <button
                  id="clear-all-btn"
                  type="button"
                  className="btn btn-secondary border border-secondary"
                  onClick={clearScrapedList}
                >
                  Clear All
                </button>
                <button
                  id="clear-sel-btn"
                  type="button"
                  className="btn btn-secondary border border-secondary"
                  onClick={removeSelectedItems}
                  style={{ display: "none" }}
                >
                  Clear Selected
                </button>
                <button
                  className="btn btn-secondary border border-secondary"
                  type="button"
                  id="exportBtn"
                  onClick={() =>
                    exportDataToApp(JSON.stringify(getAllReadyData()))
                  }
                >
                  Export
                </button>
              </div>
            </div>
            <div id="data-list" className="list-group list-group-flush overflow-auto scraped-list"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

