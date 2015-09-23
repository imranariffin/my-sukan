var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('../schemas/user');
var School = require('../schemas/school');

/* password hasher for much security */
var bcrypt = require('bcryptjs');

/* EXPORTS */
exports.GET = signinGET;
exports.POST = signinPOST;
exports.validateForm = validateForm;

function signinGET (req, res, next) {

	var page = 'signin';
	var title = 'Signin';

	if (req.session.user) {
		User.findOne({email : req.session.user.email}, function (err, user) {
			if (err) {
				res.send(err);
			} else if (user) {
				res.render(page, { 
					user : user,
					title : title,
					isSigninPage : true,
					partials : {
						header : 'header',
						footer : 'footer'
					}
				});
			} else {
				res.render(page, { 
					title : title,
					isSigninPage : true,
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
			isSigninPage : true,
			partials : {
				header : 'header',
				footer : 'footer'
			}
		});
	}

}

function signinPOST (req, res, next) {

	var email = req.body.email;
	var password = req.body.password;

	User.findOne({email : email}, function (err, user) {
		if (err) {
			res.send('database error');
		} else if (!user) {
			res.send('err: user not found');
		} else {
			// good

			console.log('password: ' + password)

			// check if password correct
			if (bcrypt.compareSync(password, user.password)) {
				// res.send('good: password correct');
				console.log('good: password correct');


				// save to session
				req.session.user = user;
				req.user = user;

				res.redirect('/games');

			} else {
				res.send('err: incorrect password');
			}
		}
	});
}

function validateForm (req, res, next) {

	// must match password
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(req.body.password, salt);
	var confirmPassword = bcrypt.hashSync(req.body.confirmPassword, salt);

	if (confirmPassword === password)
		next();
	else
		res.send('error: password do not match');
}