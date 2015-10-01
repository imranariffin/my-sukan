// var express = require('express');
// var router = express.Router();

// db
var School = require('../schemas/school');
var User = require('../schemas/user');
var Game = require('../schemas/game');

// // router middlewares
// var updateSchools = require('./updateSchools');
var nodemailer = require("nodemailer");
var config = require("../auth/config.js");
var randomString = require('../functions/scripts').randomString;
var bcrypt = require('bcryptjs');

exports.updateProfileGET = updateProfileGET;
exports.updateProfilePOST = updateProfilePOST;
exports.forgotPasswordPOST = forgotPasswordPOST;
exports.forgotPassword = forgotPassword;
exports.resetPage= resetPage;
exports.reset = reset;

/* GET admin home page. */
function updateProfileGET (req, res, next) {

	var user = req.session.user;
	// if (!user)
		// user = req.session.user;

	if (!user)
		res.send("please sign to update profile");
	else
		res.render('update-profile', { 
	  		title: 'Update Profile',
	  		user : user,

	  		isUpdateProfilePage : true,

	  		partials : {
	  			header : 'header',
	  			footer : 'footer'
	  		}
	  	});
}

function updateProfilePOST (req, res, next) {

	var email = req.body.email;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var school = req.body.schoolId;

	// update
	User.findOne({email : email}, function (err, user) {
		if (err) {
			res.send(err);
		} else if (!user) {
			res.send('err: no user found');
		} else {

			// user.school = school;
			var schoolName = req.body.school;
			School.findOne({name : schoolName}, function (err, school) {
				if (err) {
					res.send(err);
				} else {
					user.school = String(school._id);
					user.firstName = firstName;
					user.lastName = lastName;

					// save
					user.save(function (err) {
						if (err)
							res.send(err);
						else
							res.redirect('/games');
					});
				}
			});
		}
	});
}

function forgotPassword (req, res, next) {

	var user = req.session.user;
	var page = 'forgot';

	res.render(page, {

		user : user,

		partials : {
			header : 'header',
			footer : 'footer'
		}
	});
}

function forgotPasswordPOST (req, res, next) {

	var user = req.session.user;
	var userEmail = req.body.email;

	// res.send(config.nodemailer);

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport("SMTP", {
	    service: 'gmail',
	    auth: {
	        user: config.nodemailer.user,
	        pass: config.nodemailer.pass
	    }
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	var resetToken = randomString(10);
	var resetLink = "http://my-sukan-2016.herokuapp.com/reset/" + resetToken;
	// var resetLink = "http://localhost:3000/reset/" + resetToken;
	User
		.findOne({email : userEmail})
		.exec(function (err, user) {
			if (err)
				res.send(err);
			else {

				user.resetToken = resetToken;
				user.save();

				htmlBody = "Your password has been reset. Using the reset token given,"
				htmlBody += " go to my-sukan-2016.herokuapp.com/reset/"
				htmlBody += resetToken + " to reset your password<br>"
				htmlBody += "or click the <a href='" + resetLink + "'>Reset link</a><br>token: " + resetToken;

				// setup e-mail data with unicode symbols
				var mailOptions = {
				    from: 'Imran Ariffin <ariffinimran@gmail.com>', // sender address
				    to: userEmail,
				    subject: 'MySukan2015 password reset', // Subject line
				    text: '', // plaintext body
				    html:  htmlBody // html body
				};

				// send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        return console.log(error);
						res.send(err);
				    }
				    console.log('Message sent: ' + info.response);
				    res.send("Email sent to " + userEmail + " with instructions to reset your password");
				});
			}
		});
}

function resetPage (req, res, next) {

	var page = 'reset';
	var resetToken = req.params.resetToken;

	res.render(page, {

		resetToken : resetToken,
		partials : {
			header : 'header',
			footer : 'footer'
		}
	});
}

function reset (req, res, next) {

	var email = req.body.email;
	var token = req.body.token;
	var newPassword = req.body.newPassword;
	// res.send(req.body);

	// hash again
	var salt = bcrypt.genSaltSync(10);
	var newPassword = bcrypt.hashSync(newPassword, salt);

	User
		.findOne({email : email})
		.exec(function (err, user) {
			if (err)
				res.send(err);
			else {
				user.password = newPassword;
				user.save(function (err) {
					if (err)
						res.send(err);
					else
						res.send("success: password reset");
				});
			}
		});

	// check if user wants to be volunteer

}

function validateReset (req, res, next) {

	var newPassword = req.body.newPassword;
	var confirmNewPassword = req.body.confirmNewPassword;
	var token = req.body.token;
	var email = req.bcrypt.email;

	if (
		(email.length==0) || (token.length==0) || 
		(newPassword.length==0) || (confirmNewPassword.length==0)
	)
		res.send("insufficient information");
	else
		User
			.findOne({ email : email})
			.exec(function (err, user) {
				if (err)
					res.send(err);
				else {
					if (token === user.resetToken) {
						if (bcrypt.compareSync(newPassword, confirmNewPassword))
							next();
						else
							res.send("error: passwords don't match");
					} else {
						res.send("error: incorrect token");
					}
				}
			});
}