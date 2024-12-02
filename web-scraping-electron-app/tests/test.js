const assert = require('assert');

runTests();



/**
 * Basic test format. 
 */
function test() {
	if(1 == 2) {
		return true;
		
	}
	else {
		return false;
	}
}


function runTests() {
	try {
		assert(test(), "Testing 1 == 1");
	}
	catch(err) {
		if(err instanceof assert.AssertionError) {
			console.log("testing failure");
			process.exitCode = 1;
		}
		else {
			// Some other error occurred?
			console.log("Unexpected error!");
			process.exitCode = 1;
		}
	}
}
