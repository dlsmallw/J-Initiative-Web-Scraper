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
