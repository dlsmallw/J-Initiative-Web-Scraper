// LogViewer.jsx
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function LogViewer() {
  // Keep track of logs, selected filters, and date
  const [logs, setLogs] = useState([])
  const [filterType, setFilterType] = useState('ALL')
  const [filterDate, setFilterDate] = useState('') // store as YYYY-MM-DD string
  const [isLoading, setIsLoading] = useState(true)

  // Example: If you have `window.logger.requestLogs()` from your preload or contextBridge:
  useEffect(() => {
    async function fetchLogs() {
      setIsLoading(true)
      try {
        const result = await window.log.requestLogs()
        if (result) {
          setLogs(result)
        }
      } catch (err) {
        console.error('Error loading logs:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLogs()
  }, [])

  // Filter logic
  const filteredLogs = logs.filter((logObj) => {
    let matchesType = filterType === 'ALL' || logObj.logType === filterType

    // For date comparison, parse the log date & the filter date
    let matchesDate = true
    if (filterDate) {
      const logDate = new Date(logObj.logDateTime)
      const filterDateObj = new Date(filterDate)
      matchesDate = logDate.toDateString() === filterDateObj.toDateString()
    }
    return matchesType && matchesDate
  })

  // Clear logs example
  const handleClearLogs = async () => {
    if (!window.log) return
    if (window.confirm('Are you sure you want to clear all logs?')) {
      await window.log.clearLogs()
      setLogs([])
    }
  }

  return (
    <div id="log-container" className="my-5 container">
      <div id="header-container">
        <h1 className="display-4">Log Viewer</h1>
        <button
          id="clearLogsBtn"
          className="btn btn-outline-danger"
          onClick={handleClearLogs}
          disabled={logs.length === 0}
        >
          Clear Logs
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-3">
        <label htmlFor="log-filter" className="form-label">
          Filter by Type:
        </label>
        <select
          id="log-filter"
          className="form-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Date Filter */}
      <div className="mb-3">
        <label htmlFor="date-filter" className="form-label">
          Filter by Date:
        </label>
        <input
          type="date"
          id="date-filter"
          className="form-control"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Log Output */}
      <pre
        id="log-output"
        className="bg-dark text-white p-3 rounded"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        <div id="log-wrapper">
          {isLoading ? (
            <div className="text-center text-muted">Loading logs...</div>
          ) : filteredLogs.length === 0 ? (
            <div className="no-logs-message text-center text-muted">
              No logs found for the selected filters.
            </div>
          ) : (
            filteredLogs.map((logObj, idx) => (
              <div key={idx} className="log-entry">
                {logObj.rawLogStr}
              </div>
            ))
          )}
        </div>
      </pre>
    </div>
  )
}
