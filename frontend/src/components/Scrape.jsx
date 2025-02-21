import React, { useState, useEffect } from 'react';

const Scrape = () => {
  // ----- Component State -----
  // false: URL mode (default); true: Manual mode.
  const [isManualMode, setIsManualMode] = useState(false);
  // URL input field value (for URL mode)
  const [urlInput, setUrlInput] = useState('');
  // Data items scraped (each item: { url, data, selected })
  const [scrapedItems, setScrapedItems] = useState([]);
  // Whether the scraped results container is visible
  const [resultsVisible, setResultsVisible] = useState(false);
  // Project selection for URL mode
  const [projectSelectUrl, setProjectSelectUrl] = useState('');
  // Project selection for Manual mode
  const [projectSelectMan, setProjectSelectMan] = useState('');
  // Manual data entry value (for Manual mode)
  const [manualData, setManualData] = useState('');
  // Flag for export process (disable fields during export if desired)
  const [isExporting, setIsExporting] = useState(false);

  // ----- Mode Toggle Handler -----
  const toggleMode = () => {
    setIsManualMode(prev => !prev);
  };

  // ----- URL Validation & Submit Handler -----
  const handleUrlSubmit = async () => {
    let url = urlInput.trim();
    if (!url) {
      alert('Please enter a URL');
      return;
    }
    // Prepend "https://" if missing
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    const isValid = await checkURL(url);
    if (!isValid) {
      alert('Please enter a valid URL');
      return;
    }
    // Call Electron’s openExternal if available
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    }
    // (Optional) You might want to store the URL elsewhere or update state
  };

  // Validate URL by attempting to GET it
  const checkURL = (url) => {
    return new Promise((resolve) => {
      try {
        const urlObj = new URL(url);
        if (urlObj.protocol !== "https:") {
          resolve(false);
          return;
        }
        const req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            resolve(req.status !== 404);
          }
        };
        req.send();
      } catch (e) {
        resolve(false);
      }
    });
  };

  // ----- Export Handlers -----
  // Common export function that formats data and calls the API
  const exportData = (dataArr, projID) => {
    setIsExporting(true);
    if (dataArr && dataArr.length > 0) {
      const lsFormattedArr = dataArr.map(item => ({ textData: item.data }));
      // If needed, you can also format data for the database:
      // const dbFormattedArr = dataArr.map(item => ({ url: item.url, textData: item.data }));
      if (window.lsAPI?.exportDataToLS) {
        window.lsAPI.exportDataToLS(JSON.stringify(lsFormattedArr), projID);
      }
    } else {
      alert('No Data to Export');
    }
  };

  // Called when the Export button in URL mode is pressed
  const handleExportUrl = () => {
    if (scrapedItems.length === 0) {
      alert('No Data to Export');
      return;
    }
    exportData(scrapedItems, projectSelectUrl);
  };

  // Called when the Export button in Manual mode is pressed
  const handleExportManual = () => {
    if (manualData.trim() === '') {
      alert('Data Field Cannot Be Empty!');
      return;
    }
    const data = [{ url: null, data: manualData }];
    exportData(data, projectSelectMan);
  };

  // ----- Scraped Items Handlers -----
  // Toggle “selected” state for an item in the scraped list
  const toggleScrapedItem = (index) => {
    setScrapedItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].selected = !newItems[index].selected;
      return newItems;
    });
  };

  // Remove all items that are currently selected
  const removeSelectedItems = () => {
    setScrapedItems(prevItems => prevItems.filter(item => !item.selected));
  };

  // Remove all scraped items and hide the results container
  const clearScrapedList = () => {
    setScrapedItems([]);
    setResultsVisible(false);
  };

  // ----- Integration with External API (Electron, LS) -----
  useEffect(() => {
    // Listen for URL open errors
    if (window.electronAPI?.openURLErr) {
      window.electronAPI.openURLErr((errorMessage) => {
        alert('Failed to open URL: ' + errorMessage);
      });
    }
    // Listen for scraped data updates
    if (window.electronAPI?.receive) {
      window.electronAPI.receive('scrapedData:update', (data) => {
        try {
          const jsonObj = JSON.parse(data);
          // Add a "selected" flag for each new item
          const newItems = jsonObj.map(item => ({ ...item, selected: false }));
          setScrapedItems(prevItems => [...prevItems, ...newItems]);
          setResultsVisible(true);
        } catch (e) {
          console.error('Error parsing scraped data:', e);
        }
      });
    }
    // Listen for export responses from LS API
    if (window.lsAPI?.onExportResponse) {
      window.lsAPI.onExportResponse((res) => {
        try {
          const response = JSON.parse(res);
          if (response) {
            if (response.ok) {
              clearScrapedList();
              alert(response.resMsg);
            } else {
              alert(response.resMsg);
            }
          } else {
            alert('Null Response Received from Main Process');
          }
        } catch (e) {
          console.error('Error handling export response:', e);
        }
        setIsExporting(false);
      });
    }
    // Listen for external window close event
    if (window.electronAPI?.onExtWindowClose) {
      window.electronAPI.onExtWindowClose(() => {
        if (scrapedItems.length === 0) {
          setUrlInput('');
          setManualData('');
        }
      });
    }
    // Cleanup listeners if necessary when the component unmounts…
  }, []); // Note: dependency array is empty so listeners are set once

  // ----- Render -----
  return (
    <div id="scrape-container" className="my-5 container position-relative">
      <h1 className="display-4">Web Scraper</h1>
      <button
        className="btn btn-outline-secondary btn-sm position-absolute top-0 end-0"
        type="button"
        id="scrape-mode-toggle"
        data-content="Popover with data-trigger"
        rel="popover"
        data-placement="bottom"
        data-original-title="Title"
        data-trigger="hover"
        onClick={toggleMode}
      >
        {isManualMode ? 'URL Mode' : 'Manual Mode'}
      </button>

      {/* URL Mode */}
      {!isManualMode && (
        <div id="url-scrape-container">
          <h4>URL Mode</h4>
          <div id="scrape-form-container" className="my-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUrlSubmit();
              }}
            >
              <div className="mb-3">
                <label htmlFor="url-input" className="form-label">
                  URL of Web Page
                </label>
                <div className="input-group mb-3">
                  <input
                    id="url-input"
                    type="text"
                    className="form-control"
                    placeholder="Enter the URL here"
                    aria-label="URL"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    disabled={isExporting}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="submitURLBtn"
                    onClick={handleUrlSubmit}
                    disabled={isExporting}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Results Container */}
          {resultsVisible && (
            <div id="results-container" className="mt-5">
              <div id="results-list-header" className="list-header">
                <div id="results-lbl-container" className="hdr-lbl-container">
                  <span id="results-list-lbl" className="hdr-lbl">
                    Scraped Data
                  </span>
                </div>
                <div id="results-list-btns" className="list-btn-container">
                  <div>
                    <button
                      id="rmv-all-btn"
                      type="button"
                      className="btn btn-secondary border border-secondary scrape-data-btn"
                      onClick={clearScrapedList}
                      disabled={isExporting}
                    >
                      Clear All
                    </button>
                    <button
                      id="rmv-sel-btn"
                      type="button"
                      className="btn btn-secondary border border-secondary scrape-data-btn"
                      onClick={removeSelectedItems}
                      disabled={isExporting}
                      style={{
                        display: scrapedItems.some((item) => item.selected)
                          ? 'inline-block'
                          : 'none'
                      }}
                    >
                      Clear Selected
                    </button>
                  </div>
                </div>
              </div>
              <div
                id="results-list"
                className="list-group list-group-flush overflow-auto scraped-list"
              >
                {scrapedItems.map((item, index) => (
                  <a
                    href="#"
                    key={index}
                    className={`list-group-item list-group-item-action scrape-item ${
                      item.selected ? 'active' : ''
                    }`}
                    style={{ borderWidth: '0px 0px 3px 0px' }}
                    onClick={() => toggleScrapedItem(index)}
                  >
                    {item.data}
                  </a>
                ))}
              </div>
              <div id="ls-exp-btn-container">
                <div
                  id="url-exp-btn-grp"
                  className="form-group exp-to-btn-grp"
                >
                  <div className="exp-lbl-container">
                    <span id="url-exp-btn-lbl">Export To</span>
                  </div>
                  <select
                    id="projectSelect-url"
                    className="form-control"
                    value={projectSelectUrl}
                    onChange={(e) => setProjectSelectUrl(e.target.value)}
                    disabled={isExporting}
                  >
                    <option value="">Select a project</option>
                    {/* Populate additional <option> elements as needed */}
                  </select>
                  <button
                    className="btn btn-secondary border border-secondary"
                    type="button"
                    id="url-exportBtn"
                    onClick={handleExportUrl}
                    disabled={isExporting}
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual Mode */}
      {isManualMode && (
        <div id="manual-scrape-container">
          <h4>Manual Mode</h4>
          <div className="form">
            <div className="form-group mb-3 exp-to-btn-grp">
              <div className="exp-lbl-container">
                <span id="man-exp-btn-lbl">Export To</span>
              </div>
              <select
                id="projectSelect-man"
                className="form-control"
                value={projectSelectMan}
                onChange={(e) => setProjectSelectMan(e.target.value)}
                disabled={isExporting}
              >
                <option value="">Select a project</option>
                {/* Options will be dynamically added */}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="manual-scrape-textarea">
                Manual Data Entry Field
              </label>
              <textarea
                className="form-control"
                id="manual-scrape-textarea"
                rows="3"
                value={manualData}
                onChange={(e) => setManualData(e.target.value)}
                disabled={isExporting}
              ></textarea>
            </div>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="man-exportBtn"
              onClick={handleExportManual}
              disabled={isExporting}
            >
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Scrape;