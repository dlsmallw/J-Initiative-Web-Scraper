// logger.js

const log = require('electron-log');

// Configure logging levels and formats
log.transports.file.level = 'info';
log.transports.console.level = 'debug';
log.transports.file.format = '{h}:{i}:{s} [{level}] {text}';

// Export the logger for use in other modules
module.exports = log;
