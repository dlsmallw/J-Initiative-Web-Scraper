/**
 * Expected usage: create a Sanitizer object with your input stored in it,
 * along with a SanitizeProtocol object that describes how to transform the text to sanitize it.
 * 
 * */
class Sanitizer {
	constructor(input, sanitizeProtocol, expressionMap = new Map()) {
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

	setProtocol(newProtocol) {
		this.sanitizeProtocol = newProtocol;
	}

	addToMap(key, value) {
		this.expressionMap.set(key, value);
	}

	sanitize() {
		var regexTransformed = this.sanitizeProtocol.sanitizeOnMap(this.input);
		
		const iterator = this.expressionMap.keys();

		for(var i = 0; i < this.expressionMap.size; ++i) {
			var key = iterator.next().value;
			console.log("Key: " + key + ", value: " + this.expressionMap.get(key));

			regexTransformed = regexTransformed.replaceAll(key,this.expressionMap.get(key));
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

		var firstPass = sqlProtocol.sanitizeOnMap(this.input);
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

	sanitizeOnMap(textToSanitize) {
		const reg = new RegExp(this.regexString, "ig");
		return textToSanitize.replace(reg, (match)=>(this.sanitizationMapping[match]));
	}
}



const t = new Sanitizer('<li class="%toggle %"\'ESCAPE^>', new SanitizeProtocol());
t.addToMap("ESCAPE", "escape");
console.log(t.sanitize());