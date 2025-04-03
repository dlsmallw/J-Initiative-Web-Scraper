## Modules

<dl>
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
</dl>

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

