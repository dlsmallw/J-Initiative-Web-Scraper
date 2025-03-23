/**
 * @file logger.js
 * @description Configures and exports a centralized logger using electron-log.
 * Provides consistent logging format and settings for both file and console output.
 */

const log = require('electron-log');

/**
 * Configure log transport settings for file and console logging.
 * - Sets logging levels and formats.
 * - Limits log file size to prevent disk bloat.
 */

// Set log level for file output
log.transports.file.level = 'debug'; // Logs debug, info, warn, error
//log.transports.file.level = 'info';  // Logs info, warn, error
//log.transports.file.level = 'warn';  // Logs warn, error
//log.transports.file.level = 'error'; // Logs error only

// Set log format for file output
log.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s} [{level}] {text}';

// Set log format for console output
log.transports.console.format = '{h}:{i}:{s} [{level}] {text}';

// Limit the size of log files (5 MB max per file)
log.transports.file.maxSize = 5 * 1024 * 1024;

/**
 * Export the configured logger for use in other modules.
 * @module logger
 * @type {Object}
 * @see {@link https://github.com/megahertz/electron-log|electron-log documentation}
 */
module.exports = log;

