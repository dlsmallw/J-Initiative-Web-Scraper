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

export SanitizeProtocol;