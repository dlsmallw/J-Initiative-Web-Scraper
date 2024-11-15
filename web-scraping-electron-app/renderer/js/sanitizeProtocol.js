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