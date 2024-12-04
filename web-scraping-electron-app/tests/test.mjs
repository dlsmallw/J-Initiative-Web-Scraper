
import assert from 'assert';
import {describe, it } from 'node:test';
import {Sanitizer, SanitizeProtocol} from '../renderer/js/sanitizer.js';

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

function testSanitizer() {
	
	const sqlMap = {
	      '%': '&#x25;',
	      '_': '-',
	      '^': '&#x2191;',
	      "'": '&#x27;',
	      "/": '&#x2F;',
	      "[": '(',
	      "]": ')',
	};
	const htmlMap = {
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
	let textInput = "Test Value, ";
	let textInput2 = "VarChild";
	let sanProtocol = new SanitizeProtocol("[%_^\'\/\\[\\]]", sqlMap);
	let sanProtocol2 = new SanitizeProtocol("[%_^\'\/\\[\\]]", htmlMap);
	let expressionMap = {"ESCAPE": "escape", "toggle": "TOGGLE"}; 
	let expressionMap2 = {'ESCAPE': 'escape'};

	describe('Sanitizer', function () {
		describe('#getInput()', function () {
	    	it('should return whatever value was initially set by constructor', function () {
	    		const san = new Sanitizer(textInput, new SanitizeProtocol(), {"ESCAPE": "escape", "toggle": "TOGGLE"});
	      		assert.equal(san.getInput(), textInput);
	    	});
	    	it('should allow null input for inputString', function () {
	    		let input = null;
	    		const san = new Sanitizer(input, new SanitizeProtocol(), {"ESCAPE": "escape", "toggle": "TOGGLE"});
	      		assert.equal(san.getInput(), input);
	    	});
	  	});
	  	describe('#setInput()', function () {
	    	it('should set the input to a new value', function () {
	    		const san = new Sanitizer(textInput, new SanitizeProtocol(), {"ESCAPE": "escape", "toggle": "TOGGLE"});
	    		san.setInput(textInput2);
	      		assert.equal(san.getInput(), textInput2);
	      		assert.notEqual(san.getInput(), textInput);
	    	});
	    	it('should set the input to a null', function () {
	    		let input = "Test Value, ";
	    		let input2 = null;
	    		const san = new Sanitizer(input, new SanitizeProtocol(), {"ESCAPE": "escape", "toggle": "TOGGLE"});
	    		san.setInput(input2);
	      		assert.equal(san.getInput(), input2);
	      		assert.notEqual(san.getInput(), input);
	    	});
	  	});
	  	describe('#getProtocol()', function () {
	    	it('should return whatever value was initially set by constructor', function () {
	    		const san = new Sanitizer(textInput, sanProtocol, expressionMap);
	      		assert.equal(san.getProtocol(), sanProtocol);
	    	});
	  	});
	  	describe('#setProtocol()', function () {
	    	it('should set the protocol to the newly input one', function () {
	    		const san = new Sanitizer(textInput, sanProtocol, expressionMap);
	    		san.setProtocol(sanProtocol2);
	      		assert.equal(san.getProtocol(), sanProtocol2);
	      		assert.notEqual(san.getProtocol(), sanProtocol);
	    	});
	  	});
	  	describe('#getExpressionMap()', function () {
	    	it('should return whatever value was initially set by constructor', function () {
	    		const san = new Sanitizer(textInput, sanProtocol, expressionMap);
	      		assert.equal(san.getExpressionMap(), expressionMap);
	    	});
	  	});
	  	describe('#setExpressionMap()', function () {
	    	it('should set the protocol to the newly input one', function () {

	    		const san = new Sanitizer(textInput, sanProtocol, expressionMap);
	    		san.setExpressionMap(expressionMap2);
	      		assert.equal(san.getExpressionMap(), expressionMap2);
	      		assert.notEqual(san.getExpressionMap(), expressionMap);
	    	});
	  	});
	  	describe('#sqlMode()', function () {
	    	it('should set the expression map and sanitize protocol to match common SQL injections', function () {
	    		const san = new Sanitizer(textInput, new SanitizeProtocol(), {});
	    		san.sqlMode();
	    		const map = san.getExpressionMap();
	    		const protocol = san.getProtocol();

	      		assert.equal(Object.keys(map).length, 1);
	      		assert.equal(map.ESCAPE, 'escape');

	      		assert.equal(Object.keys(protocol).length, 2);
	      		assert.equal(protocol.regexString, "[%_^\'\/\\[\\]]");

	      		const keys = Object.keys(protocol.sanitizationMapping);
	      		keys.forEach((key) => {
	      			//console.log(key);
	      			assert.equal(protocol.sanitizationMapping.key, sqlMap.key); 
	      		});
	    	});
	  	});
	});
	return true;
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

// Note: the renderer doesn't have functions that can be unit tested outside of logger interfacing ones
function testRenderer() {
	
}


function runTests() {
	try {
		assert(test(), "Testing 1 == 1");
		//assert(testRenderer(), "Testing renderer functions");
		assert(testSanitizer(), "Testing sanitizer functions");
		//basicExample();

	}
	catch(err) {
		if(err instanceof assert.AssertionError) {
			console.log("One or more tests failed!");
			console.log(err.toString());
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
