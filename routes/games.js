var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('../schemas/user');
var School = require('../schemas/school');

/* password hasher for much security */
var bcrypt = require('bcryptjs');

/* EXPORTS */
exports.GET = gamesGET;
// exports.POST = gamesPOST;

/* CALLBACK function definitions */

function gamesGET (req, res, next) {

	var page = 'games';
	var title = 'Games';

	if (req.session.user) {
		User.findOne({email : req.session.user.email}, function (err, user) {
			if (err) {
				res.send(err);
			} else if (user) {
				res.render(page, { 
					user : user,
					title : title,
					isGamesPage : true,
					partials : {
						header : 'header',
						footer : 'footer'
					}
				});
			} else {
				res.render(page, { 
					title : title,
					isGamesPage : true,
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
			isGamesPage : true,
			partials : {
				header : 'header',
				footer : 'footer'
			}
		});
	}

	// res.render('games', {
	// 	title : 'Games',
	// 	isGamesPage : true,
	// 	partials : {
	// 		header : 'header',
	// 		footer : 'footer'
	// 	}
	// });
}
