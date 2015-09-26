var express = require('express');
var router = express.Router();

var User = require('../schemas/user');

/* ROUTES IMPORT */
var getAllUniversities = require('./get-all-universities');
var signup = require('./signup');
var signin = require('./signin');
var games = require('./games');
var tweets = require('./tweet');
var user = require('./user');
var team = require('./team');

/* GET home page. */
router.get('/', homeGET);

/* GET: list of all Canadian universities from CSV */
router.get('/get-all-universities', getAllUniversities);

/* GET: user signup */
router.get('/signup', signup.GET);

/* POST: user signup */
router.post('/signup', signup.validateForm, signup.POST);

/* GET: user signin */
router.get('/signin', signin.GET);

/* POST: user signin */
router.post('/signin', 
	signin.validateForm, 
	signin.POST);

/* GET: user updates profile or completes registration */
router.get('/update-profile', user.updateProfileGET);

/* POST: user updates profile or competes registration */
router.post('/update-profile', user.updateProfilePOST);

/* GET: user logs out */
router.get('/logout', signout);

// future routes
/*
	GET /update-profile
	POST /update-profile
	GET /enrol -- enrol in a game
	POST /enrol -- enrol in a game
	POST /set-profile-picture (or should it be PUT?)
	GET /scoreboard -- shows current scores of all games	
*/

/* GET page to enrol in games */
router.get('/enrol', enrolGET);

/* GET page to view details of all games */
router.get('/games', games.GET);

/* GET page to view details of all games */
router.get('/games/enrol', games.enrolGET);

// ************ TEAMS ************ //
router.get('/teams', team.getTeams);
router.get('/create-team', team.createTeamGET);
router.post('/create-team', team.createTeamPOST);


/////////* TWITTER API routes */////////////

/* GET tweets by hastag */
router.get('/tweets', tweets.byhastag);
router.get('/update-tweets', tweets.updateTweets);

// callback
router.get('/auth/twitter/callback', function (req, res, next) {
	res.send('twiter callback');
});

/*TEST $.scrollTo */

router.get('/scroll-to', scrollTo);

function scrollTo (req, res) {
	res.render('scroll-to', {
		title : 'jQuery.scrollTo',
		partials : {
			header : 'header',
			footer : 'footer'
		}
	});
}

module.exports = router;

/* ROUTE callback functions */
function enrolGET (req, res, next) {
	res.render('enrol', {
		title : 'enrol',
		partials : {
			header : 'header',
			footer : 'footer'
		}
	});
}

function homeGET (req, res, next) {

	// res.send(req.session.user.email);

	if (req.session.user) {
		User.findOne({email : req.session.user.email}, function (err, user) {
			if (err) {
				res.send(err);
			} else if (user) {
				res.render('scroll-to', { 
					user : user,
					partials : {
						header : 'header',
						footer : 'footer'
					},
					isHomePage : true
				});
			} else {
				res.render('scroll-to', { 
					partials : {
						header : 'header',
						footer : 'footer'
					},
					isHomePage : true
				});
			}
		});
	} else {
		res.render('scroll-to', { 
			partials : {
				header : 'header',
				footer : 'footer'
			},
			isHomePage : true
		});
	}
}

function signout (req, res, next) {

	req.session.reset();
	req.user.reset();

	// TEST
	console.log('req.session:');
	console.log(req.session);
	console.log('req.user:');
	console.log(req.user);

	res.redirect('/');
}