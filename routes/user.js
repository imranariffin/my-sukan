// var express = require('express');
// var router = express.Router();

// db
var School = require('../schemas/school');
var User = require('../schemas/user');
var Game = require('../schemas/game');
// // router middlewares
// var updateSchools = require('./updateSchools');

exports.updateProfileGET = updateProfileGET;
exports.updateProfilePOST = updateProfilePOST;

/* GET admin home page. */
function updateProfileGET (req, res, next) {

	var user = req.session.user;
	// if (!user)
		// user = req.session.user;

	res.render('update-profile', { 
  		title: 'Update Profile',
  		user : user,
  		isUpdateprofilePage : true,
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