/**
 * Expected usage: create a Sanitizer object with your input stored in it,
 * along with a SanitizeProtocol object that describes how to transform the text to sanitize it.
 * 
 * How to use:
 * var sanitizer = new Sanitizer([text], new SanitizeProtocol([regex string], {[character]: [replacement], [character]: [replacement]}), {[expression]: [replacement], [expression]: [replacement],...});
 * return sanitizer.sanitize();
 * 
 * ex.
 * var s = new Sanitizer('<li class="%toggle %"\'ESCAPE^>', new SanitizeProtocol(), {"ESCAPE": "escape", "toggle": "TOGGLE"});
 * 
 * If you just want the presets already built in, call [sanitizerObject].htmlMode() or [sanitizerObject].sqlMode().
 * */
class Sanitizer {
	constructor(input, sanitizeProtocol, expressionMap = {}) {
		// If any structures need initializing, do that here
		this.input = input;
		if (sanitizeProtocol == null) {
			sanitizeProtocol = new sanitizeProtocol();
		}
		this.sanitizeProtocol = sanitizeProtocol;
		this.expressionMap = expressionMap;
	}

	getInput() {
		return this.input;
	}

	setInput(input) {
		this.input = input;
	}

	getProtocol() {
		return this.sanitizeProtocol;
	}

	setProtocol(sanitizeProtocol) {
		this.sanitizeProtocol = sanitizeProtocol;
	}

	getExpressionMap() {
		return this.expressionMap;
	}

	setExpressionMap(expressionMap) {
		this.expressionMap = expressionMap;
	}

	addToExpressionMap(key, value) {
		this.expressionMap[key] = value;
	}

	/**
	 * Settings to strip &, <, >, ", ', “, ”, ‘, ’
	 * Replaces each of the characters with their HTML hexcodes.
	 * */
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
	 * Settings to strip %, _, ^, ESCAPE, ', [, ], /
	 * Replaces ^ with the HTML hexcode for ↑, _ with -, [] with (), ESCAPE with escape
	 * */
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
	 * Sanitizes the data following the rules established by the sanitizer's creation.
	 * @param input 		The text to sanitize. If none is given, the object will use whatever text was input via the constructor initially.
	 * @return String 		The sanitized text.
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
	 * Removes HTML tags from the input text. Can also sanitize the data.
	 * @param input 		The text to sanitize. If none is given, the object will use whatever text was input via the constructor initially.
	 * @param alsoSanitize	Whether to also run the sanitize() method on the output. Defaults to true.
	 * @return String 		The sanitized text.
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
			var regexTransformed = this.sanitizeProtocol.sanitize(transformedInput);

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


// Note: this is a second class. I would normally move this to another file, but since it's only used as part of this script, it simplifies the imports needed.
class SanitizeProtocol {

	constructor(regexString = "", sanitizationMapping = {}) {
		this.regexString = regexString;
		this.sanitizationMapping = sanitizationMapping;

	}

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
