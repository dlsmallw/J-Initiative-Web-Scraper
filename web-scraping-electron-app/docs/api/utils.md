## Modules

<dl>
<dt><a href="#module_Logger">Logger</a></dt>
<dd><p>Configures and exports a centralized logger using electron-log.
Provides consistent logging format and settings for both file and console output.</p>
</dd>
<dt><a href="#module_Sanitizer">Sanitizer</a></dt>
<dd><p>Provides utilities to sanitize text input using customizable protocols and mappings.
Includes HTML and SQL sanitization presets.</p>
</dd>
</dl>

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

