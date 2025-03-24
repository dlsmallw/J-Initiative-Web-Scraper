/**
 * @file sanitizer.js
 * @description Provides utilities to sanitize text input using customizable protocols and mappings.
 * Includes HTML and SQL sanitization presets.
 *
 * @module Sanitizer
 */

/**
 * Class representing a text sanitizer.
 * Apply custom sanitization protocols or use presets for HTML/SQL.
 *
 * @class
 * @memberof module:Sanitizer
 *
 * @example
 * const s = new Sanitizer('<li class="%toggle %"\'ESCAPE^>', new SanitizeProtocol(), {
 *   "ESCAPE": "escape",
 *   "toggle": "TOGGLE"
 * });
 * const sanitized = s.sanitize();
 */
class Sanitizer {
    /**
    * Create a Sanitizer instance.
    * @constructor
    * @param {string} input - The text to sanitize.
    * @param {SanitizeProtocol} sanitizeProtocol - The protocol describing character replacements.
    * @param {Object.<string, string>} [expressionMap={}] - Additional expression mappings for replacement.
    *
    * @memberof module:Sanitizer.Sanitizer
    */
	constructor(input, sanitizeProtocol, expressionMap = {}) {
		// If any structures need initializing, do that here
		this.input = input;
		if (sanitizeProtocol == null) {
			sanitizeProtocol = new sanitizeProtocol();
		}
		this.sanitizeProtocol = sanitizeProtocol;
		this.expressionMap = expressionMap;
	}

	/**
    * Get the current input text to be sanitized.
    *
    * @function getInput
    * @memberof module:Sanitizer.Sanitizer
    * @returns {string} The current input text.
    */
    getInput() {
        return this.input;
    }

    /**
    * Set the input text to be sanitized.
    *
    * @function setInput
    * @memberof module:Sanitizer.Sanitizer
    * @param {string} input - New input text.
    * @returns {void}
    */
    setInput(input) {
        this.input = input;
    }

    /**
    * Get the current sanitization protocol.
    *
    * @function getProtocol
    * @memberof module:Sanitizer.Sanitizer
    * @returns {SanitizeProtocol} The current sanitize protocol instance.
    */
    getProtocol() {
        return this.sanitizeProtocol;
    }

    /**
    * Set a new sanitization protocol.
    *
    * @function setProtocol
    * @memberof module:Sanitizer.Sanitizer
    * @param {SanitizeProtocol} sanitizeProtocol - New protocol instance to apply.
    * @returns {void}
    */
    setProtocol(sanitizeProtocol) {
        this.sanitizeProtocol = sanitizeProtocol;
    }

    /**
    * Get the current expression map used for additional string replacements.
    *
    * @function getExpressionMap
    * @memberof module:Sanitizer.Sanitizer
    * @returns {Object.<string, string>} The current expression map.
    */
    getExpressionMap() {
        return this.expressionMap;
    }

    /**
    * Set a new expression map for additional replacements.
    *
    * @function setExpressionMap
    * @memberof module:Sanitizer.Sanitizer
    * @param {Object.<string, string>} expressionMap - New mapping of expressions to replacements.
    * @returns {void}
    */
    setExpressionMap(expressionMap) {
        this.expressionMap = expressionMap;
    }

    /**
    * Add a key-value pair to the expression map.
    *
    * @function addToExpressionMap
    * @memberof module:Sanitizer.Sanitizer
    * @param {string} key - Expression to be replaced.
    * @param {string} value - Replacement string.
    * @returns {void}
    */
    addToExpressionMap(key, value) {
        this.expressionMap[key] = value;
    }

	/**
    * Use preset settings to sanitize HTML by escaping common special characters.
    * Replaces characters like `<`, `>`, `&`, `'`, and `"` with their HTML-encoded equivalents.
    *
    * @function htmlMode
    * @memberof module:Sanitizer.Sanitizer
    * @returns {void}
    */
	htmlMode() {
		this.sanitizeProtocol = new SanitizeProtocol("[&<>\"'/“”‘’]", 
			{
		      '&': '&amp;',
		      '<': '&lt;',
		      '>': '&gt;',
		      '"': '&quot;',
		      "'": '&#x27;',
		      "/": '&#x2F;',
		      "“": '&quot;',
		      "”": '&quot;',
		      "‘": '&#x27;',
		      "’": '&#x27;',
			});
		this.expressionMap = {};
	}

    /**
    * Use preset settings to sanitize SQL by escaping special characters and expressions.
    * Prevents SQL injection vulnerabilities by encoding characters like `%`, `_`, `'`, `/`, and brackets.
    *
    * @function sqlMode
    * @memberof module:Sanitizer.Sanitizer
    * @returns {void}
    */
	sqlMode() {
		const sqlMap = {
	      '%': '&#x25;',
	      '_': '-',
	      '^': '&#x2191;',
	      "'": '&#x27;',
	      "/": '&#x2F;',
	      "[": '(',
	      "]": ')',
		};
		this.sanitizeProtocol = new SanitizeProtocol("[%_^\'\/\\[\\]]", sqlMap);
		this.expressionMap = {'ESCAPE': 'escape'};
	}

