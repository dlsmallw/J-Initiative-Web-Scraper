
test();
console.assert(1 == 2, "Testing 1 == 2");

function test() {
	if(1 == 2) {
		console.log("test");
		//process.exit();
		console.log("test2");
		process.exitCode = 1;
		
	}
}

