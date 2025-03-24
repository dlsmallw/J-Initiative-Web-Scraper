/**
 * @file logger.js
 * @fileoverview Configures and exports a centralized logger using electron-log.
 * Provides consistent logging format and settings for both file and console output.
 *
 * @module Logger
 * @see {@link https://github.com/megahertz/electron-log|electron-log documentation}
 */


const log = require('electron-log');

/**
 * Logger configuration settings.
 * Defines log levels, formats, and file size limits for both file and console output.
 *
 * @namespace Config
 * @memberof module:Logger
 */

/**
 * Sets the log level for file output.
 * Options: 'debug', 'info', 'warn', 'error'.
 * Default is 'debug'.
 *
 * @memberof module:Logger.Config
 * @type {string}
 */
log.transports.file.level = 'debug'; // Logs debug, info, warn, error
//log.transports.file.level = 'info';  // Logs info, warn, error
//log.transports.file.level = 'warn';  // Logs warn, error
//log.transports.file.level = 'error'; // Logs error only

/**
 * Defines the log format for file output.
 * Format: `{y}-{m}-{d} {h}:{i}:{s} [{level}] {text}`
 *
 * @memberof module:Logger.Config
 * @type {string}
 */
log.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s} [{level}] {text}';

/**
 * Defines the log format for console output.
 * Format: `{h}:{i}:{s} [{level}] {text}`
 *
 * @memberof module:Logger.Config
 * @type {string}
 */
log.transports.console.format = '{h}:{i}:{s} [{level}] {text}';

/**
 * Limits log file size to 5 MB per file to prevent disk space issues.
 *
 * @memberof module:Logger.Config
 * @type {number}
 */
log.transports.file.maxSize = 5 * 1024 * 1024;

/**
 * Exports the configured logger instance.
 *
 * @memberof module:Logger
 * @returns {Object} The configured electron-log instance.
 */
module.exports = log;

