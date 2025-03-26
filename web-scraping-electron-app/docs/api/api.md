## Modules

<dl>
<dt><a href="#module_Database-AddEntry">Database-AddEntry</a></dt>
<dd><p>Demonstrates initializing Firebase and adding documents to Firestore.</p>
</dd>
<dt><a href="#module_Database-DeleteEntry">Database-DeleteEntry</a></dt>
<dd><p>Initializes Firebase and deletes specific documents from Firestore based on query conditions.</p>
</dd>
<dt><a href="#module_Database-FirebaseConfig">Database-FirebaseConfig</a></dt>
<dd><p>Initializes the Firebase app and analytics using provided configuration.</p>
</dd>
<dt><a href="#module_Database-FirebaseConnection">Database-FirebaseConnection</a></dt>
<dd><p>Initializes the Firebase app and Firestore database connection.</p>
</dd>
<dt><a href="#module_Database-ModifyEntry">Database-ModifyEntry</a></dt>
<dd><p>Initializes Firebase and modifies specific Firestore documents based on query conditions.</p>
</dd>
<dt><a href="#module_LabelStudioAPI">LabelStudioAPI</a></dt>
<dd><p>Provides utility functions for interacting with a linked Label Studio project.
Supports task export, project retrieval, and API credential management.</p>
</dd>
<dt><a href="#module_Logger">Logger</a></dt>
<dd><p>Configures and exports a centralized logger using electron-log.
Provides consistent logging format and settings for both file and console output.</p>
</dd>
<dt><a href="#module_Sanitizer">Sanitizer</a></dt>
<dd><p>Provides utilities to sanitize text input using customizable protocols and mappings.
Includes HTML and SQL sanitization presets.</p>
</dd>
<dt><a href="#module_ElectronApp">ElectronApp</a></dt>
<dd><p>Entry point for the ElectronJS application. Handles window creation, logging, database interaction, and IPC communication.</p>
</dd>
<dt><a href="#module_Renderer-AnnoWebview">Renderer-AnnoWebview</a></dt>
<dd><p>Renderer script for the Label Studio annotation external window.
Handles applying the selected theme, setting the webview source to the LS URL,
and notifying the main window when navigation changes occur.</p>
</dd>
<dt><a href="#module_Preload-ScrapeWebview">Preload-ScrapeWebview</a></dt>
<dd><p>Preload script for the scrape webview in the Electron application.
This script runs in the context of the webview and is responsible for:</p>
<ul>
<li>Managing selection modes (manual and auto) for scraping text content.</li>
<li>Tracking keyboard and mouse input (e.g., hotkey selection, cursor location).</li>
<li>Highlighting DOM elements for scraping and filtering non-textual content.</li>
<li>Communicating with the renderer process via <code>ipcRenderer.sendToHost</code>.</li>
<li>Handling data extraction from the DOM (single and multi-element selections).</li>
<li>Ensuring secure and controlled interactions inside the webview sandbox.</li>
</ul>
<p>The script uses a custom hotkey to trigger element selection and tracks
current selection state to prepare data for export.</p>
</dd>
<dt><a href="#module_Renderer-ScrapeWebview">Renderer-ScrapeWebview</a></dt>
<dd><p>Renderer script for the scraping webview window in the Electron app.</p>
<p>This module:</p>
<ul>
<li>Initializes the scrape window UI and theme</li>
<li>Supports toggling between manual and automatic scraping modes</li>
<li>Handles hotkey configuration for scraping</li>
<li>Receives scraped data from webview and exports it to the main process</li>
<li>Interacts with the webview element and listens for custom IPC messages</li>
</ul>
</dd>
<dt><a href="#module_PageController-About">PageController-About</a></dt>
<dd><p>Controls the behavior and initialization of the About page in the UI.</p>
</dd>
<dt><a href="#module_PageController-Annotation">PageController-Annotation</a></dt>
<dd><p>Controls the behavior and initialization of the Annotation page, including Label Studio integration.</p>
</dd>
<dt><a href="#module_PageController-Database">PageController-Database</a></dt>
<dd><p>Controls the behavior and interaction of the Database page UI in the Electron application. Handles page lifecycle, dynamic content insertion, event listeners, and logging.</p>
</dd>
<dt><a href="#module_PageController-Home">PageController-Home</a></dt>
<dd><p>Controls the behavior and initialization of the Home page in the UI.</p>
</dd>
<dt><a href="#module_PageController-Log">PageController-Log</a></dt>
<dd><p>Controls the behavior and initialization of the Log page in the UI.</p>
</dd>
<dt><a href="#module_PageController-Scrape">PageController-Scrape</a></dt>
<dd><p>Controls the behavior and initialization of Scrape page in the UI.</p>
</dd>
<dt><a href="#module_Renderer">Renderer</a></dt>
<dd><p>Initializes and controls the Electron renderer process.
Handles dynamic page loading, theme management, inter-process communication (IPC),
and user interface event handling.</p>
<p>This module initializes all UI components, listens for user actions,
manages navigation between views, and supports dynamic theme switching.</p>
<p>Logging is abstracted to the main process using contextBridge and ipcRenderer.</p>
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

<a name="module_Database-AddEntry"></a>

## Database-AddEntry
Demonstrates initializing Firebase and adding documents to Firestore.

**Requires**: <code>module:firebase/app</code>, <code>module:firebase/firestore</code>  
<a name="module_Database-AddEntry.firebaseConfig"></a>

### Database-AddEntry.firebaseConfig : <code>Object</code>
Firebase configuration for Group 8's Firestore instance.

