
exports.GET = signupGET;
exports.POST = signupPOST;

function signupGET (req, res, next) {
	res.render('signup', {
		title : 'Signup'
	});
}

function signupPOST (req, res, next) {
	res.send('signup POST');
}