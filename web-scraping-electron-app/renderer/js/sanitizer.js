class Sanitizer {



	constructor(input) {
		// If any structures need initializing, do that here
		this.input = input;
	}



	/**
	 * Strips certain characters from the text, replacing them with the usual safe HTML indicators.
	 * */
	basicSanitize() {
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
		const reg = /[&<>"'/]/ig;
		return this.input.replace(reg, (match)=>(map[match]));
	}
}


const t = new Sanitizer('<li class="toggle">');
console.log(t.input);
console.log(t.basicSanitize());