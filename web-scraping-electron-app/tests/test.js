

console.assert(1 == 2, test());

function test() {
	if(1 == 2) {
		let a = 1 + {'1'};
		throw new Error('Error forced');
		
	}
}

test();