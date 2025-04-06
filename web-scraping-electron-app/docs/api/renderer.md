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
