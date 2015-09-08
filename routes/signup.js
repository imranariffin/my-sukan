var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('../schemas/user');

/* password hasher for much security */
var bcrypt = require('bcryptjs');

/* EXPORTS */
exports.GET = signupGET;
exports.POST = signupPOST;
exports.validateForm = validateForm;

function signupGET (req, res, next) {
	res.render('signup', {
		title : 'Signup'
	});
}

function signupPOST (req, res, next) {
	// everything good: all tests passed

	// hash again
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(req.body.password, salt);

	var newUser = new User ({
		/* BASIC INFORMATION */
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,

		/* OAuth */
		password : password,

		/* FUNCTIONAL INFORMATION */
		// list of sports id
		sports : [],
		// schoold id
		school : req.body.schoolId,
	});
}

function validateForm (req, res, next) {

	// get all form inputs
	var email = req.body.email;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var school = req.body.school;

	// gotta hash 'em password no matter what
	// use same salt to get same hash
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(req.body.password, salt);
	var confirmPassword = bcrypt.hashSync(req.body.confirmPassword, salt);

	// first layer check: all input must not be empty
	if (firstName === "" || lastName === "" || school === "" ||
	 password === "" || confirmPassword === "")
		res.send('ERR signup: one of input is empty');

	// second layer check: password must match
	else if (password != confirmPassword)
		res.send("ERR signup: password doesn't match");

	// third layer check: email not available
	else {
		User.findOne({email : email})
			.exec(function (err, user) {
				if (err)
					res.send(err);
				else if (user) {
					// fourth layer check: user has facebook
					if (!user.facebook.isLinked)
						res.send('ERR signup: email oredy in use');
					else {
						// link facebook account
						next();
					}
				} else 
					// everything is good. proceed to post form to db
					next();
			});
	}

	// // everything is good. proceed to post form to db
	// next();
}