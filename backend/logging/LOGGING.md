# Logging Standards and Best Practices

This document outlines the logging standards and best practices adopted in our project to ensure consistent, informative, and secure logging throughout the application.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Log Levels and Their Usage](#2-log-levels-and-their-usage)
   - [DEBUG](#debug)
   - [INFO](#info)
   - [WARN](#warn)
   - [ERROR](#error)
3. [Transition from Previous Logging Methods](#3-transition-from-previous-logging-methods)
4. [Logging Structure and Format](#4-logging-structure-and-format)
5. [Best Practices for Logging](#5-best-practices-for-logging)
6. [Example Log Entries](#6-example-log-entries)
7. [Log File Management](#7-log-file-management)
8. [Error Handling and Logging](#8-error-handling-and-logging)
9. [Logging Library Configuration](#9-logging-library-configuration)

---

## 1. Introduction

In our project, we prioritize clear and consistent logging to facilitate effective debugging and monitoring. We have transitioned from using basic `console.log` statements to utilizing the `electron-log` library, which provides advanced logging capabilities suitable for both development and production environments.

---

## 2. Log Levels and Their Usage

We use the following log levels to categorize log messages based on their severity and purpose:

### DEBUG

- **Purpose**: Detailed information useful during development and debugging.
- **When to Use**: Tracing function calls, variable values, and flow of execution.
- **Before**:

  ```javascript
  console.log('Creating main application window.');
  ```

- **After**:

  ```javascript
  log.debug('Creating main application window.');
  ```

### INFO

- **Purpose**: General information about application operations.
- **When to Use**: Successful completion of operations, state changes, and significant events.
- **Before**:

  ```javascript
  console.log('Main window loaded.');
  ```

- **After**:

  ```javascript
  log.info('Main window loaded.');
  ```

### WARN

- **Purpose**: Indications of potential issues or unexpected events that do not halt execution.
- **When to Use**: Deprecated functions, recoverable errors, or unusual situations.
- **Before**:

  ```javascript
  console.warn('Navigation attempt to external URL blocked:', navigateUrl);
  ```

- **After**:

  ```javascript
  log.warn(`Navigation attempt to external URL blocked: ${navigateUrl}`);
  ```

### ERROR

- **Purpose**: Errors that prevent a function from executing correctly.
- **When to Use**: Exceptions, failed operations, or any critical issues that need attention.
- **Before**:

  ```javascript
  console.error(`Invalid URL: ${url}`);
  ```

- **After**:

  ```javascript
  log.error(`Invalid URL: ${url}`);
  ```

---

## 3. Transition from Previous Logging Methods

### Previous Approach

- **Method**: Used `console.log`, `console.warn`, and `console.error` for logging.
- **Limitations**:
  - Inconsistent log levels.
  - Logs not centralized or formatted.
  - Difficult to manage in production environments.

**Example**:

```javascript
console.log('Submit button pressed');
console.error('Error loading logs:', error);
```

### Current Approach

- **Method**: Using `electron-log` library with appropriate log levels.
- **Advantages**:
  - Centralized logging to files and console.
  - Consistent formatting and levels.
  - Easier to filter and manage logs.

**Example**:

```javascript
log.debug('Submit button pressed.');
log.error(`Error loading logs: ${error}`);
```

---

## 4. Logging Structure and Format

- **Timestamp**: Each log entry includes a timestamp.
  - Format: `[YYYY-MM-DD HH:mm:ss.SSS]`
- **Log Level**: Indicated in lowercase within square brackets.
  - Example: `[info]`, `[error]`
- **Message**: Clear and descriptive message.
- **Context**: Include relevant information using string interpolation.

**Example**:

```
[2024-11-09 10:15:30.123] [info] Application is ready
```

---

## 5. Best Practices for Logging

- **Use Appropriate Log Levels**: Select the correct log level based on the severity and purpose.
- **Avoid Sensitive Information**: Do not log personal data, passwords, or any sensitive information.
- **Consistent Formatting**: Follow the established format for all log entries.
- **Informative Messages**: Provide context to make logs meaningful and actionable.
- **Error Handling**: Log exceptions and errors with sufficient detail.
- **Environment Configuration**: Adjust log levels based on the environment (development vs. production).
- **Regular Review**: Periodically review logs to identify issues and optimize logging practices.

---

## 6. Example Log Entries

### DEBUG

```javascript
log.debug('Creating main application window.');
```

**Log Output**:

```
[2024-11-09 10:20:45.678] [debug] Creating main application window.
```

### INFO

```javascript
log.info('Main window loaded.');
```

**Log Output**:

```
[2024-11-09 10:20:46.123] [info] Main window loaded.
```

### WARN

```javascript
log.warn(`Attempted to send on invalid channel: ${channel}`);
```

**Log Output**:

```
[2024-11-09 10:21:05.456] [warn] Attempted to send on invalid channel: undefined
```

### ERROR

```javascript
log.error(`Error loading logs: ${error}`);
```

**Log Output**:

```
[2024-11-09 10:21:15.789] [error] Error loading logs: TypeError: Cannot read property 'split' of undefined
```

---

## 7. Log File Management

- **Log Rotation**: Configured `electron-log` to handle log rotation, preventing excessive disk usage.
- **Retention Policy**: Default retention is set to keep logs for 30 days.
- **Log Locations**:
  - **Main Process Logs**: Saved to a file specified by `log.transports.file.getFile().path`.
  - **Renderer Process Logs**: Sent to the main process and logged centrally.

---

## 8. Error Handling and Logging

- **Catch Blocks**: Wrap asynchronous operations in `try...catch` blocks.
- **Detailed Errors**: Log error messages and stack traces where appropriate.
- **User Feedback**: Provide user-facing error messages without revealing sensitive details.

**Example**:

Before:

```javascript
try {
    // Code that may throw an error
} catch (error) {
    console.error('Error:', error);
}
```

After:

```javascript
try {
    // Code that may throw an error
} catch (error) {
    log.error(`Error processing request: ${error.message}`);
    // Optional: log.error(error.stack);
}
```

---

## 9. Logging Library Configuration

- **Log Levels**: Configured to use `debug` level during development and `info` or higher in production.
- **Transports**:
  - **Console**: Enabled for development for real-time feedback.
  - **File**: Enabled for both development and production for record-keeping.
- **Formatting**: Customized log format to include timestamps and levels.

**Configuration Example**:

```javascript
const log = require('electron-log');

// Determine environment (example variable)
const isDev = !app.isPackaged;

// Set log level based on environment
log.transports.console.level = isDev ? 'debug' : 'info';
log.transports.file.level = 'info';

// Customize log format
log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}';
log.transports.console.format = '[{h}:{i}:{s}.{ms}] [{level}] {text}';
```



