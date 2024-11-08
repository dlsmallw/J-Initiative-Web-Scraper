// logger.js
const log = require('electron-log');

// Configure log transport settings
log.transports.file.level = 'info'; // Set the base level for file logging
log.transports.console.level = 'debug'; // Allow console to show more levels if needed
log.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s} [{level}] {text}';
log.transports.console.format = '{h}:{i}:{s} [{level}] {text}';

// Optional: Limit the size of log files
log.transports.file.maxSize = 5 * 1024 * 1024; // 5 MB

// Export the configured logger
module.exports = log;
