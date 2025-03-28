## Modules

<dl>
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
</dl>

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
