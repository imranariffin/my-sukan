
exports.randomString = randomString;

function randomString (length) {
	var randomstring = "";

	for (var i=0; i<length; i++) {
		randomstring += String(Math.floor(Math.random()*10));
	}

	return randomstring;
}

