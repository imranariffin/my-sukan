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
	res.render('games', {
		title : 'Games',
		isGamesPage : true,
		partials : {
			header : 'header-signup',
			footer : 'footer-games'
		}
	});
}
