// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';

export default function NavBar() {
  // State to keep track of the current theme
  const [theme, setTheme] = useState('dark-theme');

  // Whenever `theme` changes, remove old theme classes and add the new one
  useEffect(() => {
    document.body.classList.remove('light-theme','dark-theme','blue-theme','disco-theme');
    document.body.classList.add(theme);
  }, [theme]);

  // Called when user picks a new theme from the dropdown
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-sm fixed-top draggable">
      <div className="container-fluid">
        {/* Left side: Brand (title) + toggler for small screens */}
        <span className="navbar-brand mb-0 h1">Web Scraper</span>
        <button
          className="navbar-toggler not-draggable"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Nav Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Justify these nav links to the left with "me-auto" (margin-end: auto) */}
          <ul className="navbar-nav mb-0 not-draggable me-auto" id="navbar-ul-1">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Scrape
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Annotation
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Database
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Logs
              </a>
            </li>
          </ul>

          {/* Right side: theme dropdown + Exit link (ms-auto = margin-start auto) */}
          <ul className="navbar-nav ms-auto mb-0 not-draggable" id="navbar-ul-2">
            <li className="nav-item">
              {/* The theme dropdown that updates our theme state */}
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
              <a className="nav-link" id="exit-nav" href="#">
                Exit
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

