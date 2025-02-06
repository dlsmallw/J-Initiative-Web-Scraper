import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [theme, setTheme] = useState('dark-theme');

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme', 'disco-theme');
    document.body.classList.add(theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
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
            <li className="nav-item">
              <Link className="nav-link" to="/scrape">Scrape</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/annotation">Annotation</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/database">Database</Link>
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

