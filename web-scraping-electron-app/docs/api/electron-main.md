## Modules

<dl>
<dt><a href="#module_ElectronApp">ElectronApp</a></dt>
<dd><p>Entry point for the ElectronJS application. Handles window creation, logging, database interaction, and IPC communication.</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#versions">versions</a> : <code>object</code></dt>
<dd><p>Exposes version information for Node.js, Chrome, and Electron to the renderer.</p>
</dd>
<dt><a href="#log">log</a> : <code>object</code></dt>
<dd><p>Logging API exposed to renderer for sending log messages to the main process.</p>
</dd>
<dt><a href="#lsAPI">lsAPI</a> : <code>object</code></dt>
<dd><p>Label Studio (LS) API exposed to renderer for interacting with LS projects and windows.</p>
</dd>
<dt><a href="#electronAPI">electronAPI</a> : <code>object</code></dt>
<dd><p>General IPC API for communicating between renderer and main processes.
Restricts access to allowed channels for security.</p>
</dd>
<dt><a href="#urlScrape">urlScrape</a> : <code>object</code></dt>
<dd><p>URL Scraping API for sending and receiving data during scraping sessions.</p>
</dd>
<dt><a href="#databaseAPI">databaseAPI</a> : <code>object</code></dt>
<dd><p>Database API for interacting with Firebase-hosted website data.</p>
</dd>
</dl>

<a name="module_ElectronApp"></a>

## ElectronApp
Entry point for the ElectronJS application. Handles window creation, logging, database interaction, and IPC communication.


