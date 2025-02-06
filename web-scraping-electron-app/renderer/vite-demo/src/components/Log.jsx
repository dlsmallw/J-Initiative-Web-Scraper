import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function LogPage() {
  const [logEntries, setLogEntries] = useState([]);
  const [filterType, setFilterType] = useState('ALL');
  const [filterDate, setFilterDate] = useState('');

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs?')) {
      setLogEntries([]);
    }
  };

  return (
    <div id="log-container" className="my-5 container">
      <div id="header-container" className="d-flex justify-content-between">
        <h1 className="display-4">Log Viewer</h1>
        <button id="clearLogsBtn" className="btn btn-outline-danger" onClick={handleClearLogs}>Clear Logs</button>
      </div>

      <div className="mb-3">
        <label htmlFor="log-filter" className="form-label">Filter by Type:</label>
        <select id="log-filter" className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="ALL">All</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="date-filter" className="form-label">Filter by Date:</label>
        <input type="date" id="date-filter" className="form-control" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      </div>

      <pre id="log-output" className="bg-dark text-white p-3 rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <div id="log-wrapper">
          {logEntries.length === 0 ? (
            <div className="text-center text-muted">No logs available.</div>
          ) : (
            logEntries.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))
          )}
        </div>
      </pre>
    </div>
  );
}
