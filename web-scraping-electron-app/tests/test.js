
import assert from 'assert';
import {describe, it } from 'node:test';
import testVal from '../renderer/js/renderer.js';


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

function basicExample() {
	describe('Array', function () {
		describe('#indexOf()', function () {
	    	it('should return -1 when the value is not present', function () {
	      		assert.equal([1, 2, 3].indexOf(4), -1);
	    	});
	  	});
	});
}

function testRenderer() {
	describe('Array', function () {
		describe('testVal', function () {
			it('Check if variable is present', function () {
				assert.equal(testVal, 4);
			});
		});
	});
}


function runTests() {
	try {
		assert(test(), "Testing 1 == 1");
		//assert(testRenderer(), "Testing renderer functions");
		basicExample();

	}
	catch(err) {
		if(err instanceof assert.AssertionError) {
			console.log("One or more tests failed!");
			process.exitCode = 1; // This indicates an error occurred when the process exits.
		}
		else {
			// Some other error occurred?
			console.log("Unexpected error!");
			console.log(err.toString());
			process.exitCode = 1;
		}
	}
}
