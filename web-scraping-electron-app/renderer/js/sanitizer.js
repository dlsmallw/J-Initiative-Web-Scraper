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
		expressionMap = {};
	}

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
		this.sanitizeProtocol = new SanitizeProtocol("[%_^\'\/\[\]]", sqlMap);
		this.expressionMap = {'ESCAPE': 'escape'};
	}

	sanitize() {
		var regexTransformed = this.sanitizeProtocol.sanitize(this.input);
		/*
		// Unused, as the expressionMap is now an object literal, not a Map object.
		const iterator = this.expressionMap.keys();
		for(var i = 0; i < this.expressionMap.size; ++i) {
			var key = iterator.next().value;
			console.log("Key: " + key + ", value: " + this.expressionMap.get(key));

			regexTransformed = regexTransformed.replaceAll(key,this.expressionMap.get(key));
		}*/
		for(var key in this.expressionMap) {
			regexTransformed = regexTransformed.replaceAll(key, this.expressionMap[key]);
		}

		return regexTransformed;
	}

	/**
	 * Strips %, _, ^, ESCAPE, ', [, ], /
	 * Replaces ^ with the HTML hexcode for ↑, _ with -, [] with (), ESCAPE with escape
	 * */
	sanitizeSQL() {
		const sqlMap = {
	      '%': '&#x25;',
	      '_': '-',
	      '^': '&#x2191;',
	      "'": '&#x27;',
	      "/": '&#x2F;',
	      "[": '(',
	      "]": ')',
		};
		var sqlProtocol = new SanitizeProtocol("[%_^\'\/]", sqlMap);

		var firstPass = sqlProtocol.sanitize(this.input);
		return firstPass.replaceAll('ESCAPE', 'escape');
	}


	/**
	 * Strips certain characters from the text, replacing them with the usual safe HTML indicators.
	 * */
	basicHTMLSanitize() {
		const map = {
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
		};
		const reg = /[&<>"'/“”‘’]/ig;
		return this.input.replace(reg, (match)=>(map[match]));
	}
}


// Note: this is a second class. I would normally move this to another file, but since it's only used as part of this script, it simplifies the imports needed.
class SanitizeProtocol {

	constructor(regexString = "[&<>\"'/“”‘’]", 
		sanitizationMapping = {
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
		}
	) {
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
const t = new Sanitizer('<li class="%toggle()\]\[ %"\'ESCAPE^>', new SanitizeProtocol(), {"ESCAPE": "escape", "toggle": "TOGGLE"});
t.sqlMode();
console.log(t.sanitize());