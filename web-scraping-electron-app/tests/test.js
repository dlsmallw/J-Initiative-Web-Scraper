const assert = require('assert');

runTests();




function test() {
	if(1 == 1) {
		console.log("test");
		//process.exit();
		console.log("test2");
		process.exitCode = 1;
		
	}
}


function runTests() {
	try {
		assert(1 == 2, "Testing 1 == 2");
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