**Kind**: static constant of [<code>Database-AddEntry</code>](#module_Database-AddEntry)  
<a name="module_Database-DeleteEntry"></a>

## Database-DeleteEntry
Initializes Firebase and deletes specific documents from Firestore based on query conditions.

**Requires**: <code>module:firebase/app</code>, <code>module:firebase/firestore</code>  
<a name="module_Database-DeleteEntry.firebaseConfig"></a>

### Database-DeleteEntry.firebaseConfig : <code>Object</code>
Firebase configuration for Group 8's Firestore instance.

**Kind**: static constant of [<code>Database-DeleteEntry</code>](#module_Database-DeleteEntry)  
<a name="module_Database-FirebaseConfig"></a>

## Database-FirebaseConfig
Initializes the Firebase app and analytics using provided configuration.

**Requires**: <code>module:firebase/app</code>, <code>module:firebase/analytics</code>  
<a name="module_Database-FirebaseConfig.firebaseConfig"></a>

### Database-FirebaseConfig.firebaseConfig : <code>Object</code>
Firebase configuration for Group 8's Firestore instance.

**Kind**: static constant of [<code>Database-FirebaseConfig</code>](#module_Database-FirebaseConfig)  
<a name="module_Database-FirebaseConnection"></a>

## Database-FirebaseConnection
Initializes the Firebase app and Firestore database connection.

**Requires**: <code>module:firebase/app</code>, <code>module:firebase/firestore</code>  
<a name="module_Database-FirebaseConnection.firebaseConfig"></a>

### Database-FirebaseConnection.firebaseConfig : <code>Object</code>
Firebase configuration for Group 8's Firestore instance.

**Kind**: static constant of [<code>Database-FirebaseConnection</code>](#module_Database-FirebaseConnection)  
<a name="module_Database-ModifyEntry"></a>

## Database-ModifyEntry
Initializes Firebase and modifies specific Firestore documents based on query conditions.

**Requires**: <code>module:firebase/app</code>, <code>module:firebase/firestore</code>  
<a name="module_Database-ModifyEntry.firebaseConfig"></a>

### Database-ModifyEntry.firebaseConfig : <code>Object</code>
Firebase configuration for Group 8's Firestore instance.

**Kind**: static constant of [<code>Database-ModifyEntry</code>](#module_Database-ModifyEntry)  
<a name="module_LabelStudioAPI"></a>

## LabelStudioAPI
Provides utility functions for interacting with a linked Label Studio project.Supports task export, project retrieval, and API credential management.

**Requires**: <code>module:axios</code>  

* [LabelStudioAPI](#module_LabelStudioAPI)
    * [.RequestType](#module_LabelStudioAPI.RequestType) : <code>enum</code>
    * [.requestHeader()](#module_LabelStudioAPI.requestHeader) ⇒ <code>Object</code>
    * [.formatProjectData(response)](#module_LabelStudioAPI.formatProjectData) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getProjects()](#module_LabelStudioAPI.getProjects) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.makeRequestToLS(requestJSON, requestType)](#module_LabelStudioAPI.makeRequestToLS) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.formatTextData(textData)](#module_LabelStudioAPI.formatTextData) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>null</code>
    * [.formatDataArr(dataArr)](#module_LabelStudioAPI.formatDataArr) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>null</code>
    * [.requestJSON(rawData, projectID)](#module_LabelStudioAPI.requestJSON) ⇒ <code>Object</code>
    * [.exportDataToLS(rawData, projectID)](#module_LabelStudioAPI.exportDataToLS) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateLinkedLSProject(url)](#module_LabelStudioAPI.updateLinkedLSProject) ⇒ <code>void</code>
    * [.updateAPIToken(token)](#module_LabelStudioAPI.updateAPIToken) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.clearLinkedLSProject()](#module_LabelStudioAPI.clearLinkedLSProject) ⇒ <code>Object</code>

<a name="module_LabelStudioAPI.RequestType"></a>

### LabelStudioAPI.RequestType : <code>enum</code>
Enum for Label Studio API request types.

**Kind**: static enum of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| GetProjects | <code>Object</code> | <code>{&quot;id&quot;:0,&quot;name&quot;:&quot;GetProjects&quot;,&quot;successMsg&quot;:&quot;Project List Successfully Retrieved from Label Studio&quot;,&quot;failMsg&quot;:&quot;Failed to Retrieve Project List from Label Studio&quot;}</code> | 
| ExportTasks | <code>Object</code> | <code>{&quot;id&quot;:1,&quot;name&quot;:&quot;ExportTasks&quot;,&quot;successMsg&quot;:&quot;Data Successfully Exported to Label Studio&quot;,&quot;failMsg&quot;:&quot;Error Exporting Scraped Data to Label Studio&quot;}</code> | 

<a name="module_LabelStudioAPI.requestHeader"></a>

### LabelStudioAPI.requestHeader() ⇒ <code>Object</code>
Generate request headers for authenticated Label Studio API calls.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Object</code> - Header object with Content-Type and Authorization.  
<a name="module_LabelStudioAPI.formatProjectData"></a>

### LabelStudioAPI.formatProjectData(response) ⇒ <code>Array.&lt;Object&gt;</code>
Format the response data from Label Studio's projects API.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Array.&lt;Object&gt;</code> - Formatted array of project info with `id` and `project_name`.  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | Raw response object from Label Studio API. |

<a name="module_LabelStudioAPI.getProjects"></a>

### LabelStudioAPI.getProjects() ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieve all Label Studio projects linked via current API token and URL.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - JSON response with project list or error.  
<a name="module_LabelStudioAPI.makeRequestToLS"></a>

### LabelStudioAPI.makeRequestToLS(requestJSON, requestType) ⇒ <code>Promise.&lt;Object&gt;</code>
Make an HTTP request to the Label Studio API.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - JSON response with status, message, and data.  

| Param | Type | Description |
| --- | --- | --- |
| requestJSON | <code>Object</code> | Axios request configuration. |
| requestType | <code>Object</code> | Type of request from `RequestType` enum. |

<a name="module_LabelStudioAPI.formatTextData"></a>

### LabelStudioAPI.formatTextData(textData) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>null</code>
Format raw text into an array of sentences for task export.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Array.&lt;Object&gt;</code> \| <code>null</code> - Array of { text: sentence } objects or null if input is empty.  

| Param | Type | Description |
| --- | --- | --- |
| textData | <code>string</code> | Raw text to be split and formatted. |

<a name="module_LabelStudioAPI.formatDataArr"></a>

### LabelStudioAPI.formatDataArr(dataArr) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>null</code>
Format an array of raw data objects for Label Studio import.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Array.&lt;Object&gt;</code> \| <code>null</code> - Array of formatted { text: sentence } objects or null.  

| Param | Type | Description |
| --- | --- | --- |
| dataArr | <code>Array.&lt;Object&gt;</code> | Array with `textData` fields. |

<a name="module_LabelStudioAPI.requestJSON"></a>

### LabelStudioAPI.requestJSON(rawData, projectID) ⇒ <code>Object</code>
Create a POST request object for importing tasks into Label Studio.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Object</code> - Axios-compatible request object.  
**Throws**:

- <code>Error</code> If rawData is null or invalid.


| Param | Type | Description |
| --- | --- | --- |
| rawData | <code>Array.&lt;Object&gt;</code> | Formatted data array. |
| projectID | <code>string</code> | Target Label Studio project ID. |

<a name="module_LabelStudioAPI.exportDataToLS"></a>

### LabelStudioAPI.exportDataToLS(rawData, projectID) ⇒ <code>Promise.&lt;Object&gt;</code>
Export task data to a specific Label Studio project.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - JSON response indicating success or failure.  

| Param | Type | Description |
| --- | --- | --- |
| rawData | <code>Array.&lt;Object&gt;</code> | Raw task data with `textData`. |
| projectID | <code>string</code> | Target project ID. |

<a name="module_LabelStudioAPI.updateLinkedLSProject"></a>

### LabelStudioAPI.updateLinkedLSProject(url) ⇒ <code>void</code>
Update the base URL for the linked Label Studio instance.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | New Label Studio base URL. |

<a name="module_LabelStudioAPI.updateAPIToken"></a>

### LabelStudioAPI.updateAPIToken(token) ⇒ <code>Promise.&lt;Object&gt;</code>
Update the API token for authenticated requests and fetch available projects.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - JSON response with updated project list.  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | New API token. |

<a name="module_LabelStudioAPI.clearLinkedLSProject"></a>

### LabelStudioAPI.clearLinkedLSProject() ⇒ <code>Object</code>
Clear the stored base URL and API token for the Label Studio instance.

**Kind**: static method of [<code>LabelStudioAPI</code>](#module_LabelStudioAPI)  
**Returns**: <code>Object</code> - JSON object with `ok: true` and `data: null`.  
<a name="module_Logger"></a>

## Logger
Configures and exports a centralized logger using electron-log.Provides consistent logging format and settings for both file and console output.

**See**: [electron-log documentation](https://github.com/megahertz/electron-log)  

* [Logger](#module_Logger)
    * [.module.exports](#module_Logger.module.exports) ⇒ <code>Object</code>
    * [.Config](#module_Logger.Config) : <code>object</code>
        * [.log.transports.file.level](#module_Logger.Config.log.transports.file.level) : <code>string</code>
        * [.log.transports.file.format](#module_Logger.Config.log.transports.file.format) : <code>string</code>
        * [.log.transports.console.format](#module_Logger.Config.log.transports.console.format) : <code>string</code>
        * [.log.transports.file.maxSize](#module_Logger.Config.log.transports.file.maxSize) : <code>number</code>

<a name="module_Logger.module.exports"></a>

### Logger.module.exports ⇒ <code>Object</code>
Exports the configured logger instance.

**Kind**: static property of [<code>Logger</code>](#module_Logger)  
**Returns**: <code>Object</code> - The configured electron-log instance.  
<a name="module_Logger.Config"></a>

### Logger.Config : <code>object</code>
Logger configuration settings.Defines log levels, formats, and file size limits for both file and console output.

**Kind**: static namespace of [<code>Logger</code>](#module_Logger)  

* [.Config](#module_Logger.Config) : <code>object</code>
    * [.log.transports.file.level](#module_Logger.Config.log.transports.file.level) : <code>string</code>
    * [.log.transports.file.format](#module_Logger.Config.log.transports.file.format) : <code>string</code>
    * [.log.transports.console.format](#module_Logger.Config.log.transports.console.format) : <code>string</code>
    * [.log.transports.file.maxSize](#module_Logger.Config.log.transports.file.maxSize) : <code>number</code>

<a name="module_Logger.Config.log.transports.file.level"></a>

#### Config.log.transports.file.level : <code>string</code>
Sets the log level for file output.Options: 'debug', 'info', 'warn', 'error'.Default is 'debug'.

**Kind**: static property of [<code>Config</code>](#module_Logger.Config)  
<a name="module_Logger.Config.log.transports.file.format"></a>

#### Config.log.transports.file.format : <code>string</code>
Defines the log format for file output.Format: `{y}-{m}-{d} {h}:{i}:{s} [{level}] {text}`

**Kind**: static property of [<code>Config</code>](#module_Logger.Config)  
<a name="module_Logger.Config.log.transports.console.format"></a>

#### Config.log.transports.console.format : <code>string</code>
Defines the log format for console output.Format: `{h}:{i}:{s} [{level}] {text}`

**Kind**: static property of [<code>Config</code>](#module_Logger.Config)  
<a name="module_Logger.Config.log.transports.file.maxSize"></a>

#### Config.log.transports.file.maxSize : <code>number</code>
Limits log file size to 5 MB per file to prevent disk space issues.

**Kind**: static property of [<code>Config</code>](#module_Logger.Config)  
<a name="module_Sanitizer"></a>

## Sanitizer
Provides utilities to sanitize text input using customizable protocols and mappings.Includes HTML and SQL sanitization presets.


* [Sanitizer](#module_Sanitizer)
    * [.Sanitizer](#module_Sanitizer.Sanitizer)
        * [new Sanitizer(input, sanitizeProtocol, [expressionMap])](#new_module_Sanitizer.Sanitizer_new)
        * [.getInput()](#module_Sanitizer.Sanitizer.getInput) ⇒ <code>string</code>
        * [.setInput(input)](#module_Sanitizer.Sanitizer.setInput) ⇒ <code>void</code>
        * [.getProtocol()](#module_Sanitizer.Sanitizer.getProtocol) ⇒ <code>SanitizeProtocol</code>
        * [.setProtocol(sanitizeProtocol)](#module_Sanitizer.Sanitizer.setProtocol) ⇒ <code>void</code>
        * [.getExpressionMap()](#module_Sanitizer.Sanitizer.getExpressionMap) ⇒ <code>Object.&lt;string, string&gt;</code>
        * [.setExpressionMap(expressionMap)](#module_Sanitizer.Sanitizer.setExpressionMap) ⇒ <code>void</code>
        * [.addToExpressionMap(key, value)](#module_Sanitizer.Sanitizer.addToExpressionMap) ⇒ <code>void</code>
        * [.htmlMode()](#module_Sanitizer.Sanitizer.htmlMode) ⇒ <code>void</code>
        * [.sqlMode()](#module_Sanitizer.Sanitizer.sqlMode) ⇒ <code>void</code>
        * [.sanitize([input])](#module_Sanitizer.Sanitizer.sanitize) ⇒ <code>string</code>
        * [.removeTags([input], [alsoSanitize])](#module_Sanitizer.Sanitizer.removeTags) ⇒ <code>string</code>
    * [.SanitizeProtocol](#module_Sanitizer.SanitizeProtocol)
        * [new SanitizeProtocol()](#new_module_Sanitizer.SanitizeProtocol_new)
        * [.sanitize(textToSanitize)](#module_Sanitizer.SanitizeProtocol.sanitize) ⇒ <code>string</code>

<a name="module_Sanitizer.Sanitizer"></a>

### Sanitizer.Sanitizer
Class representing a text sanitizer.Apply custom sanitization protocols or use presets for HTML/SQL.

**Kind**: static class of [<code>Sanitizer</code>](#module_Sanitizer)  

* [.Sanitizer](#module_Sanitizer.Sanitizer)
    * [new Sanitizer(input, sanitizeProtocol, [expressionMap])](#new_module_Sanitizer.Sanitizer_new)
    * [.getInput()](#module_Sanitizer.Sanitizer.getInput) ⇒ <code>string</code>
    * [.setInput(input)](#module_Sanitizer.Sanitizer.setInput) ⇒ <code>void</code>
    * [.getProtocol()](#module_Sanitizer.Sanitizer.getProtocol) ⇒ <code>SanitizeProtocol</code>
    * [.setProtocol(sanitizeProtocol)](#module_Sanitizer.Sanitizer.setProtocol) ⇒ <code>void</code>
    * [.getExpressionMap()](#module_Sanitizer.Sanitizer.getExpressionMap) ⇒ <code>Object.&lt;string, string&gt;</code>
    * [.setExpressionMap(expressionMap)](#module_Sanitizer.Sanitizer.setExpressionMap) ⇒ <code>void</code>
    * [.addToExpressionMap(key, value)](#module_Sanitizer.Sanitizer.addToExpressionMap) ⇒ <code>void</code>
    * [.htmlMode()](#module_Sanitizer.Sanitizer.htmlMode) ⇒ <code>void</code>
    * [.sqlMode()](#module_Sanitizer.Sanitizer.sqlMode) ⇒ <code>void</code>
    * [.sanitize([input])](#module_Sanitizer.Sanitizer.sanitize) ⇒ <code>string</code>
    * [.removeTags([input], [alsoSanitize])](#module_Sanitizer.Sanitizer.removeTags) ⇒ <code>string</code>

<a name="new_module_Sanitizer.Sanitizer_new"></a>

#### new Sanitizer(input, sanitizeProtocol, [expressionMap])
Create a Sanitizer instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | The text to sanitize. |
| sanitizeProtocol | <code>SanitizeProtocol</code> |  | The protocol describing character replacements. |
| [expressionMap] | <code>Object.&lt;string, string&gt;</code> | <code>{}</code> | Additional expression mappings for replacement. |

**Example**  
```js
const s = new Sanitizer('<li class="%toggle %"\'ESCAPE^>', new SanitizeProtocol(), {  "ESCAPE": "escape",  "toggle": "TOGGLE"});const sanitized = s.sanitize();
```
<a name="module_Sanitizer.Sanitizer.getInput"></a>

#### Sanitizer.getInput() ⇒ <code>string</code>
Get the current input text to be sanitized.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  
**Returns**: <code>string</code> - The current input text.  
<a name="module_Sanitizer.Sanitizer.setInput"></a>

#### Sanitizer.setInput(input) ⇒ <code>void</code>
Set the input text to be sanitized.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | New input text. |

<a name="module_Sanitizer.Sanitizer.getProtocol"></a>

#### Sanitizer.getProtocol() ⇒ <code>SanitizeProtocol</code>
Get the current sanitization protocol.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  
**Returns**: <code>SanitizeProtocol</code> - The current sanitize protocol instance.  
<a name="module_Sanitizer.Sanitizer.setProtocol"></a>

#### Sanitizer.setProtocol(sanitizeProtocol) ⇒ <code>void</code>
Set a new sanitization protocol.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  

| Param | Type | Description |
| --- | --- | --- |
| sanitizeProtocol | <code>SanitizeProtocol</code> | New protocol instance to apply. |

<a name="module_Sanitizer.Sanitizer.getExpressionMap"></a>

#### Sanitizer.getExpressionMap() ⇒ <code>Object.&lt;string, string&gt;</code>
Get the current expression map used for additional string replacements.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  
**Returns**: <code>Object.&lt;string, string&gt;</code> - The current expression map.  
<a name="module_Sanitizer.Sanitizer.setExpressionMap"></a>

#### Sanitizer.setExpressionMap(expressionMap) ⇒ <code>void</code>
Set a new expression map for additional replacements.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  

| Param | Type | Description |
| --- | --- | --- |
| expressionMap | <code>Object.&lt;string, string&gt;</code> | New mapping of expressions to replacements. |

<a name="module_Sanitizer.Sanitizer.addToExpressionMap"></a>

#### Sanitizer.addToExpressionMap(key, value) ⇒ <code>void</code>
Add a key-value pair to the expression map.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Expression to be replaced. |
| value | <code>string</code> | Replacement string. |

<a name="module_Sanitizer.Sanitizer.htmlMode"></a>

#### Sanitizer.htmlMode() ⇒ <code>void</code>
Use preset settings to sanitize HTML by escaping common special characters.Replaces characters like `<`, `>`, `&`, `'`, and `"` with their HTML-encoded equivalents.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  
<a name="module_Sanitizer.Sanitizer.sqlMode"></a>

#### Sanitizer.sqlMode() ⇒ <code>void</code>
Use preset settings to sanitize SQL by escaping special characters and expressions.Prevents SQL injection vulnerabilities by encoding characters like `%`, `_`, `'`, `/`, and brackets.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  
<a name="module_Sanitizer.Sanitizer.sanitize"></a>

#### Sanitizer.sanitize([input]) ⇒ <code>string</code>
Sanitize text using the configured protocol and expression map.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  
**Returns**: <code>string</code> - The sanitized text.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [input] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Optional input. Defaults to constructor input. |

<a name="module_Sanitizer.Sanitizer.removeTags"></a>

#### Sanitizer.removeTags([input], [alsoSanitize]) ⇒ <code>string</code>
Remove HTML tags from input text. Optionally applies sanitization afterward.

**Kind**: static method of [<code>Sanitizer</code>](#module_Sanitizer.Sanitizer)  
**Returns**: <code>string</code> - The processed text, with HTML tags removed and optionally sanitized.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [input] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Optional input text. Defaults to constructor input if empty. |
| [alsoSanitize] | <code>boolean</code> | <code>true</code> | Whether to apply `sanitize()` after tag removal. |

<a name="module_Sanitizer.SanitizeProtocol"></a>

### Sanitizer.SanitizeProtocol
Class representing a sanitization protocol using regular expressions and replacement mappings.Used by Sanitizer to apply transformations.

**Kind**: static class of [<code>Sanitizer</code>](#module_Sanitizer)  

* [.SanitizeProtocol](#module_Sanitizer.SanitizeProtocol)
    * [new SanitizeProtocol()](#new_module_Sanitizer.SanitizeProtocol_new)
    * [.sanitize(textToSanitize)](#module_Sanitizer.SanitizeProtocol.sanitize) ⇒ <code>string</code>

<a name="new_module_Sanitizer.SanitizeProtocol_new"></a>

#### new SanitizeProtocol()
**Example**  
```js
const protocol = new SanitizeProtocol("[&<>]", { '&': '&amp;', '<': '&lt;', '>': '&gt;' });const result = protocol.sanitize("<div>Test</div>"); // "&lt;div&gt;Test&lt;/div&gt;"
```
<a name="module_Sanitizer.SanitizeProtocol.sanitize"></a>

#### SanitizeProtocol.sanitize(textToSanitize) ⇒ <code>string</code>
Sanitize text using the internal regex and replacement mappings.

**Kind**: static method of [<code>SanitizeProtocol</code>](#module_Sanitizer.SanitizeProtocol)  
**Returns**: <code>string</code> - Sanitized output text.  

| Param | Type | Description |
| --- | --- | --- |
| textToSanitize | <code>string</code> | Input text to be sanitized. |

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
<a name="module_Renderer-AnnoWebview"></a>

## Renderer-AnnoWebview
Renderer script for the Label Studio annotation external window.Handles applying the selected theme, setting the webview source to the LS URL,and notifying the main window when navigation changes occur.

<a name="module_Preload-ScrapeWebview"></a>

## Preload-ScrapeWebview
Preload script for the scrape webview in the Electron application.This script runs in the context of the webview and is responsible for:- Managing selection modes (manual and auto) for scraping text content.- Tracking keyboard and mouse input (e.g., hotkey selection, cursor location).- Highlighting DOM elements for scraping and filtering non-textual content.- Communicating with the renderer process via `ipcRenderer.sendToHost`.- Handling data extraction from the DOM (single and multi-element selections).- Ensuring secure and controlled interactions inside the webview sandbox.The script uses a custom hotkey to trigger element selection and trackscurrent selection state to prepare data for export.

**See**

- window.urlScrape – Communication bridge with the main renderer.
- Electron ipcRenderer – For sending messages between contexts.


* [Preload-ScrapeWebview](#module_Preload-ScrapeWebview)
    * [.delay(timeDelay)](#module_Preload-ScrapeWebview.delay) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.formIndivDataResObj(dataURL, textData)](#module_Preload-ScrapeWebview.formIndivDataResObj) ⇒
    * [.manualTextScrape()](#module_Preload-ScrapeWebview.manualTextScrape) ⇒
    * [.getSelectedText()](#module_Preload-ScrapeWebview.getSelectedText) ⇒
    * [.selectedTextCheck()](#module_Preload-ScrapeWebview.selectedTextCheck)
    * [.clearTextSelection()](#module_Preload-ScrapeWebview.clearTextSelection)
    * [.selectedElementsCheck()](#module_Preload-ScrapeWebview.selectedElementsCheck)
    * [.initKeyMouseEventListeners()](#module_Preload-ScrapeWebview.initKeyMouseEventListeners)
    * [.checkAncestorSelected(element)](#module_Preload-ScrapeWebview.checkAncestorSelected) ⇒
    * [.hoveredElement(element)](#module_Preload-ScrapeWebview.hoveredElement)
    * [.releaseHoveredElement()](#module_Preload-ScrapeWebview.releaseHoveredElement)
    * [.selectElement(element)](#module_Preload-ScrapeWebview.selectElement)
    * [.deselectElement(element)](#module_Preload-ScrapeWebview.deselectElement)
    * [.deselectAllElements()](#module_Preload-ScrapeWebview.deselectAllElements)
    * [.processSelectedElems()](#module_Preload-ScrapeWebview.processSelectedElems) ⇒
    * [.combineSelToResObj()](#module_Preload-ScrapeWebview.combineSelToResObj) ⇒
    * [.indivSelToResObk()](#module_Preload-ScrapeWebview.indivSelToResObk) ⇒
    * [.makeLog(log)](#module_Preload-ScrapeWebview.makeLog)

<a name="module_Preload-ScrapeWebview.delay"></a>

### Preload-ScrapeWebview.delay(timeDelay) ⇒ <code>Promise.&lt;void&gt;</code>
Utility function to create a delay.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  

| Param | Type | Description |
| --- | --- | --- |
| timeDelay | <code>number</code> | Delay in milliseconds. |

<a name="module_Preload-ScrapeWebview.formIndivDataResObj"></a>

### Preload-ScrapeWebview.formIndivDataResObj(dataURL, textData) ⇒
Forms an individual data object for a single piece of text data (with the associated URL).

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
**Returns**: JSONObject      The data object with the data.  

| Param | Type | Description |
| --- | --- | --- |
| dataURL | <code>\*</code> | String        The url the data was taken from. |
| textData | <code>\*</code> | String       The data. |

<a name="module_Preload-ScrapeWebview.manualTextScrape"></a>

### Preload-ScrapeWebview.manualTextScrape() ⇒
Forms a response object to return selected data from manual scrape to the main process.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
**Returns**: JSONObject      The response with the data.  
<a name="module_Preload-ScrapeWebview.getSelectedText"></a>

### Preload-ScrapeWebview.getSelectedText() ⇒
Function to get the currently selected text in the webview

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
**Returns**: Array      The formatted response object.  
<a name="module_Preload-ScrapeWebview.selectedTextCheck"></a>

### Preload-ScrapeWebview.selectedTextCheck()
Checks if there is currently text selected and either enables or diables the import button.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
<a name="module_Preload-ScrapeWebview.clearTextSelection"></a>

### Preload-ScrapeWebview.clearTextSelection()
Clears currently highlighted text (manual mode).

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
<a name="module_Preload-ScrapeWebview.selectedElementsCheck"></a>

### Preload-ScrapeWebview.selectedElementsCheck()
Checks if there are elements that are currently highlighted.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
<a name="module_Preload-ScrapeWebview.initKeyMouseEventListeners"></a>

### Preload-ScrapeWebview.initKeyMouseEventListeners()
This will initialize listeners that dynamically track whether text is selected or not.NOTE: Setting these three event listeners ensures that it is always checking whether text is selected.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
<a name="module_Preload-ScrapeWebview.checkAncestorSelected"></a>

### Preload-ScrapeWebview.checkAncestorSelected(element) ⇒
Used to filter out text data when a child element is elected along with their parent element.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
**Returns**: Boolean         If the elements parent is selected.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to be checked. |

<a name="module_Preload-ScrapeWebview.hoveredElement"></a>

### Preload-ScrapeWebview.hoveredElement(element)
Applies a hovered 'highlight' effect.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element hovered. |

<a name="module_Preload-ScrapeWebview.releaseHoveredElement"></a>

### Preload-ScrapeWebview.releaseHoveredElement()
Removes the hovered effect.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
<a name="module_Preload-ScrapeWebview.selectElement"></a>

### Preload-ScrapeWebview.selectElement(element)
Applies a selected effect to elements that are selected when in auto mode.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to be selected. |

<a name="module_Preload-ScrapeWebview.deselectElement"></a>

### Preload-ScrapeWebview.deselectElement(element)
Removes the selected effect from a selected element.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to be deselected. |

<a name="module_Preload-ScrapeWebview.deselectAllElements"></a>

### Preload-ScrapeWebview.deselectAllElements()
Removes the selected effect from all selected elements.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
<a name="module_Preload-ScrapeWebview.processSelectedElems"></a>

### Preload-ScrapeWebview.processSelectedElems() ⇒
Extracts the text data from all selected elements while also filtering out duplicate data.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
**Returns**: Array[String]       The array of text data.  
<a name="module_Preload-ScrapeWebview.combineSelToResObj"></a>

### Preload-ScrapeWebview.combineSelToResObj() ⇒
Combines all text data pulled from the page into a single data item.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
**Returns**: JSONObject          The response object containing the data.  
<a name="module_Preload-ScrapeWebview.indivSelToResObk"></a>

### Preload-ScrapeWebview.indivSelToResObk() ⇒
Extracts all text data pulled from the page into individual data items.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  
**Returns**: JSONObject          The response object containing the extracted data.  
<a name="module_Preload-ScrapeWebview.makeLog"></a>

### Preload-ScrapeWebview.makeLog(log)
Helper function to facilitate logs from within the webview context.

**Kind**: static method of [<code>Preload-ScrapeWebview</code>](#module_Preload-ScrapeWebview)  

| Param | Type | Description |
| --- | --- | --- |
| log | <code>\*</code> | String        The log. |

<a name="module_Renderer-ScrapeWebview"></a>

## Renderer-ScrapeWebview
Renderer script for the scraping webview window in the Electron app.This module:- Initializes the scrape window UI and theme- Supports toggling between manual and automatic scraping modes- Handles hotkey configuration for scraping- Receives scraped data from webview and exports it to the main process- Interacts with the webview element and listens for custom IPC messages

**Requires**: <code>module:window.urlScrape</code>, <code>module:window.databaseAPI</code>  
**Example**  
```js
// Manual mode selection$('#man-importCombBtn').on('click', () => webview.send('getSelected'));// Export dataconst data = getAllReadyData();exportDataToApp(JSON.stringify(data));
```

* [Renderer-ScrapeWebview](#module_Renderer-ScrapeWebview)
    * [.initScrapeWindow()](#module_Renderer-ScrapeWebview.initScrapeWindow)
    * [.initWinListeners()](#module_Renderer-ScrapeWebview.initWinListeners)
    * [.initScrapeUtilListeners()](#module_Renderer-ScrapeWebview.initScrapeUtilListeners)
    * [.initDataContainer()](#module_Renderer-ScrapeWebview.initDataContainer)
    * [.appendNewScrapedItem(data)](#module_Renderer-ScrapeWebview.appendNewScrapedItem)
    * [.addDataToDatabase()](#module_Renderer-ScrapeWebview.addDataToDatabase)
    * [.removeSelectedItems()](#module_Renderer-ScrapeWebview.removeSelectedItems)
    * [.clearScrapedList()](#module_Renderer-ScrapeWebview.clearScrapedList)
    * [.checkIfAnyActive()](#module_Renderer-ScrapeWebview.checkIfAnyActive) ⇒ <code>boolean</code>
    * [.getAllReadyData()](#module_Renderer-ScrapeWebview.getAllReadyData) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.enableManImportBtn()](#module_Renderer-ScrapeWebview.enableManImportBtn)
    * [.disableManImportBtn()](#module_Renderer-ScrapeWebview.disableManImportBtn)
    * [.enableAutoImportBtns()](#module_Renderer-ScrapeWebview.enableAutoImportBtns)
    * [.disableAutoImportBtns()](#module_Renderer-ScrapeWebview.disableAutoImportBtns)
    * [.enableWebview()](#module_Renderer-ScrapeWebview.enableWebview)
    * [.disableWebview()](#module_Renderer-ScrapeWebview.disableWebview)
    * [.disableModeSelector()](#module_Renderer-ScrapeWebview.disableModeSelector)
    * [.enableModeSelector()](#module_Renderer-ScrapeWebview.enableModeSelector)
    * [.hotKeySettingChanging()](#module_Renderer-ScrapeWebview.hotKeySettingChanging)
    * [.hotKeySettingNormal()](#module_Renderer-ScrapeWebview.hotKeySettingNormal)
    * [.hotkeyChangeRequested()](#module_Renderer-ScrapeWebview.hotkeyChangeRequested)
    * [.setHotKey(newHotKey)](#module_Renderer-ScrapeWebview.setHotKey)
    * [.exportDataToApp(data)](#module_Renderer-ScrapeWebview.exportDataToApp)

<a name="module_Renderer-ScrapeWebview.initScrapeWindow"></a>

### Renderer-ScrapeWebview.initScrapeWindow()
Initializes theme and hotkey settings when the scrape window loads.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.initWinListeners"></a>

### Renderer-ScrapeWebview.initWinListeners()
Initializes event listeners for window-specific UI elements.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.initScrapeUtilListeners"></a>

### Renderer-ScrapeWebview.initScrapeUtilListeners()
Initializes event listeners for scraping logic, interaction with webview, and hotkey controls.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.initDataContainer"></a>

### Renderer-ScrapeWebview.initDataContainer()
Initializes the data container UI elements and clear buttons.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.appendNewScrapedItem"></a>

### Renderer-ScrapeWebview.appendNewScrapedItem(data)
Appends new scraped data to the result list.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Array of data objects to display. |

<a name="module_Renderer-ScrapeWebview.addDataToDatabase"></a>

### Renderer-ScrapeWebview.addDataToDatabase()
Adds scraped data to the database and closes the window.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.removeSelectedItems"></a>

### Renderer-ScrapeWebview.removeSelectedItems()
Removes selected items from the scrape list.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.clearScrapedList"></a>

### Renderer-ScrapeWebview.clearScrapedList()
Clears all scraped data from the list and UI.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.checkIfAnyActive"></a>

### Renderer-ScrapeWebview.checkIfAnyActive() ⇒ <code>boolean</code>
Checks if any data items are currently selected.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
**Returns**: <code>boolean</code> - True if items are selected.  
<a name="module_Renderer-ScrapeWebview.getAllReadyData"></a>

### Renderer-ScrapeWebview.getAllReadyData() ⇒ <code>Array.&lt;Object&gt;</code>
Collects and returns all scraped data from the DOM.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
**Returns**: <code>Array.&lt;Object&gt;</code> - Scraped data array.  
<a name="module_Renderer-ScrapeWebview.enableManImportBtn"></a>

### Renderer-ScrapeWebview.enableManImportBtn()
Enables the manual import button.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.disableManImportBtn"></a>

### Renderer-ScrapeWebview.disableManImportBtn()
Disables the manual import button.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.enableAutoImportBtns"></a>

### Renderer-ScrapeWebview.enableAutoImportBtns()
Enables all auto import buttons.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.disableAutoImportBtns"></a>

### Renderer-ScrapeWebview.disableAutoImportBtns()
Disables all auto import buttons.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.enableWebview"></a>

### Renderer-ScrapeWebview.enableWebview()
Hides overlay, enabling interaction with the webview.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.disableWebview"></a>

### Renderer-ScrapeWebview.disableWebview()
Shows overlay, disabling interaction with the webview.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.disableModeSelector"></a>

### Renderer-ScrapeWebview.disableModeSelector()
Disables mode selector toggle.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.enableModeSelector"></a>

### Renderer-ScrapeWebview.enableModeSelector()
Enables mode selector toggle.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.hotKeySettingChanging"></a>

### Renderer-ScrapeWebview.hotKeySettingChanging()
Adjusts styles for hotkey change state.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.hotKeySettingNormal"></a>

### Renderer-ScrapeWebview.hotKeySettingNormal()
Resets styles after hotkey change.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.hotkeyChangeRequested"></a>

### Renderer-ScrapeWebview.hotkeyChangeRequested()
Initiates hotkey change mode.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  
<a name="module_Renderer-ScrapeWebview.setHotKey"></a>

### Renderer-ScrapeWebview.setHotKey(newHotKey)
Validates and sets new hotkey value.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  

| Param | Type | Description |
| --- | --- | --- |
| newHotKey | <code>string</code> | New hotkey to be set. |

<a name="module_Renderer-ScrapeWebview.exportDataToApp"></a>

### Renderer-ScrapeWebview.exportDataToApp(data)
Sends exported data to the main process.

**Kind**: static method of [<code>Renderer-ScrapeWebview</code>](#module_Renderer-ScrapeWebview)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | Data to be exported. |

<a name="module_PageController-About"></a>

## PageController-About
Controls the behavior and initialization of the About page in the UI.


* [PageController-About](#module_PageController-About)
    * [.AboutPageController](#module_PageController-About.AboutPageController)
        * [new AboutPageController()](#new_module_PageController-About.AboutPageController_new)
        * [.getHtmlCompPath()](#module_PageController-About.AboutPageController.getHtmlCompPath) ⇒ <code>string</code>
        * [.getName()](#module_PageController-About.AboutPageController.getName) ⇒ <code>string</code>
        * [.getCompID()](#module_PageController-About.AboutPageController.getCompID) ⇒ <code>string</code>
        * [.navbarName()](#module_PageController-About.AboutPageController.navbarName) ⇒ <code>string</code>
        * [.initPage()](#module_PageController-About.AboutPageController.initPage) ⇒ <code>void</code>
        * [.initPageListeners()](#module_PageController-About.AboutPageController.initPageListeners) ⇒ <code>void</code>
        * [.setPageActive()](#module_PageController-About.AboutPageController.setPageActive) ⇒ <code>void</code>
        * [.setPageInactive()](#module_PageController-About.AboutPageController.setPageInactive) ⇒ <code>void</code>
        * [.postAlert(alertMsg, [cause])](#module_PageController-About.AboutPageController.postAlert) ⇒ <code>void</code>
        * [.logInfo(message)](#module_PageController-About.AboutPageController.logInfo) ⇒ <code>void</code>
        * [.logDebug(message)](#module_PageController-About.AboutPageController.logDebug) ⇒ <code>void</code>
        * [.logWarn(message)](#module_PageController-About.AboutPageController.logWarn) ⇒ <code>void</code>
        * [.logError(message)](#module_PageController-About.AboutPageController.logError) ⇒ <code>void</code>

<a name="module_PageController-About.AboutPageController"></a>

### PageController-About.AboutPageController
**Kind**: static class of [<code>PageController-About</code>](#module_PageController-About)  

* [.AboutPageController](#module_PageController-About.AboutPageController)
    * [new AboutPageController()](#new_module_PageController-About.AboutPageController_new)
    * [.getHtmlCompPath()](#module_PageController-About.AboutPageController.getHtmlCompPath) ⇒ <code>string</code>
    * [.getName()](#module_PageController-About.AboutPageController.getName) ⇒ <code>string</code>
    * [.getCompID()](#module_PageController-About.AboutPageController.getCompID) ⇒ <code>string</code>
    * [.navbarName()](#module_PageController-About.AboutPageController.navbarName) ⇒ <code>string</code>
    * [.initPage()](#module_PageController-About.AboutPageController.initPage) ⇒ <code>void</code>
    * [.initPageListeners()](#module_PageController-About.AboutPageController.initPageListeners) ⇒ <code>void</code>
    * [.setPageActive()](#module_PageController-About.AboutPageController.setPageActive) ⇒ <code>void</code>
    * [.setPageInactive()](#module_PageController-About.AboutPageController.setPageInactive) ⇒ <code>void</code>
    * [.postAlert(alertMsg, [cause])](#module_PageController-About.AboutPageController.postAlert) ⇒ <code>void</code>
    * [.logInfo(message)](#module_PageController-About.AboutPageController.logInfo) ⇒ <code>void</code>
    * [.logDebug(message)](#module_PageController-About.AboutPageController.logDebug) ⇒ <code>void</code>
    * [.logWarn(message)](#module_PageController-About.AboutPageController.logWarn) ⇒ <code>void</code>
    * [.logError(message)](#module_PageController-About.AboutPageController.logError) ⇒ <code>void</code>

<a name="new_module_PageController-About.AboutPageController_new"></a>

#### new AboutPageController()
Controller for managing the Scrape page.

<a name="module_PageController-About.AboutPageController.getHtmlCompPath"></a>

#### AboutPageController.getHtmlCompPath() ⇒ <code>string</code>
Get the HTML component filepath for this page.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  
**Returns**: <code>string</code> - The HTML file path.  
<a name="module_PageController-About.AboutPageController.getName"></a>

#### AboutPageController.getName() ⇒ <code>string</code>
Get the name identifier for this page.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  
**Returns**: <code>string</code> - The page name.  
<a name="module_PageController-About.AboutPageController.getCompID"></a>

#### AboutPageController.getCompID() ⇒ <code>string</code>
Get the DOM container ID for this page component.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  
**Returns**: <code>string</code> - The component container ID.  
<a name="module_PageController-About.AboutPageController.navbarName"></a>

#### AboutPageController.navbarName() ⇒ <code>string</code>
Generate the capitalized navbar name for this page.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  
**Returns**: <code>string</code> - The navbar display name.  
<a name="module_PageController-About.AboutPageController.initPage"></a>

#### AboutPageController.initPage() ⇒ <code>void</code>
Initialize the About page.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  
<a name="module_PageController-About.AboutPageController.initPageListeners"></a>

#### AboutPageController.initPageListeners() ⇒ <code>void</code>
Initialize event listeners for this page's DOM elements.Handles UI interactions such as linking Label Studio projects and external window management.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  
<a name="module_PageController-About.AboutPageController.setPageActive"></a>

#### AboutPageController.setPageActive() ⇒ <code>void</code>
Set the Annotation page as active and visible in the UI.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  
<a name="module_PageController-About.AboutPageController.setPageInactive"></a>

#### AboutPageController.setPageInactive() ⇒ <code>void</code>
Deactivate the page, hide its content, and remove navigation highlight.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  
<a name="module_PageController-About.AboutPageController.postAlert"></a>

#### AboutPageController.postAlert(alertMsg, [cause]) ⇒ <code>void</code>
Display an alert message or error dialog, and log the event.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  

| Param | Type | Description |
| --- | --- | --- |
| alertMsg | <code>\*</code> | The message to display in the alert. |
| [cause] | <code>\*</code> | Optional cause of the alert, used for error dialogs. |

<a name="module_PageController-About.AboutPageController.logInfo"></a>

#### AboutPageController.logInfo(message) ⇒ <code>void</code>
Send an info log message to the main process.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-About.AboutPageController.logDebug"></a>

#### AboutPageController.logDebug(message) ⇒ <code>void</code>
Send a debug log message to the main process.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-About.AboutPageController.logWarn"></a>

#### AboutPageController.logWarn(message) ⇒ <code>void</code>
Send a warning log message to the main process.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-About.AboutPageController.logError"></a>

#### AboutPageController.logError(message) ⇒ <code>void</code>
Send an error log message to the main process.

**Kind**: static method of [<code>AboutPageController</code>](#module_PageController-About.AboutPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Annotation"></a>

## PageController-Annotation
Controls the behavior and initialization of the Annotation page, including Label Studio integration.


* [PageController-Annotation](#module_PageController-Annotation)
    * [.AnnotationPageController](#module_PageController-Annotation.AnnotationPageController)
        * [new AnnotationPageController()](#new_module_PageController-Annotation.AnnotationPageController_new)
        * [.getHtmlCompPath()](#module_PageController-Annotation.AnnotationPageController.getHtmlCompPath) ⇒ <code>string</code>
        * [.getName()](#module_PageController-Annotation.AnnotationPageController.getName) ⇒ <code>string</code>
        * [.getCompID()](#module_PageController-Annotation.AnnotationPageController.getCompID) ⇒ <code>string</code>
        * [.navbarName()](#module_PageController-Annotation.AnnotationPageController.navbarName) ⇒ <code>string</code>
        * [.initPage()](#module_PageController-Annotation.AnnotationPageController.initPage) ⇒ <code>void</code>
        * [.initPageListeners()](#module_PageController-Annotation.AnnotationPageController.initPageListeners) ⇒ <code>void</code>
        * [.setPageActive()](#module_PageController-Annotation.AnnotationPageController.setPageActive) ⇒ <code>void</code>
        * [.setPageInactive()](#module_PageController-Annotation.AnnotationPageController.setPageInactive) ⇒ <code>void</code>
        * [.postAlert(alertMsg, [cause])](#module_PageController-Annotation.AnnotationPageController.postAlert) ⇒ <code>void</code>
        * [.logInfo(message)](#module_PageController-Annotation.AnnotationPageController.logInfo) ⇒ <code>void</code>
        * [.logDebug(message)](#module_PageController-Annotation.AnnotationPageController.logDebug) ⇒ <code>void</code>
        * [.logWarn(message)](#module_PageController-Annotation.AnnotationPageController.logWarn) ⇒ <code>void</code>
        * [.logError(message)](#module_PageController-Annotation.AnnotationPageController.logError) ⇒ <code>void</code>
        * [.checkLSURL(url)](#module_PageController-Annotation.AnnotationPageController.checkLSURL) ⇒ <code>boolean</code>
        * [.initLSURL()](#module_PageController-Annotation.AnnotationPageController.initLSURL)
        * [.updateLSURL()](#module_PageController-Annotation.AnnotationPageController.updateLSURL)
        * [.updatedLSWebviewSrc(url)](#module_PageController-Annotation.AnnotationPageController.updatedLSWebviewSrc)
        * [.setLSURL(url)](#module_PageController-Annotation.AnnotationPageController.setLSURL)
        * [.updateLSAPIToken()](#module_PageController-Annotation.AnnotationPageController.updateLSAPIToken)
        * [.setLSAPIToken(token)](#module_PageController-Annotation.AnnotationPageController.setLSAPIToken)
        * [.clearLinkedLSProject()](#module_PageController-Annotation.AnnotationPageController.clearLinkedLSProject)
        * [.showLSEmbeddedFrame()](#module_PageController-Annotation.AnnotationPageController.showLSEmbeddedFrame)
        * [.hideLSEmbeddedFrame()](#module_PageController-Annotation.AnnotationPageController.hideLSEmbeddedFrame)

<a name="module_PageController-Annotation.AnnotationPageController"></a>

### PageController-Annotation.AnnotationPageController
**Kind**: static class of [<code>PageController-Annotation</code>](#module_PageController-Annotation)  

* [.AnnotationPageController](#module_PageController-Annotation.AnnotationPageController)
    * [new AnnotationPageController()](#new_module_PageController-Annotation.AnnotationPageController_new)
    * [.getHtmlCompPath()](#module_PageController-Annotation.AnnotationPageController.getHtmlCompPath) ⇒ <code>string</code>
    * [.getName()](#module_PageController-Annotation.AnnotationPageController.getName) ⇒ <code>string</code>
    * [.getCompID()](#module_PageController-Annotation.AnnotationPageController.getCompID) ⇒ <code>string</code>
    * [.navbarName()](#module_PageController-Annotation.AnnotationPageController.navbarName) ⇒ <code>string</code>
    * [.initPage()](#module_PageController-Annotation.AnnotationPageController.initPage) ⇒ <code>void</code>
    * [.initPageListeners()](#module_PageController-Annotation.AnnotationPageController.initPageListeners) ⇒ <code>void</code>
    * [.setPageActive()](#module_PageController-Annotation.AnnotationPageController.setPageActive) ⇒ <code>void</code>
    * [.setPageInactive()](#module_PageController-Annotation.AnnotationPageController.setPageInactive) ⇒ <code>void</code>
    * [.postAlert(alertMsg, [cause])](#module_PageController-Annotation.AnnotationPageController.postAlert) ⇒ <code>void</code>
    * [.logInfo(message)](#module_PageController-Annotation.AnnotationPageController.logInfo) ⇒ <code>void</code>
    * [.logDebug(message)](#module_PageController-Annotation.AnnotationPageController.logDebug) ⇒ <code>void</code>
    * [.logWarn(message)](#module_PageController-Annotation.AnnotationPageController.logWarn) ⇒ <code>void</code>
    * [.logError(message)](#module_PageController-Annotation.AnnotationPageController.logError) ⇒ <code>void</code>
    * [.checkLSURL(url)](#module_PageController-Annotation.AnnotationPageController.checkLSURL) ⇒ <code>boolean</code>
    * [.initLSURL()](#module_PageController-Annotation.AnnotationPageController.initLSURL)
    * [.updateLSURL()](#module_PageController-Annotation.AnnotationPageController.updateLSURL)
    * [.updatedLSWebviewSrc(url)](#module_PageController-Annotation.AnnotationPageController.updatedLSWebviewSrc)
    * [.setLSURL(url)](#module_PageController-Annotation.AnnotationPageController.setLSURL)
    * [.updateLSAPIToken()](#module_PageController-Annotation.AnnotationPageController.updateLSAPIToken)
    * [.setLSAPIToken(token)](#module_PageController-Annotation.AnnotationPageController.setLSAPIToken)
    * [.clearLinkedLSProject()](#module_PageController-Annotation.AnnotationPageController.clearLinkedLSProject)
    * [.showLSEmbeddedFrame()](#module_PageController-Annotation.AnnotationPageController.showLSEmbeddedFrame)
    * [.hideLSEmbeddedFrame()](#module_PageController-Annotation.AnnotationPageController.hideLSEmbeddedFrame)

<a name="new_module_PageController-Annotation.AnnotationPageController_new"></a>

#### new AnnotationPageController()
Controller for managing the Annotation page, including its UI interactions and Label Studio project linking.

<a name="module_PageController-Annotation.AnnotationPageController.getHtmlCompPath"></a>

#### AnnotationPageController.getHtmlCompPath() ⇒ <code>string</code>
Get the HTML component filepath for this page.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
**Returns**: <code>string</code> - The HTML file path.  
<a name="module_PageController-Annotation.AnnotationPageController.getName"></a>

#### AnnotationPageController.getName() ⇒ <code>string</code>
Get the name identifier for this page.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
**Returns**: <code>string</code> - The page name.  
<a name="module_PageController-Annotation.AnnotationPageController.getCompID"></a>

#### AnnotationPageController.getCompID() ⇒ <code>string</code>
Get the DOM container ID for this page component.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
**Returns**: <code>string</code> - The component container ID.  
<a name="module_PageController-Annotation.AnnotationPageController.navbarName"></a>

#### AnnotationPageController.navbarName() ⇒ <code>string</code>
Generate the capitalized navbar name for this page.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
**Returns**: <code>string</code> - The navbar display name.  
<a name="module_PageController-Annotation.AnnotationPageController.initPage"></a>

#### AnnotationPageController.initPage() ⇒ <code>void</code>
Initialize the Annotation page, load its HTML, and configure Label Studio project linking.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.initPageListeners"></a>

#### AnnotationPageController.initPageListeners() ⇒ <code>void</code>
Initialize event listeners for this page's DOM elements.Handles UI interactions such as linking Label Studio projects and external window management.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.setPageActive"></a>

#### AnnotationPageController.setPageActive() ⇒ <code>void</code>
Activate the page, display its content, and highlight its navigation link.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.setPageInactive"></a>

#### AnnotationPageController.setPageInactive() ⇒ <code>void</code>
Deactivate the page, hide its content, and remove navigation highlight.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.postAlert"></a>

#### AnnotationPageController.postAlert(alertMsg, [cause]) ⇒ <code>void</code>
Display an alert message or error dialog, and log the event.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  

| Param | Type | Description |
| --- | --- | --- |
| alertMsg | <code>\*</code> | The message to display in the alert. |
| [cause] | <code>\*</code> | Optional cause of the alert, used for error dialogs. |

<a name="module_PageController-Annotation.AnnotationPageController.logInfo"></a>

#### AnnotationPageController.logInfo(message) ⇒ <code>void</code>
Send an info log message to the main process.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Annotation.AnnotationPageController.logDebug"></a>

#### AnnotationPageController.logDebug(message) ⇒ <code>void</code>
Send a debug log message to the main process.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Annotation.AnnotationPageController.logWarn"></a>

#### AnnotationPageController.logWarn(message) ⇒ <code>void</code>
Send a warning log message to the main process.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Annotation.AnnotationPageController.logError"></a>

#### AnnotationPageController.logError(message) ⇒ <code>void</code>
Send an error log message to the main process.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Annotation.AnnotationPageController.checkLSURL"></a>

#### AnnotationPageController.checkLSURL(url) ⇒ <code>boolean</code>
Validate that the entered Label Studio URL is valid and secure (must use HTTPS and contain 'hf').

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
**Returns**: <code>boolean</code> - True if valid, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>\*</code> | The URL to validate. |

<a name="module_PageController-Annotation.AnnotationPageController.initLSURL"></a>

#### AnnotationPageController.initLSURL()
Handle submission of a new Label Studio URL and store it if valid.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.updateLSURL"></a>

#### AnnotationPageController.updateLSURL()
Update the stored Label Studio URL based on user input.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.updatedLSWebviewSrc"></a>

#### AnnotationPageController.updatedLSWebviewSrc(url)
Update the webview's displayed URL if it differs from the stored value.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>\*</code> | The new URL to display. |

<a name="module_PageController-Annotation.AnnotationPageController.setLSURL"></a>

#### AnnotationPageController.setLSURL(url)
Set the Label Studio project URL in local storage and update the embedded view.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>\*</code> | The Label Studio URL. |

<a name="module_PageController-Annotation.AnnotationPageController.updateLSAPIToken"></a>

#### AnnotationPageController.updateLSAPIToken()
Update the stored API token based on user input.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.setLSAPIToken"></a>

#### AnnotationPageController.setLSAPIToken(token)
Store a new API token and update the Label Studio API.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>\*</code> | The new API token. |

<a name="module_PageController-Annotation.AnnotationPageController.clearLinkedLSProject"></a>

#### AnnotationPageController.clearLinkedLSProject()
Clear the currently linked Label Studio project and reset related UI elements.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.showLSEmbeddedFrame"></a>

#### AnnotationPageController.showLSEmbeddedFrame()
Show the embedded Label Studio frame in the UI.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Annotation.AnnotationPageController.hideLSEmbeddedFrame"></a>

#### AnnotationPageController.hideLSEmbeddedFrame()
Hide the embedded Label Studio frame and show URL submission form.

**Kind**: static method of [<code>AnnotationPageController</code>](#module_PageController-Annotation.AnnotationPageController)  
<a name="module_PageController-Database"></a>

## PageController-Database
Controls the behavior and interaction of the Database page UI in the Electron application. Handles page lifecycle, dynamic content insertion, event listeners, and logging.


* [PageController-Database](#module_PageController-Database)
    * [.DatabasePageController](#module_PageController-Database.DatabasePageController)
        * [new DatabasePageController()](#new_module_PageController-Database.DatabasePageController_new)
        * [.getHtmlCompPath()](#module_PageController-Database.DatabasePageController.getHtmlCompPath) ⇒ <code>string</code>
        * [.getName()](#module_PageController-Database.DatabasePageController.getName) ⇒ <code>string</code>
        * [.getCompID()](#module_PageController-Database.DatabasePageController.getCompID) ⇒ <code>string</code>
        * [.navbarName()](#module_PageController-Database.DatabasePageController.navbarName) ⇒ <code>string</code>
        * [.initPage()](#module_PageController-Database.DatabasePageController.initPage) ⇒ <code>void</code>
        * [.initPageListeners()](#module_PageController-Database.DatabasePageController.initPageListeners) ⇒ <code>void</code>
        * [.setPageActive()](#module_PageController-Database.DatabasePageController.setPageActive) ⇒ <code>void</code>
        * [.setPageInactive()](#module_PageController-Database.DatabasePageController.setPageInactive) ⇒ <code>void</code>
        * [.postAlert(alertMsg, [cause])](#module_PageController-Database.DatabasePageController.postAlert) ⇒ <code>void</code>
        * [.logInfo(message)](#module_PageController-Database.DatabasePageController.logInfo) ⇒ <code>void</code>
        * [.logDebug(message)](#module_PageController-Database.DatabasePageController.logDebug) ⇒ <code>void</code>
        * [.logWarn(message)](#module_PageController-Database.DatabasePageController.logWarn) ⇒ <code>void</code>
        * [.logError(message)](#module_PageController-Database.DatabasePageController.logError) ⇒ <code>void</code>
        * [.displayWebsiteData()](#module_PageController-Database.DatabasePageController.displayWebsiteData) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_PageController-Database.DatabasePageController"></a>

### PageController-Database.DatabasePageController
**Kind**: static class of [<code>PageController-Database</code>](#module_PageController-Database)  

* [.DatabasePageController](#module_PageController-Database.DatabasePageController)
    * [new DatabasePageController()](#new_module_PageController-Database.DatabasePageController_new)
    * [.getHtmlCompPath()](#module_PageController-Database.DatabasePageController.getHtmlCompPath) ⇒ <code>string</code>
    * [.getName()](#module_PageController-Database.DatabasePageController.getName) ⇒ <code>string</code>
    * [.getCompID()](#module_PageController-Database.DatabasePageController.getCompID) ⇒ <code>string</code>
    * [.navbarName()](#module_PageController-Database.DatabasePageController.navbarName) ⇒ <code>string</code>
    * [.initPage()](#module_PageController-Database.DatabasePageController.initPage) ⇒ <code>void</code>
    * [.initPageListeners()](#module_PageController-Database.DatabasePageController.initPageListeners) ⇒ <code>void</code>
    * [.setPageActive()](#module_PageController-Database.DatabasePageController.setPageActive) ⇒ <code>void</code>
    * [.setPageInactive()](#module_PageController-Database.DatabasePageController.setPageInactive) ⇒ <code>void</code>
    * [.postAlert(alertMsg, [cause])](#module_PageController-Database.DatabasePageController.postAlert) ⇒ <code>void</code>
    * [.logInfo(message)](#module_PageController-Database.DatabasePageController.logInfo) ⇒ <code>void</code>
    * [.logDebug(message)](#module_PageController-Database.DatabasePageController.logDebug) ⇒ <code>void</code>
    * [.logWarn(message)](#module_PageController-Database.DatabasePageController.logWarn) ⇒ <code>void</code>
    * [.logError(message)](#module_PageController-Database.DatabasePageController.logError) ⇒ <code>void</code>
    * [.displayWebsiteData()](#module_PageController-Database.DatabasePageController.displayWebsiteData) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_module_PageController-Database.DatabasePageController_new"></a>

#### new DatabasePageController()
Controller for managing the Database page in the Electron application. Handles page rendering, dynamic data display, navigation control, and logging.

<a name="module_PageController-Database.DatabasePageController.getHtmlCompPath"></a>

#### DatabasePageController.getHtmlCompPath() ⇒ <code>string</code>
Get the HTML file path for this page.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
**Returns**: <code>string</code> - The HTML file path.  
<a name="module_PageController-Database.DatabasePageController.getName"></a>

#### DatabasePageController.getName() ⇒ <code>string</code>
Get the name identifier for this page.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
**Returns**: <code>string</code> - The page name.  
<a name="module_PageController-Database.DatabasePageController.getCompID"></a>

#### DatabasePageController.getCompID() ⇒ <code>string</code>
Get the DOM container ID for this page component.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
**Returns**: <code>string</code> - The component container ID.  
<a name="module_PageController-Database.DatabasePageController.navbarName"></a>

#### DatabasePageController.navbarName() ⇒ <code>string</code>
Generate the formatted navbar display name for this page.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
**Returns**: <code>string</code> - The navbar display name.  
<a name="module_PageController-Database.DatabasePageController.initPage"></a>

#### DatabasePageController.initPage() ⇒ <code>void</code>
Initialize the Database page by adding its navigation link and loading its HTML content.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
<a name="module_PageController-Database.DatabasePageController.initPageListeners"></a>

#### DatabasePageController.initPageListeners() ⇒ <code>void</code>
Initialize event listeners for this page's DOM elements.Handles UI interactions such as linking Label Studio projects and external window management.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
<a name="module_PageController-Database.DatabasePageController.setPageActive"></a>

#### DatabasePageController.setPageActive() ⇒ <code>void</code>
Activate the page, display its content, and highlight its navigation link.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
<a name="module_PageController-Database.DatabasePageController.setPageInactive"></a>

#### DatabasePageController.setPageInactive() ⇒ <code>void</code>
Deactivate the page, hide its content, and remove navigation highlight.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
<a name="module_PageController-Database.DatabasePageController.postAlert"></a>

#### DatabasePageController.postAlert(alertMsg, [cause]) ⇒ <code>void</code>
Display an alert message or error dialog, and log the event.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  

| Param | Type | Description |
| --- | --- | --- |
| alertMsg | <code>\*</code> | The message to display in the alert. |
| [cause] | <code>\*</code> | Optional cause of the alert, used for error dialogs. |

<a name="module_PageController-Database.DatabasePageController.logInfo"></a>

#### DatabasePageController.logInfo(message) ⇒ <code>void</code>
Send an info log message to the main process.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Database.DatabasePageController.logDebug"></a>

#### DatabasePageController.logDebug(message) ⇒ <code>void</code>
Send a debug log message to the main process.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Database.DatabasePageController.logWarn"></a>

#### DatabasePageController.logWarn(message) ⇒ <code>void</code>
Send a warning log message to the main process.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Database.DatabasePageController.logError"></a>

#### DatabasePageController.logError(message) ⇒ <code>void</code>
Send an error log message to the main process.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Database.DatabasePageController.displayWebsiteData"></a>

#### DatabasePageController.displayWebsiteData() ⇒ <code>Promise.&lt;void&gt;</code>
Retrieve and display website data and entries from the database in the UI.Each website is decoded and its entries are listed under it.Logs an error if the target DOM element is not found.

**Kind**: static method of [<code>DatabasePageController</code>](#module_PageController-Database.DatabasePageController)  
**Example**  
```js
const controller = new DatabasePageController();await controller.displayWebsiteData();
```
<a name="module_PageController-Home"></a>

## PageController-Home
Controls the behavior and initialization of the Home page in the UI.


* [PageController-Home](#module_PageController-Home)
    * [.HomePageController](#module_PageController-Home.HomePageController)
        * [new HomePageController()](#new_module_PageController-Home.HomePageController_new)
        * [.getHtmlCompPath()](#module_PageController-Home.HomePageController.getHtmlCompPath) ⇒ <code>string</code>
        * [.getName()](#module_PageController-Home.HomePageController.getName) ⇒ <code>string</code>
        * [.getCompID()](#module_PageController-Home.HomePageController.getCompID) ⇒ <code>string</code>
        * [.navbarName()](#module_PageController-Home.HomePageController.navbarName) ⇒ <code>string</code>
        * [.initPage()](#module_PageController-Home.HomePageController.initPage) ⇒ <code>void</code>
        * [.initPageListeners()](#module_PageController-Home.HomePageController.initPageListeners) ⇒ <code>void</code>
        * [.setPageActive()](#module_PageController-Home.HomePageController.setPageActive) ⇒ <code>void</code>
        * [.setPageInactive()](#module_PageController-Home.HomePageController.setPageInactive) ⇒ <code>void</code>
        * [.postAlert(alertMsg, [cause])](#module_PageController-Home.HomePageController.postAlert) ⇒ <code>void</code>
        * [.logInfo(message)](#module_PageController-Home.HomePageController.logInfo) ⇒ <code>void</code>
        * [.logDebug(message)](#module_PageController-Home.HomePageController.logDebug) ⇒ <code>void</code>
        * [.logWarn(message)](#module_PageController-Home.HomePageController.logWarn) ⇒ <code>void</code>
        * [.logError(message)](#module_PageController-Home.HomePageController.logError) ⇒ <code>void</code>

<a name="module_PageController-Home.HomePageController"></a>

### PageController-Home.HomePageController
**Kind**: static class of [<code>PageController-Home</code>](#module_PageController-Home)  

* [.HomePageController](#module_PageController-Home.HomePageController)
    * [new HomePageController()](#new_module_PageController-Home.HomePageController_new)
    * [.getHtmlCompPath()](#module_PageController-Home.HomePageController.getHtmlCompPath) ⇒ <code>string</code>
    * [.getName()](#module_PageController-Home.HomePageController.getName) ⇒ <code>string</code>
    * [.getCompID()](#module_PageController-Home.HomePageController.getCompID) ⇒ <code>string</code>
    * [.navbarName()](#module_PageController-Home.HomePageController.navbarName) ⇒ <code>string</code>
    * [.initPage()](#module_PageController-Home.HomePageController.initPage) ⇒ <code>void</code>
    * [.initPageListeners()](#module_PageController-Home.HomePageController.initPageListeners) ⇒ <code>void</code>
    * [.setPageActive()](#module_PageController-Home.HomePageController.setPageActive) ⇒ <code>void</code>
    * [.setPageInactive()](#module_PageController-Home.HomePageController.setPageInactive) ⇒ <code>void</code>
    * [.postAlert(alertMsg, [cause])](#module_PageController-Home.HomePageController.postAlert) ⇒ <code>void</code>
    * [.logInfo(message)](#module_PageController-Home.HomePageController.logInfo) ⇒ <code>void</code>
    * [.logDebug(message)](#module_PageController-Home.HomePageController.logDebug) ⇒ <code>void</code>
    * [.logWarn(message)](#module_PageController-Home.HomePageController.logWarn) ⇒ <code>void</code>
    * [.logError(message)](#module_PageController-Home.HomePageController.logError) ⇒ <code>void</code>

<a name="new_module_PageController-Home.HomePageController_new"></a>

#### new HomePageController()
Controller for managing the Home page.

<a name="module_PageController-Home.HomePageController.getHtmlCompPath"></a>

#### HomePageController.getHtmlCompPath() ⇒ <code>string</code>
Get the HTML file path for this page.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  
**Returns**: <code>string</code> - The HTML file path.  
<a name="module_PageController-Home.HomePageController.getName"></a>

#### HomePageController.getName() ⇒ <code>string</code>
Get the name identifier for this page.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  
**Returns**: <code>string</code> - The page name.  
<a name="module_PageController-Home.HomePageController.getCompID"></a>

#### HomePageController.getCompID() ⇒ <code>string</code>
Get the DOM container ID for this page component.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  
**Returns**: <code>string</code> - The component container ID.  
<a name="module_PageController-Home.HomePageController.navbarName"></a>

#### HomePageController.navbarName() ⇒ <code>string</code>
Generate the formatted navbar display name for this page.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  
**Returns**: <code>string</code> - The navbar display name.  
<a name="module_PageController-Home.HomePageController.initPage"></a>

#### HomePageController.initPage() ⇒ <code>void</code>
Initialize the Home page.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  
<a name="module_PageController-Home.HomePageController.initPageListeners"></a>

#### HomePageController.initPageListeners() ⇒ <code>void</code>
Initialize event listeners for this page's DOM elements.Handles UI interactions such as linking Label Studio projects and external window management.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  
<a name="module_PageController-Home.HomePageController.setPageActive"></a>

#### HomePageController.setPageActive() ⇒ <code>void</code>
Set the Annotation page as active and visible in the UI.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  
<a name="module_PageController-Home.HomePageController.setPageInactive"></a>

#### HomePageController.setPageInactive() ⇒ <code>void</code>
Deactivate the page, hide its content, and remove navigation highlight.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  
<a name="module_PageController-Home.HomePageController.postAlert"></a>

#### HomePageController.postAlert(alertMsg, [cause]) ⇒ <code>void</code>
Display an alert message or error dialog, and log the event.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  

| Param | Type | Description |
| --- | --- | --- |
| alertMsg | <code>\*</code> | The message to display in the alert. |
| [cause] | <code>\*</code> | Optional cause of the alert, used for error dialogs. |

<a name="module_PageController-Home.HomePageController.logInfo"></a>

#### HomePageController.logInfo(message) ⇒ <code>void</code>
Send an info log message to the main process.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Home.HomePageController.logDebug"></a>

#### HomePageController.logDebug(message) ⇒ <code>void</code>
Send a debug log message to the main process.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Home.HomePageController.logWarn"></a>

#### HomePageController.logWarn(message) ⇒ <code>void</code>
Send a warning log message to the main process.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Home.HomePageController.logError"></a>

#### HomePageController.logError(message) ⇒ <code>void</code>
Send an error log message to the main process.

**Kind**: static method of [<code>HomePageController</code>](#module_PageController-Home.HomePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Log"></a>

## PageController-Log
Controls the behavior and initialization of the Log page in the UI.


* [PageController-Log](#module_PageController-Log)
    * [.LogPageController](#module_PageController-Log.LogPageController)
        * [new LogPageController()](#new_module_PageController-Log.LogPageController_new)
        * [.getHtmlCompPath()](#module_PageController-Log.LogPageController.getHtmlCompPath) ⇒ <code>string</code>
        * [.getName()](#module_PageController-Log.LogPageController.getName) ⇒ <code>string</code>
        * [.getCompID()](#module_PageController-Log.LogPageController.getCompID) ⇒ <code>string</code>
        * [.navbarName()](#module_PageController-Log.LogPageController.navbarName) ⇒ <code>string</code>
        * [.initPage()](#module_PageController-Log.LogPageController.initPage) ⇒ <code>void</code>
        * [.initPageListeners()](#module_PageController-Log.LogPageController.initPageListeners) ⇒ <code>void</code>
        * [.setPageActive()](#module_PageController-Log.LogPageController.setPageActive) ⇒ <code>void</code>
        * [.setPageInactive()](#module_PageController-Log.LogPageController.setPageInactive) ⇒ <code>void</code>
        * [.postAlert(alertMsg, [cause])](#module_PageController-Log.LogPageController.postAlert) ⇒ <code>void</code>
        * [.logInfo(message)](#module_PageController-Log.LogPageController.logInfo) ⇒ <code>void</code>
        * [.logDebug(message)](#module_PageController-Log.LogPageController.logDebug) ⇒ <code>void</code>
        * [.logWarn(message)](#module_PageController-Log.LogPageController.logWarn) ⇒ <code>void</code>
        * [.logError(message)](#module_PageController-Log.LogPageController.logError) ⇒ <code>void</code>
        * [.requestLogs()](#module_PageController-Log.LogPageController.requestLogs) ⇒ <code>void</code>
        * [.localizeDateValue(dateObj)](#module_PageController-Log.LogPageController.localizeDateValue) ⇒ <code>string</code>
        * [.loadLogs()](#module_PageController-Log.LogPageController.loadLogs) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.addLogLine(logs)](#module_PageController-Log.LogPageController.addLogLine) ⇒ <code>void</code>
        * [.appendLog(log)](#module_PageController-Log.LogPageController.appendLog) ⇒ <code>void</code>
        * [.displayLogs()](#module_PageController-Log.LogPageController.displayLogs) ⇒ <code>void</code>
        * [.clearLogs()](#module_PageController-Log.LogPageController.clearLogs) ⇒ <code>void</code>

<a name="module_PageController-Log.LogPageController"></a>

### PageController-Log.LogPageController
**Kind**: static class of [<code>PageController-Log</code>](#module_PageController-Log)  

* [.LogPageController](#module_PageController-Log.LogPageController)
    * [new LogPageController()](#new_module_PageController-Log.LogPageController_new)
    * [.getHtmlCompPath()](#module_PageController-Log.LogPageController.getHtmlCompPath) ⇒ <code>string</code>
    * [.getName()](#module_PageController-Log.LogPageController.getName) ⇒ <code>string</code>
    * [.getCompID()](#module_PageController-Log.LogPageController.getCompID) ⇒ <code>string</code>
    * [.navbarName()](#module_PageController-Log.LogPageController.navbarName) ⇒ <code>string</code>
    * [.initPage()](#module_PageController-Log.LogPageController.initPage) ⇒ <code>void</code>
    * [.initPageListeners()](#module_PageController-Log.LogPageController.initPageListeners) ⇒ <code>void</code>
    * [.setPageActive()](#module_PageController-Log.LogPageController.setPageActive) ⇒ <code>void</code>
    * [.setPageInactive()](#module_PageController-Log.LogPageController.setPageInactive) ⇒ <code>void</code>
    * [.postAlert(alertMsg, [cause])](#module_PageController-Log.LogPageController.postAlert) ⇒ <code>void</code>
    * [.logInfo(message)](#module_PageController-Log.LogPageController.logInfo) ⇒ <code>void</code>
    * [.logDebug(message)](#module_PageController-Log.LogPageController.logDebug) ⇒ <code>void</code>
    * [.logWarn(message)](#module_PageController-Log.LogPageController.logWarn) ⇒ <code>void</code>
    * [.logError(message)](#module_PageController-Log.LogPageController.logError) ⇒ <code>void</code>
    * [.requestLogs()](#module_PageController-Log.LogPageController.requestLogs) ⇒ <code>void</code>
    * [.localizeDateValue(dateObj)](#module_PageController-Log.LogPageController.localizeDateValue) ⇒ <code>string</code>
    * [.loadLogs()](#module_PageController-Log.LogPageController.loadLogs) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.addLogLine(logs)](#module_PageController-Log.LogPageController.addLogLine) ⇒ <code>void</code>
    * [.appendLog(log)](#module_PageController-Log.LogPageController.appendLog) ⇒ <code>void</code>
    * [.displayLogs()](#module_PageController-Log.LogPageController.displayLogs) ⇒ <code>void</code>
    * [.clearLogs()](#module_PageController-Log.LogPageController.clearLogs) ⇒ <code>void</code>

<a name="new_module_PageController-Log.LogPageController_new"></a>

#### new LogPageController()
Controller for managing the Log page.

<a name="module_PageController-Log.LogPageController.getHtmlCompPath"></a>

#### LogPageController.getHtmlCompPath() ⇒ <code>string</code>
Get the HTML file path for this page.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
**Returns**: <code>string</code> - The HTML file path.  
<a name="module_PageController-Log.LogPageController.getName"></a>

#### LogPageController.getName() ⇒ <code>string</code>
Get the name identifier for this page.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
**Returns**: <code>string</code> - The page name.  
<a name="module_PageController-Log.LogPageController.getCompID"></a>

#### LogPageController.getCompID() ⇒ <code>string</code>
Get the DOM container ID for this page component.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
**Returns**: <code>string</code> - The component container ID.  
<a name="module_PageController-Log.LogPageController.navbarName"></a>

#### LogPageController.navbarName() ⇒ <code>string</code>
Generate the formatted navbar display name for this page.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
**Returns**: <code>string</code> - The navbar display name.  
<a name="module_PageController-Log.LogPageController.initPage"></a>

#### LogPageController.initPage() ⇒ <code>void</code>
Initialize the Log page.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
<a name="module_PageController-Log.LogPageController.initPageListeners"></a>

#### LogPageController.initPageListeners() ⇒ <code>void</code>
Initialize event listeners for this page's DOM elements.Handles UI interactions such as linking Label Studio projects and external window management.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
<a name="module_PageController-Log.LogPageController.setPageActive"></a>

#### LogPageController.setPageActive() ⇒ <code>void</code>
Set the Annotation page as active and visible in the UI.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
<a name="module_PageController-Log.LogPageController.setPageInactive"></a>

#### LogPageController.setPageInactive() ⇒ <code>void</code>
Deactivate the page, hide its content, and remove navigation highlight.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
<a name="module_PageController-Log.LogPageController.postAlert"></a>

#### LogPageController.postAlert(alertMsg, [cause]) ⇒ <code>void</code>
Display an alert message or error dialog, and log the event.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  

| Param | Type | Description |
| --- | --- | --- |
| alertMsg | <code>\*</code> | The message to display in the alert. |
| [cause] | <code>\*</code> | Optional cause of the alert, used for error dialogs. |

<a name="module_PageController-Log.LogPageController.logInfo"></a>

#### LogPageController.logInfo(message) ⇒ <code>void</code>
Send an info log message to the main process.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Log.LogPageController.logDebug"></a>

#### LogPageController.logDebug(message) ⇒ <code>void</code>
Send a debug log message to the main process.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Log.LogPageController.logWarn"></a>

#### LogPageController.logWarn(message) ⇒ <code>void</code>
Send a warning log message to the main process.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Log.LogPageController.logError"></a>

#### LogPageController.logError(message) ⇒ <code>void</code>
Send an error log message to the main process.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Log.LogPageController.requestLogs"></a>

#### LogPageController.requestLogs() ⇒ <code>void</code>
Request logs from the main process via IPC.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
<a name="module_PageController-Log.LogPageController.localizeDateValue"></a>

#### LogPageController.localizeDateValue(dateObj) ⇒ <code>string</code>
Convert a Date object into a localized date string (YYYY-MM-DD).

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
**Returns**: <code>string</code> - Localized date in YYYY-MM-DD format.  

| Param | Type | Description |
| --- | --- | --- |
| dateObj | <code>Date</code> | The date object to localize. |

<a name="module_PageController-Log.LogPageController.loadLogs"></a>

#### LogPageController.loadLogs() ⇒ <code>Promise.&lt;void&gt;</code>
Asynchronously load logs from the main process and display them in the UI.Handles errors and logs debug/warning messages based on response.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
<a name="module_PageController-Log.LogPageController.addLogLine"></a>

#### LogPageController.addLogLine(logs) ⇒ <code>void</code>
Add new log entries to the internal logLines array and refresh the display.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  

| Param | Type | Description |
| --- | --- | --- |
| logs | <code>Array.&lt;Object&gt;</code> | Array of log objects to add. |

<a name="module_PageController-Log.LogPageController.appendLog"></a>

#### LogPageController.appendLog(log) ⇒ <code>void</code>
Append a single raw log string as a new log entry in the UI.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  

| Param | Type | Description |
| --- | --- | --- |
| log | <code>string</code> | Raw log string to display. |

<a name="module_PageController-Log.LogPageController.displayLogs"></a>

#### LogPageController.displayLogs() ⇒ <code>void</code>
Display filtered logs in the UI based on selected type and date.If no logs match filters, a message is shown.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
<a name="module_PageController-Log.LogPageController.clearLogs"></a>

#### LogPageController.clearLogs() ⇒ <code>void</code>
Clear all logs both from the UI and via backend request.Disables the clear button if no logs remain.

**Kind**: static method of [<code>LogPageController</code>](#module_PageController-Log.LogPageController)  
<a name="module_PageController-Scrape"></a>

## PageController-Scrape
Controls the behavior and initialization of Scrape page in the UI.


* [PageController-Scrape](#module_PageController-Scrape)
    * [.ScrapePageController](#module_PageController-Scrape.ScrapePageController)
        * [new ScrapePageController()](#new_module_PageController-Scrape.ScrapePageController_new)
        * [.getHtmlCompPath()](#module_PageController-Scrape.ScrapePageController.getHtmlCompPath) ⇒ <code>string</code>
        * [.getName()](#module_PageController-Scrape.ScrapePageController.getName) ⇒ <code>string</code>
        * [.getCompID()](#module_PageController-Scrape.ScrapePageController.getCompID) ⇒ <code>string</code>
        * [.navbarName()](#module_PageController-Scrape.ScrapePageController.navbarName) ⇒ <code>string</code>
        * [.initPage()](#module_PageController-Scrape.ScrapePageController.initPage) ⇒ <code>void</code>
        * [.initPageListeners()](#module_PageController-Scrape.ScrapePageController.initPageListeners) ⇒ <code>void</code>
        * [.setPageActive()](#module_PageController-Scrape.ScrapePageController.setPageActive) ⇒ <code>void</code>
        * [.setPageInactive()](#module_PageController-Scrape.ScrapePageController.setPageInactive) ⇒ <code>void</code>
        * [.postAlert(alertMsg, [cause])](#module_PageController-Scrape.ScrapePageController.postAlert) ⇒ <code>void</code>
        * [.logInfo(message)](#module_PageController-Scrape.ScrapePageController.logInfo) ⇒ <code>void</code>
        * [.logDebug(message)](#module_PageController-Scrape.ScrapePageController.logDebug) ⇒ <code>void</code>
        * [.logWarn(message)](#module_PageController-Scrape.ScrapePageController.logWarn) ⇒ <code>void</code>
        * [.logError(message)](#module_PageController-Scrape.ScrapePageController.logError) ⇒ <code>void</code>
        * [.initResultsContainer()](#module_PageController-Scrape.ScrapePageController.initResultsContainer) ⇒ <code>void</code>
        * [.parseScrapedDataToList(data)](#module_PageController-Scrape.ScrapePageController.parseScrapedDataToList) ⇒ <code>void</code>
        * [.appendNewScrapedItem(dataObj)](#module_PageController-Scrape.ScrapePageController.appendNewScrapedItem) ⇒ <code>void</code>
        * [.removeSelectedItems()](#module_PageController-Scrape.ScrapePageController.removeSelectedItems) ⇒ <code>void</code>
        * [.clearScrapedList()](#module_PageController-Scrape.ScrapePageController.clearScrapedList) ⇒ <code>void</code>
        * [.checkIfAnyActive()](#module_PageController-Scrape.ScrapePageController.checkIfAnyActive) ⇒ <code>boolean</code>
        * [.getAllReadyData()](#module_PageController-Scrape.ScrapePageController.getAllReadyData) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.exportData(dataArr, projID)](#module_PageController-Scrape.ScrapePageController.exportData) ⇒ <code>void</code>
        * [.urlModeExport()](#module_PageController-Scrape.ScrapePageController.urlModeExport) ⇒ <code>void</code>
        * [.manModeExport()](#module_PageController-Scrape.ScrapePageController.manModeExport) ⇒ <code>void</code>
        * [.submitBtnPressed()](#module_PageController-Scrape.ScrapePageController.submitBtnPressed) ⇒ <code>void</code>
        * [.checkURL(url)](#module_PageController-Scrape.ScrapePageController.checkURL) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.resetAllFields()](#module_PageController-Scrape.ScrapePageController.resetAllFields) ⇒ <code>void</code>
        * [.disableWhileExporting()](#module_PageController-Scrape.ScrapePageController.disableWhileExporting) ⇒ <code>void</code>
        * [.reenableScrapePageFunctions()](#module_PageController-Scrape.ScrapePageController.reenableScrapePageFunctions) ⇒ <code>void</code>
        * [.hideResultsContainer()](#module_PageController-Scrape.ScrapePageController.hideResultsContainer) ⇒ <code>void</code>
        * [.showResultsContainer()](#module_PageController-Scrape.ScrapePageController.showResultsContainer) ⇒ <code>void</code>
        * [.disableManualScrape()](#module_PageController-Scrape.ScrapePageController.disableManualScrape) ⇒ <code>void</code>
        * [.enableManualScrape()](#module_PageController-Scrape.ScrapePageController.enableManualScrape) ⇒ <code>void</code>
        * [.disableURLField()](#module_PageController-Scrape.ScrapePageController.disableURLField) ⇒ <code>void</code>
        * [.enableURLField()](#module_PageController-Scrape.ScrapePageController.enableURLField) ⇒ <code>void</code>
        * [.disableResultsBtns()](#module_PageController-Scrape.ScrapePageController.disableResultsBtns) ⇒ <code>void</code>
        * [.enableResultsBtns()](#module_PageController-Scrape.ScrapePageController.enableResultsBtns) ⇒ <code>void</code>

<a name="module_PageController-Scrape.ScrapePageController"></a>

### PageController-Scrape.ScrapePageController
**Kind**: static class of [<code>PageController-Scrape</code>](#module_PageController-Scrape)  

* [.ScrapePageController](#module_PageController-Scrape.ScrapePageController)
    * [new ScrapePageController()](#new_module_PageController-Scrape.ScrapePageController_new)
    * [.getHtmlCompPath()](#module_PageController-Scrape.ScrapePageController.getHtmlCompPath) ⇒ <code>string</code>
    * [.getName()](#module_PageController-Scrape.ScrapePageController.getName) ⇒ <code>string</code>
    * [.getCompID()](#module_PageController-Scrape.ScrapePageController.getCompID) ⇒ <code>string</code>
    * [.navbarName()](#module_PageController-Scrape.ScrapePageController.navbarName) ⇒ <code>string</code>
    * [.initPage()](#module_PageController-Scrape.ScrapePageController.initPage) ⇒ <code>void</code>
    * [.initPageListeners()](#module_PageController-Scrape.ScrapePageController.initPageListeners) ⇒ <code>void</code>
    * [.setPageActive()](#module_PageController-Scrape.ScrapePageController.setPageActive) ⇒ <code>void</code>
    * [.setPageInactive()](#module_PageController-Scrape.ScrapePageController.setPageInactive) ⇒ <code>void</code>
    * [.postAlert(alertMsg, [cause])](#module_PageController-Scrape.ScrapePageController.postAlert) ⇒ <code>void</code>
    * [.logInfo(message)](#module_PageController-Scrape.ScrapePageController.logInfo) ⇒ <code>void</code>
    * [.logDebug(message)](#module_PageController-Scrape.ScrapePageController.logDebug) ⇒ <code>void</code>
    * [.logWarn(message)](#module_PageController-Scrape.ScrapePageController.logWarn) ⇒ <code>void</code>
    * [.logError(message)](#module_PageController-Scrape.ScrapePageController.logError) ⇒ <code>void</code>
    * [.initResultsContainer()](#module_PageController-Scrape.ScrapePageController.initResultsContainer) ⇒ <code>void</code>
    * [.parseScrapedDataToList(data)](#module_PageController-Scrape.ScrapePageController.parseScrapedDataToList) ⇒ <code>void</code>
    * [.appendNewScrapedItem(dataObj)](#module_PageController-Scrape.ScrapePageController.appendNewScrapedItem) ⇒ <code>void</code>
    * [.removeSelectedItems()](#module_PageController-Scrape.ScrapePageController.removeSelectedItems) ⇒ <code>void</code>
    * [.clearScrapedList()](#module_PageController-Scrape.ScrapePageController.clearScrapedList) ⇒ <code>void</code>
    * [.checkIfAnyActive()](#module_PageController-Scrape.ScrapePageController.checkIfAnyActive) ⇒ <code>boolean</code>
    * [.getAllReadyData()](#module_PageController-Scrape.ScrapePageController.getAllReadyData) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.exportData(dataArr, projID)](#module_PageController-Scrape.ScrapePageController.exportData) ⇒ <code>void</code>
    * [.urlModeExport()](#module_PageController-Scrape.ScrapePageController.urlModeExport) ⇒ <code>void</code>
    * [.manModeExport()](#module_PageController-Scrape.ScrapePageController.manModeExport) ⇒ <code>void</code>
    * [.submitBtnPressed()](#module_PageController-Scrape.ScrapePageController.submitBtnPressed) ⇒ <code>void</code>
    * [.checkURL(url)](#module_PageController-Scrape.ScrapePageController.checkURL) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.resetAllFields()](#module_PageController-Scrape.ScrapePageController.resetAllFields) ⇒ <code>void</code>
    * [.disableWhileExporting()](#module_PageController-Scrape.ScrapePageController.disableWhileExporting) ⇒ <code>void</code>
    * [.reenableScrapePageFunctions()](#module_PageController-Scrape.ScrapePageController.reenableScrapePageFunctions) ⇒ <code>void</code>
    * [.hideResultsContainer()](#module_PageController-Scrape.ScrapePageController.hideResultsContainer) ⇒ <code>void</code>
    * [.showResultsContainer()](#module_PageController-Scrape.ScrapePageController.showResultsContainer) ⇒ <code>void</code>
    * [.disableManualScrape()](#module_PageController-Scrape.ScrapePageController.disableManualScrape) ⇒ <code>void</code>
    * [.enableManualScrape()](#module_PageController-Scrape.ScrapePageController.enableManualScrape) ⇒ <code>void</code>
    * [.disableURLField()](#module_PageController-Scrape.ScrapePageController.disableURLField) ⇒ <code>void</code>
    * [.enableURLField()](#module_PageController-Scrape.ScrapePageController.enableURLField) ⇒ <code>void</code>
    * [.disableResultsBtns()](#module_PageController-Scrape.ScrapePageController.disableResultsBtns) ⇒ <code>void</code>
    * [.enableResultsBtns()](#module_PageController-Scrape.ScrapePageController.enableResultsBtns) ⇒ <code>void</code>

<a name="new_module_PageController-Scrape.ScrapePageController_new"></a>

#### new ScrapePageController()
Controller for managing the Scrape page.

<a name="module_PageController-Scrape.ScrapePageController.getHtmlCompPath"></a>

#### ScrapePageController.getHtmlCompPath() ⇒ <code>string</code>
Get the HTML file path for this page.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
**Returns**: <code>string</code> - The HTML file path.  
<a name="module_PageController-Scrape.ScrapePageController.getName"></a>

#### ScrapePageController.getName() ⇒ <code>string</code>
Get the name identifier for this page.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
**Returns**: <code>string</code> - The page name.  
<a name="module_PageController-Scrape.ScrapePageController.getCompID"></a>

#### ScrapePageController.getCompID() ⇒ <code>string</code>
Get the DOM container ID for this page component.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
**Returns**: <code>string</code> - The component container ID.  
<a name="module_PageController-Scrape.ScrapePageController.navbarName"></a>

#### ScrapePageController.navbarName() ⇒ <code>string</code>
Generate the formatted navbar display name for this page.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
**Returns**: <code>string</code> - The navbar display name.  
<a name="module_PageController-Scrape.ScrapePageController.initPage"></a>

#### ScrapePageController.initPage() ⇒ <code>void</code>
Initialize the Scrape page.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.initPageListeners"></a>

#### ScrapePageController.initPageListeners() ⇒ <code>void</code>
Initialize event listeners for this page's DOM elements.Handles UI interactions such as linking Label Studio projects and external window management.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.setPageActive"></a>

#### ScrapePageController.setPageActive() ⇒ <code>void</code>
Set the Annotation page as active and visible in the UI.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.setPageInactive"></a>

#### ScrapePageController.setPageInactive() ⇒ <code>void</code>
Deactivate the page, hide its content, and remove navigation highlight.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.postAlert"></a>

#### ScrapePageController.postAlert(alertMsg, [cause]) ⇒ <code>void</code>
Display an alert message or error dialog, and log the event.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  

| Param | Type | Description |
| --- | --- | --- |
| alertMsg | <code>\*</code> | The message to display in the alert. |
| [cause] | <code>\*</code> | Optional cause of the alert, used for error dialogs. |

<a name="module_PageController-Scrape.ScrapePageController.logInfo"></a>

#### ScrapePageController.logInfo(message) ⇒ <code>void</code>
Send an info log message to the main process.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Scrape.ScrapePageController.logDebug"></a>

#### ScrapePageController.logDebug(message) ⇒ <code>void</code>
Send a debug log message to the main process.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Scrape.ScrapePageController.logWarn"></a>

#### ScrapePageController.logWarn(message) ⇒ <code>void</code>
Send a warning log message to the main process.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Scrape.ScrapePageController.logError"></a>

#### ScrapePageController.logError(message) ⇒ <code>void</code>
Send an error log message to the main process.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message to log. |

<a name="module_PageController-Scrape.ScrapePageController.initResultsContainer"></a>

#### ScrapePageController.initResultsContainer() ⇒ <code>void</code>
Initializes the results container UI elements.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.parseScrapedDataToList"></a>

#### ScrapePageController.parseScrapedDataToList(data) ⇒ <code>void</code>
Parse and display scraped data items in the results container.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Array of scraped data objects. |

<a name="module_PageController-Scrape.ScrapePageController.appendNewScrapedItem"></a>

#### ScrapePageController.appendNewScrapedItem(dataObj) ⇒ <code>void</code>
Add a new scraped data item to the results list with interactive selection behavior.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  

| Param | Type | Description |
| --- | --- | --- |
| dataObj | <code>Object</code> | Scraped data object with `data` and `url` fields. |

<a name="module_PageController-Scrape.ScrapePageController.removeSelectedItems"></a>

#### ScrapePageController.removeSelectedItems() ⇒ <code>void</code>
Remove selected data items from the results list. Hides results if empty.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.clearScrapedList"></a>

#### ScrapePageController.clearScrapedList() ⇒ <code>void</code>
Clear all items from the results list and reset the UI.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.checkIfAnyActive"></a>

#### ScrapePageController.checkIfAnyActive() ⇒ <code>boolean</code>
Check if any data items are currently selected.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
**Returns**: <code>boolean</code> - True if at least one item is selected, otherwise false.  
<a name="module_PageController-Scrape.ScrapePageController.getAllReadyData"></a>

#### ScrapePageController.getAllReadyData() ⇒ <code>Array.&lt;Object&gt;</code>
Retrieve all data items from the results list for export.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
**Returns**: <code>Array.&lt;Object&gt;</code> - Array of scraped data objects with `url` and `data` fields.  
<a name="module_PageController-Scrape.ScrapePageController.exportData"></a>

#### ScrapePageController.exportData(dataArr, projID) ⇒ <code>void</code>
Format and export scraped data to Label Studio.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  

| Param | Type | Description |
| --- | --- | --- |
| dataArr | <code>Array.&lt;Object&gt;</code> | Data array to export. |
| projID | <code>string</code> | Target Label Studio project ID. |

<a name="module_PageController-Scrape.ScrapePageController.urlModeExport"></a>

#### ScrapePageController.urlModeExport() ⇒ <code>void</code>
Handle export logic for data collected in URL scrape mode.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.manModeExport"></a>

#### ScrapePageController.manModeExport() ⇒ <code>void</code>
Handle export logic for manually entered data in manual scrape mode.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.submitBtnPressed"></a>

#### ScrapePageController.submitBtnPressed() ⇒ <code>void</code>
Handle the submit button press event in URL scrape mode.Validates the URL and initiates scraping via Electron IPC.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.checkURL"></a>

#### ScrapePageController.checkURL(url) ⇒ <code>Promise.&lt;boolean&gt;</code>
Validate a given URL by checking its format and availability.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Resolves true if valid and accessible, else false.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL to validate. |

<a name="module_PageController-Scrape.ScrapePageController.resetAllFields"></a>

#### ScrapePageController.resetAllFields() ⇒ <code>void</code>
Reset all input fields and clear the results list on the Scrape page.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.disableWhileExporting"></a>

#### ScrapePageController.disableWhileExporting() ⇒ <code>void</code>
Disable all input fields and buttons during export to prevent interactions.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.reenableScrapePageFunctions"></a>

#### ScrapePageController.reenableScrapePageFunctions() ⇒ <code>void</code>
Re-enable all input fields and buttons after export completion.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.hideResultsContainer"></a>

#### ScrapePageController.hideResultsContainer() ⇒ <code>void</code>
Hide the results container UI element.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.showResultsContainer"></a>

#### ScrapePageController.showResultsContainer() ⇒ <code>void</code>
Show the results container UI element.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.disableManualScrape"></a>

#### ScrapePageController.disableManualScrape() ⇒ <code>void</code>
Disable manual scrape input fields and buttons.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.enableManualScrape"></a>

#### ScrapePageController.enableManualScrape() ⇒ <code>void</code>
Enable manual scrape input fields and buttons.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.disableURLField"></a>

#### ScrapePageController.disableURLField() ⇒ <code>void</code>
Disable URL input field and submit button.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.enableURLField"></a>

#### ScrapePageController.enableURLField() ⇒ <code>void</code>
Enable URL input field and submit button.

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.disableResultsBtns"></a>

#### ScrapePageController.disableResultsBtns() ⇒ <code>void</code>
Disable buttons in the results container (URL mode).

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_PageController-Scrape.ScrapePageController.enableResultsBtns"></a>

#### ScrapePageController.enableResultsBtns() ⇒ <code>void</code>
Enable buttons in the results container (URL mode).

**Kind**: static method of [<code>ScrapePageController</code>](#module_PageController-Scrape.ScrapePageController)  
<a name="module_Renderer"></a>

## Renderer
Initializes and controls the Electron renderer process.Handles dynamic page loading, theme management, inter-process communication (IPC),and user interface event handling.This module initializes all UI components, listens for user actions,manages navigation between views, and supports dynamic theme switching.Logging is abstracted to the main process using contextBridge and ipcRenderer.


* [Renderer](#module_Renderer)
    * [.Pages](#module_Renderer.Pages) : <code>Object</code>
    * [.initPages()](#module_Renderer.initPages) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.attachPageEventListeners()](#module_Renderer.attachPageEventListeners) ⇒ <code>void</code>
    * [.getPage(value)](#module_Renderer.getPage) ⇒ <code>Object</code>
    * [.changePage(event)](#module_Renderer.changePage) ⇒ <code>void</code>
    * [.updateProjectOptions(projects)](#module_Renderer.updateProjectOptions) ⇒ <code>void</code>
    * [.initializeTheme()](#module_Renderer.initializeTheme) ⇒ <code>void</code>
    * [.changeTheme()](#module_Renderer.changeTheme) ⇒ <code>void</code>

<a name="module_Renderer.Pages"></a>

### Renderer.Pages : <code>Object</code>
Collection of all page controller instances used for dynamic navigation.

**Kind**: static constant of [<code>Renderer</code>](#module_Renderer)  
<a name="module_Renderer.initPages"></a>

### Renderer.initPages() ⇒ <code>Promise.&lt;void&gt;</code>
Initialize all UI pages and set the default active page.

**Kind**: static method of [<code>Renderer</code>](#module_Renderer)  
<a name="module_Renderer.attachPageEventListeners"></a>

### Renderer.attachPageEventListeners() ⇒ <code>void</code>
Attach navigation and event listeners for all page elements and IPC.

**Kind**: static method of [<code>Renderer</code>](#module_Renderer)  
<a name="module_Renderer.getPage"></a>

### Renderer.getPage(value) ⇒ <code>Object</code>
Retrieve the page controller instance by page name.

**Kind**: static method of [<code>Renderer</code>](#module_Renderer)  
**Returns**: <code>Object</code> - Page controller instance.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The page name (e.g., "home", "scrape"). |

<a name="module_Renderer.changePage"></a>

### Renderer.changePage(event) ⇒ <code>void</code>
Handle user navigation and switch between pages.

**Kind**: static method of [<code>Renderer</code>](#module_Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | The navigation click event. |

<a name="module_Renderer.updateProjectOptions"></a>

### Renderer.updateProjectOptions(projects) ⇒ <code>void</code>
Update the dropdown options with Label Studio projects in the UI.

**Kind**: static method of [<code>Renderer</code>](#module_Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| projects | <code>Array.&lt;{id: string, project\_name: string}&gt;</code> | Array of project objects. |

<a name="module_Renderer.initializeTheme"></a>

### Renderer.initializeTheme() ⇒ <code>void</code>
Initialize and apply theme based on stored preference or default.

**Kind**: static method of [<code>Renderer</code>](#module_Renderer)  
<a name="module_Renderer.changeTheme"></a>

### Renderer.changeTheme() ⇒ <code>void</code>
Handle theme change event and update localStorage and UI.

**Kind**: static method of [<code>Renderer</code>](#module_Renderer)  
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

