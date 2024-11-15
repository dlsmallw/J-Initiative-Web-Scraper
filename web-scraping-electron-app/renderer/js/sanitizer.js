class Sanitizer {
	constructor(input, sanitizeProtocol) {
		// If any structures need initializing, do that here
		this.input = input;
		if (sanitizeProtocol == null) {
			sanitizeProtocol = new sanitizeProtocol();
		}
		this.sanitizeProtocol = sanitizeProtocol;
	}

	getInput() {
		return this.input;
	}

	setInput(input) {
		this.input = input;
	}

	sanitize() {
		return this.sanitizeProtocol.sanitizeOnMap(this.input);
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

	/**
	 * Strips %, _, ^, ESCAPE, ', [, ], 
	 * */
	sanitizeForSQL() {
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


const t = new Sanitizer('<li class="toggle">', new SanitizeProtocol());
console.log(t.input);
console.log(t.sanitize());