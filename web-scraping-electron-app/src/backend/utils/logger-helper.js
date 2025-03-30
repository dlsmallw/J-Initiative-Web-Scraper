/**
 * @file logger-helper.js
 * @description Shared logging and alert helper functions for Electron renderer processes.
 * Wraps around `window.log` and `window.electronAPI` to provide consistent logging across UI pages.
 *
 * @module LoggerHelper
 */

/**
 * Wrapper for logging and alert utilities.
 */
export class LoggerHelper {
  constructor() {
    this.logger = window.log;
    this.electronAPI = window.electronAPI;
  }

  /**
   * Send an info-level log message.
   * @param {string} message - The message to log.
   */
  logInfo(message) {
    this.logger?.info?.(message);
  }

  /**
   * Send a debug-level log message.
   * @param {string} message - The message to log.
   */
  logDebug(message) {
    this.logger?.debug?.(message);
  }

  /**
   * Send a warning-level log message.
   * @param {string} message - The message to log.
   */
  logWarn(message) {
    this.logger?.warn?.(message);
  }

  /**
   * Send an error-level log message.
   * @param {string} message - The message to log.
   */
  logError(message) {
    this.logger?.error?.(message);
  }

  /**
   * Show an alert dialog and log the event.
   * If a `cause` is provided, it logs an error and shows an error dialog.
   * Otherwise, logs info and shows a general dialog.
   *
   * @param {string} alertMsg - The alert message.
   * @param {string} [cause] - Optional error cause (shown in error dialog).
   */
  postAlert(alertMsg, cause) {
    const json = {
      msg: alertMsg,
      errType: cause || null,
    };

    if (!cause) {
      this.electronAPI?.postDialog?.general?.(JSON.stringify(json));
      this.logInfo(alertMsg);
    } else {
      this.electronAPI?.postDialog?.error?.(JSON.stringify(json));
      this.logError(`${alertMsg} Cause: ${cause}`);
    }
  }
}
