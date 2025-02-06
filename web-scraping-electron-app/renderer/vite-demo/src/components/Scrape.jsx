import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function ScrapePage() {
  const [mode, setMode] = useState('URL Mode');
  const [url, setUrl] = useState('');
  const [manualData, setManualData] = useState('');
  const [scrapedData, setScrapedData] = useState([]);

  const toggleMode = () => {
    setMode(mode === 'Manual Mode' ? 'URL Mode' : 'Manual Mode');
  };

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleManualChange = (e) => setManualData(e.target.value);

  const submitUrl = () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }
    setScrapedData([...scrapedData, { data: `Scraped content from ${url}`, url }]);
  };

  const exportData = () => {
    if (!manualData.trim()) {
      alert('Manual data field cannot be empty!');
      return;
    }
    setScrapedData([...scrapedData, { data: manualData, url: null }]);
  };

  return (
    <div className="my-5 container position-relative">
      <h1 className="display-4">Web Scraper</h1>
      <button
        className="btn btn-outline-secondary btn-sm position-absolute top-0 end-0"
        onClick={toggleMode}>
        {mode}
      </button>

      {mode === 'URL Mode' ? (
        <div id="url-scrape-container">
          <h4>URL Mode</h4>
          <div className="my-4">
            <label className="form-label">URL of Web Page</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the URL here"
                value={url}
                onChange={handleUrlChange}
              />
              <button className="btn btn-outline-secondary" onClick={submitUrl}>Submit</button>
            </div>
          </div>
        </div>
      ) : (
        <div id="manual-scrape-container">
          <h4>Manual Mode</h4>
          <div className="form-group mb-3">
            <label>Manual Data Entry Field</label>
            <textarea
              className="form-control"
              rows="3"
              value={manualData}
              onChange={handleManualChange}
            />
          </div>
          <button className="btn btn-outline-secondary" onClick={exportData}>Export</button>
        </div>
      )}

      {scrapedData.length > 0 && (
        <div className="mt-5">
          <h4>Scraped Data</h4>
          <ul className="list-group">
            {scrapedData.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.data}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
