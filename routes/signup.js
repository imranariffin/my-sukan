var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('../schemas/user');
var School = require('../schemas/school');

/* password hasher for much security */
var bcrypt = require('bcryptjs');

/* EXPORTS */
exports.GET = signupGET;
exports.POST = signupPOST;
exports.validateForm = validateForm;

/* CALLBACK function definitions */

function signupGET (req, res, next) {

	var page = 'signup';
	var title = 'Signup';

	if (req.session.user) {
		User.findOne({email : req.session.user.email}, function (err, user) {
			if (err) {
				res.send(err);
			} else if (user) {
				res.render(page, { 
					user : user,
					title : title,
					isSignupPage : true,
					partials : {
						header : 'header',
						footer : 'footer'
					}
				});
			} else {
				res.render(page, { 
					title : title,
					isSignupPage : true,
					partials : {
						header : 'header',
						footer : 'footer'
					}
				});
			}
		});
	} else {
		res.render(page, { 
			title : title,
			isSignupPage : true,
			partials : {
				header : 'header',
				footer : 'footer'
			}
		});
	}

	// res.render('signup', {
	// 	title : 'Signup',
	// 	partials : {
	// 		header : 'header',
	// 		footer : 'footer'
	// 	},
	// 	isSignupPage : true
	// });
}

function signupPOST (req, res, next) {
	// everything good: all tests passed

	// hash again
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(req.body.password, salt);

	// find school id with the exact name from request
	School.findOne({name : req.body.school}, function (err, school) {
		if (err)
			res.send(err);
		else {

			// check if user wants to be volunteer
			var isVolunteer = req.body.becomeVolunteer;
			if (isVolunteer === 'on')
				isVolunteer = true;
			else
				isVolunteer = false;

			var newUser = new User ({
				/* BASIC INFORMATION */
				firstName : req.body.firstName,
				lastName : req.body.lastName,
				email : req.body.email,
				isVolunteer : isVolunteer,

				/* OAuth */
				password : password,

				/* FUNCTIONAL INFORMATION */
				// list of sports id
				sports : [],
				// schoold id
				school : school._id

			}).save(function (err) {
				if (err)
					res.send(err);
				else
					// res.send('SUCCESS: save user on signup');
					res.redirect('/games');
			});
		}
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

/* HELPER functions definitions */