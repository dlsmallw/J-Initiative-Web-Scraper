
// logs when an asset fails to load
document.getElementById("loadErrorLogger").addEventListener("error", failedToLoad);

function failedToLoad() {

}

class Logger {
	static #instance = null;
	#constructor() {
		// TO DO: set up any files, anything else that needs doing
	}

	static getInstance() {
		if(#instance == null) {
			#instance = new Logger();
		}
		return #instance;
	}

	static log(msg) {
		// TODO: Extend this

		console.log(msg);
	}
}