	/**
     * Sanitize text using the configured protocol and expression map.
     *
     * @function sanitize
     * @memberof module:Sanitizer.Sanitizer
     * @param {string} [input=""] - Optional input. Defaults to constructor input.
     * @returns {string} The sanitized text.
     */
	sanitize(input = "") {
		if(input == "") {
			input = this.input;
		}
		var regexTransformed = this.sanitizeProtocol.sanitize(input);
		/*
		// Unused, as the expressionMap is now an object literal, not a Map object.
		const iterator = this.expressionMap.keys();
		for(var i = 0; i < this.expressionMap.size; ++i) {
			var key = iterator.next().value;

			regexTransformed = regexTransformed.replaceAll(key,this.expressionMap.get(key));
		}*/

		for(var key in this.expressionMap) {
			regexTransformed = regexTransformed.replaceAll(key, this.expressionMap[key]);
		}

		return regexTransformed;
	}

	/**
    * Remove HTML tags from input text. Optionally applies sanitization afterward.
    *
    * @function removeTags
    * @memberof module:Sanitizer.Sanitizer
    * @param {string} [input=""] - Optional input text. Defaults to constructor input if empty.
    * @param {boolean} [alsoSanitize=true] - Whether to apply `sanitize()` after tag removal.
    * @returns {string} The processed text, with HTML tags removed and optionally sanitized.
    */
	removeTags(input = "", alsoSanitize = true) {
		if(input == "") {
			input = this.input;
		}

		var min = 0;
		var transformedInput = "";
		var substringInput = input;

		var keepGoing = true;
		while(keepGoing) {
			if(substringInput.indexOf('<') < min) {
				keepGoing = false;
			}
			else {
				// Check for whether the < is part of a tag.
				// HTML tags cannot have a space after the opening <, 
				// so the current test is to check for a space after the <, 
				// and whether there's a closing > after the <. 
				if(substringInput.charAt(substringInput.indexOf('<') + 1) === " ") {
					
					transformedInput += substringInput.slice(min, substringInput.indexOf('<') + 1);
					substringInput = substringInput.slice(substringInput.indexOf('<') + 1);
				}
				else if(substringInput.indexOf('>') >= min) {
					var start = substringInput.indexOf('<');
					var end = substringInput.indexOf('>') + 1;
					
					transformedInput += substringInput.slice(min, start);
					substringInput = substringInput.slice(end);
				}
				else {
					keepGoing = false;
				}
				
			}
		}
		if(alsoSanitize) {
			var regexTransformed = this.sanitizeProtocol.sanitize(input);

			for(var key in this.expressionMap) {
				regexTransformed = regexTransformed.replaceAll(key, this.expressionMap[key]);
			}

			return regexTransformed;		
		}
		else {
			return transformedInput;
		}
		
	}
}


/**
 * Class representing a sanitization protocol using regular expressions and replacement mappings.
 * Used by Sanitizer to apply transformations.
 *
 * @class
 * @memberof module:Sanitizer
 *
 * @example
 * const protocol = new SanitizeProtocol("[&<>]", { '&': '&amp;', '<': '&lt;', '>': '&gt;' });
 * const result = protocol.sanitize("<div>Test</div>"); // "&lt;div&gt;Test&lt;/div&gt;"
 */
class SanitizeProtocol {

	constructor(regexString = "", sanitizationMapping = {}) {
		this.regexString = regexString;
		this.sanitizationMapping = sanitizationMapping;

	}

    /**
    * Sanitize text using the internal regex and replacement mappings.
    *
    * @function sanitize
    * @memberof module:Sanitizer.SanitizeProtocol
    * @param {string} textToSanitize - Input text to be sanitized.
    * @returns {string} Sanitized output text.
    */
	sanitize(textToSanitize) {
		const reg = new RegExp(this.regexString, "ig");
		return textToSanitize.replace(reg, (match)=>(this.sanitizationMapping[match]));
	}
}



//const t = new Sanitizer('<li class="%toggle %"\'ESCAPE^>', new SanitizeProtocol(), new Map([["ESCAPE", "escape"], ["toggle", "TOGGLE"]]));

//t.addToMap("ESCAPE", "escape");
/*
const t = new Sanitizer('<script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js">Test ><>text</script>', new SanitizeProtocol(), {"ESCAPE": "escape", "toggle": "TOGGLE"});
t.htmlMode();

t.addToExpressionMap("script", "REPLACED");
console.log(t.removeTags("", false));
*/
