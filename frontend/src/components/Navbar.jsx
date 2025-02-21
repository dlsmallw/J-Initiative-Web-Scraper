import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [theme, setTheme] = useState('dark-theme');

  useEffect(() => {
    // Remove old theme classes, add the new one
    document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme', 'disco-theme');
    document.body.classList.add(theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  // Handler that calls your Electron IPC to open the external scrape window
  const handleOpenScrape = () => {
    if (window.electronAPI?.openScrapeWindow) {
      // You can pass a default URL here, or leave it blank and handle in main
      window.electronAPI.openScrapeWindow('https://en.wikipedia.org/wiki/GitHub');
    } else {
      console.warn('electronAPI.openScrapeWindow is not defined');
    }
  };

  return (
    <nav className="navbar navbar-expand-sm fixed-top draggable">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Web Scraper</span>
        <button
          className="navbar-toggler not-draggable"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-0 not-draggable me-auto" id="navbar-ul-1">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {/* Remove or comment out the old <Link to="/scrape" ...> */}
            <li className="nav-item">
              {/* Instead of a React route, call your Electron method */}
              <a className="nav-link" href="#" onClick={handleOpenScrape}>
                Scrape
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/annotation">Annotation</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/database">Database</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logs">Logs</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-0 not-draggable" id="navbar-ul-2">
            <li className="nav-item">
              <select
                id="theme-select"
                className="form-select form-select-sm"
                value={theme}
                onChange={handleThemeChange}
              >
                <option value="light-theme">Light Theme</option>
                <option value="dark-theme">Dark Theme</option>
                <option value="blue-theme">Blue Theme</option>
                <option value="disco-theme">Disco Theme</option>
              </select>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="exit-nav" href="#">Exit</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