* [ElectronApp](#module_ElectronApp)
    * _static_
        * [.Queue](#module_ElectronApp.Queue)
            * [new Queue()](#new_module_ElectronApp.Queue_new)
        * [.Logger](#module_ElectronApp.Logger) : <code>object</code>
            * [.logInfo(log)](#module_ElectronApp.Logger.logInfo)
            * [.logDebug(log)](#module_ElectronApp.Logger.logDebug)
            * [.logWarn(log)](#module_ElectronApp.Logger.logWarn)
            * [.logError(log)](#module_ElectronApp.Logger.logError)
            * [.formLogObject(line)](#module_ElectronApp.Logger.formLogObject) ⇒ <code>Object</code>
            * [.writeNewLog(line, type)](#module_ElectronApp.Logger.writeNewLog)
            * [.sendNewLogsToRenderer()](#module_ElectronApp.Logger.sendNewLogsToRenderer)
            * [.startLoggingInterval(timeInterval)](#module_ElectronApp.Logger.startLoggingInterval)
            * [.clearLogUpdateInterval()](#module_ElectronApp.Logger.clearLogUpdateInterval)
            * [.initLogListener(logFilePath)](#module_ElectronApp.Logger.initLogListener)
            * [.terminateLogListener()](#module_ElectronApp.Logger.terminateLogListener)
        * [.LogIPC](#module_ElectronApp.LogIPC) : <code>object</code>
        * [.FirebaseWebsites](#module_ElectronApp.FirebaseWebsites) : <code>object</code>
        * [.WindowManager](#module_ElectronApp.WindowManager) : <code>object</code>
            * [.createMainWindow()](#module_ElectronApp.WindowManager.createMainWindow)
            * [.createURLWindow(url)](#module_ElectronApp.WindowManager.createURLWindow)
            * [.createLSExternal(url)](#module_ElectronApp.WindowManager.createLSExternal)
            * [.closeScrapeWindow()](#module_ElectronApp.WindowManager.closeScrapeWindow)
            * [.closeLSWindow(url)](#module_ElectronApp.WindowManager.closeLSWindow)
            * [.closeAllWindows()](#module_ElectronApp.WindowManager.closeAllWindows)
        * [.Lifecycle](#module_ElectronApp.Lifecycle) : <code>object</code>
        * [.LabelStudioIPC](#module_ElectronApp.LabelStudioIPC) : <code>object</code>
        * [.ScrapeAndDialogs](#module_ElectronApp.ScrapeAndDialogs) : <code>object</code>
    * _inner_
        * [~terminateApp()](#module_ElectronApp..terminateApp)

<a name="module_ElectronApp.Queue"></a>

### ElectronApp.Queue
**Kind**: static class of [<code>ElectronApp</code>](#module_ElectronApp)  
<a name="new_module_ElectronApp.Queue_new"></a>

#### new Queue()
A thread-safe queue for processing log entries or other events using async mutexes.

<a name="module_ElectronApp.Logger"></a>

### ElectronApp.Logger : <code>object</code>
Logging utility functions for writing and parsing log entries.

**Kind**: static namespace of [<code>ElectronApp</code>](#module_ElectronApp)  

* [.Logger](#module_ElectronApp.Logger) : <code>object</code>
    * [.logInfo(log)](#module_ElectronApp.Logger.logInfo)
    * [.logDebug(log)](#module_ElectronApp.Logger.logDebug)
    * [.logWarn(log)](#module_ElectronApp.Logger.logWarn)
    * [.logError(log)](#module_ElectronApp.Logger.logError)
    * [.formLogObject(line)](#module_ElectronApp.Logger.formLogObject) ⇒ <code>Object</code>
    * [.writeNewLog(line, type)](#module_ElectronApp.Logger.writeNewLog)
    * [.sendNewLogsToRenderer()](#module_ElectronApp.Logger.sendNewLogsToRenderer)
    * [.startLoggingInterval(timeInterval)](#module_ElectronApp.Logger.startLoggingInterval)
    * [.clearLogUpdateInterval()](#module_ElectronApp.Logger.clearLogUpdateInterval)
    * [.initLogListener(logFilePath)](#module_ElectronApp.Logger.initLogListener)
    * [.terminateLogListener()](#module_ElectronApp.Logger.terminateLogListener)

<a name="module_ElectronApp.Logger.logInfo"></a>

#### Logger.logInfo(log)
Makes an info log entry.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  

| Param | Type | Description |
| --- | --- | --- |
| log | <code>\*</code> | The log entry. |

<a name="module_ElectronApp.Logger.logDebug"></a>

#### Logger.logDebug(log)
Makes an debug log entry.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  

| Param | Type | Description |
| --- | --- | --- |
| log | <code>\*</code> | The log entry. |

<a name="module_ElectronApp.Logger.logWarn"></a>

#### Logger.logWarn(log)
Makes an warn log entry.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  

| Param | Type | Description |
| --- | --- | --- |
| log | <code>\*</code> | The log entry. |

<a name="module_ElectronApp.Logger.logError"></a>

#### Logger.logError(log)
Makes an error log entry.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  

| Param | Type | Description |
| --- | --- | --- |
| log | <code>\*</code> | The log entry. |

<a name="module_ElectronApp.Logger.formLogObject"></a>

#### Logger.formLogObject(line) ⇒ <code>Object</code>
Forms a JSON log object for managing log-related info.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  
**Returns**: <code>Object</code> - JSON representation of log.  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | Raw log line from file. |

<a name="module_ElectronApp.Logger.writeNewLog"></a>

#### Logger.writeNewLog(line, type)
Facilitates writing a new log to the log file.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>\*</code> | Log message. |
| type | <code>string</code> | Log type ('info', 'debug', 'warn', 'error'). |

<a name="module_ElectronApp.Logger.sendNewLogsToRenderer"></a>

#### Logger.sendNewLogsToRenderer()
Function that sends the current queue of logs to be read to the renderer.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  
<a name="module_ElectronApp.Logger.startLoggingInterval"></a>

#### Logger.startLoggingInterval(timeInterval)
Function that handles sending the renderer the new logs on a set periodicity.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  

| Param | Type | Description |
| --- | --- | --- |
| timeInterval | <code>\*</code> | The desired periodicity. |

<a name="module_ElectronApp.Logger.clearLogUpdateInterval"></a>

#### Logger.clearLogUpdateInterval()
Function for clearing the log update interval.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  
<a name="module_ElectronApp.Logger.initLogListener"></a>

#### Logger.initLogListener(logFilePath)
Initializes the log file listener for detecting new log entries.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  

| Param | Type | Description |
| --- | --- | --- |
| logFilePath | <code>\*</code> | The log file path. |

<a name="module_ElectronApp.Logger.terminateLogListener"></a>

#### Logger.terminateLogListener()
Function for terminating the log file listener.

**Kind**: static method of [<code>Logger</code>](#module_ElectronApp.Logger)  
<a name="module_ElectronApp.LogIPC"></a>

### ElectronApp.LogIPC : <code>object</code>
IPC handlers for log communication between renderer and main process.

**Kind**: static namespace of [<code>ElectronApp</code>](#module_ElectronApp)  
<a name="module_ElectronApp.FirebaseWebsites"></a>

### ElectronApp.FirebaseWebsites : <code>object</code>
IPC handlers for interacting with Firestore: manage website list, website entries, and data insertion.

**Kind**: static namespace of [<code>ElectronApp</code>](#module_ElectronApp)  
<a name="module_ElectronApp.WindowManager"></a>

### ElectronApp.WindowManager : <code>object</code>
Functions for creating and managing application windows, including main, URL, and Label Studio windows.

**Kind**: static namespace of [<code>ElectronApp</code>](#module_ElectronApp)  

* [.WindowManager](#module_ElectronApp.WindowManager) : <code>object</code>
    * [.createMainWindow()](#module_ElectronApp.WindowManager.createMainWindow)
    * [.createURLWindow(url)](#module_ElectronApp.WindowManager.createURLWindow)
    * [.createLSExternal(url)](#module_ElectronApp.WindowManager.createLSExternal)
    * [.closeScrapeWindow()](#module_ElectronApp.WindowManager.closeScrapeWindow)
    * [.closeLSWindow(url)](#module_ElectronApp.WindowManager.closeLSWindow)
    * [.closeAllWindows()](#module_ElectronApp.WindowManager.closeAllWindows)

<a name="module_ElectronApp.WindowManager.createMainWindow"></a>

#### WindowManager.createMainWindow()
Function to create the main application window.

**Kind**: static method of [<code>WindowManager</code>](#module_ElectronApp.WindowManager)  
<a name="module_ElectronApp.WindowManager.createURLWindow"></a>

#### WindowManager.createURLWindow(url)
Function to create a new window to display the provided URL

**Kind**: static method of [<code>WindowManager</code>](#module_ElectronApp.WindowManager)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL to display. |

<a name="module_ElectronApp.WindowManager.createLSExternal"></a>

#### WindowManager.createLSExternal(url)
Opens the LS project app in a separate window.

**Kind**: static method of [<code>WindowManager</code>](#module_ElectronApp.WindowManager)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the LS project. |

<a name="module_ElectronApp.WindowManager.closeScrapeWindow"></a>

#### WindowManager.closeScrapeWindow()
Handles closing the external scrape window if it exists.

**Kind**: static method of [<code>WindowManager</code>](#module_ElectronApp.WindowManager)  
<a name="module_ElectronApp.WindowManager.closeLSWindow"></a>

#### WindowManager.closeLSWindow(url)
Handles closing the external LS window if it exists.

**Kind**: static method of [<code>WindowManager</code>](#module_ElectronApp.WindowManager)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> \| <code>null</code> | Optional URL to send upon closing. |

<a name="module_ElectronApp.WindowManager.closeAllWindows"></a>

#### WindowManager.closeAllWindows()
Method for closing all external windows.

**Kind**: static method of [<code>WindowManager</code>](#module_ElectronApp.WindowManager)  
<a name="module_ElectronApp.Lifecycle"></a>

### ElectronApp.Lifecycle : <code>object</code>
Application lifecycle handlers and event listeners.

**Kind**: static namespace of [<code>ElectronApp</code>](#module_ElectronApp)  
<a name="module_ElectronApp.LabelStudioIPC"></a>

### ElectronApp.LabelStudioIPC : <code>object</code>
IPC listeners and handlers for Label Studio integration: export, project updates, token management.

**Kind**: static namespace of [<code>ElectronApp</code>](#module_ElectronApp)  
<a name="module_ElectronApp.ScrapeAndDialogs"></a>

### ElectronApp.ScrapeAndDialogs : <code>object</code>
IPC listeners for scraping operations and UI dialogs.

**Kind**: static namespace of [<code>ElectronApp</code>](#module_ElectronApp)  
<a name="module_ElectronApp..terminateApp"></a>

### ElectronApp~terminateApp()
Method that handles termination of any processes prior to closing the application.

**Kind**: inner method of [<code>ElectronApp</code>](#module_ElectronApp)  
<a name="versions"></a>

## versions : <code>object</code>
Exposes version information for Node.js, Chrome, and Electron to the renderer.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| node | <code>function</code> | Returns Node.js version. |
| chrome | <code>function</code> | Returns Chrome version. |
| electron | <code>function</code> | Returns Electron version. |

<a name="log"></a>

## log : <code>object</code>
Logging API exposed to renderer for sending log messages to the main process.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| info | <code>function</code> | Logs an info-level message. |
| debug | <code>function</code> | Logs a debug-level message. |
| warn | <code>function</code> | Logs a warning. |
| error | <code>function</code> | Logs an error message. |
| requestLogs | <code>function</code> | Requests all current logs. |
| logUpdate | <code>function</code> | Listener for new log updates. |
| clearLogs | <code>function</code> | Clears log file content. |
| logsClearedUpdate | <code>function</code> | Listener for log-clear success. |
| logClearError | <code>function</code> | Listener for log-clear error. |

<a name="lsAPI"></a>

## lsAPI : <code>object</code>
Label Studio (LS) API exposed to renderer for interacting with LS projects and windows.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| exportDataToLS | <code>function</code> | Export data to linked LS project. |
| onExportResponse | <code>function</code> | Listener for LS export responses. |
| openExternal | <code>function</code> | Opens LS project in external window. |
| setExtLSURL | <code>function</code> | Listener to receive URL in LS window. |
| extLSWinClosed | <code>function</code> | Listener for LS window close event. |
| extLSURLChange | <code>function</code> | Sends LS URL change to main process. |
| urlChange | <code>function</code> | Listener for LS URL updates. |
| sendCloseSignal | <code>function</code> | Requests closing LS external window. |
| updateToProjectList | <code>function</code> | Listener for LS project list updates. |
| initVariables | <code>function</code> | Initialize LS URL and token. |
| updateURL | <code>function</code> | Update linked LS project URL. |
| updateToken | <code>function</code> | Update LS project API token. |
| clearLinkedProject | <code>function</code> | Clears linked LS project data. |

<a name="electronAPI"></a>

## electronAPI : <code>object</code>
General IPC API for communicating between renderer and main processes.Restricts access to allowed channels for security.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| send | <code>function</code> | Send data to main process (validated channels). |
| receive | <code>function</code> | Listen for data from main (validated channels). |
| openExternal | <code>function</code> | Request opening a URL in external window. |
| openURLErr | <code>function</code> | Listen for URL open error. |
| onExtWindowClose | <code>function</code> | Listen for external window close. |
| exitSignal | <code>function</code> | Request app termination. |
| postDialog | <code>Object</code> | Dialog utilities. |
| postDialog.general | <code>function</code> | Shows general message dialog. |
| postDialog.error | <code>function</code> | Shows error dialog. |

<a name="urlScrape"></a>

## urlScrape : <code>object</code>
URL Scraping API for sending and receiving data during scraping sessions.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| send | <code>function</code> | Send data via IPC. |
| receive | <code>function</code> | Listen for data. |
| sendCloseSignal | <code>function</code> | Requests scrape window closure. |

<a name="databaseAPI"></a>

## databaseAPI : <code>object</code>
Database API for interacting with Firebase-hosted website data.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| getWebsiteData | <code>function</code> | Get list of websites. |
| getWebsiteEntries | <code>function</code> | Get entries for a given website. |
| addWebsiteToDatabase | <code>function</code> | Add new website URL. |
| addScrapedDataToDatabase | <code>function</code> | Add scraped data for a website. |

