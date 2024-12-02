const assert = require('assert');

runTests();



/**
 * Basic test format. 
 */
function test() {
	if(1 == 1) {
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
			console.log("One or more tests failed!");
			process.exitCode = 1; // This indicates an error occurred when the process exits.
		}
		else {
			// Some other error occurred?
			console.log("Unexpected error!");
			process.exitCode = 1;
		}
	}
}
