var express = require('express');
var router = express.Router();

/* ROUTES IMPORT */
var getAllUniversities = require('./get-all-universities');
var signup = require('./signup');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('header', { title: 'My Sukan 2016' });
});

/* GET: list of all Canadian universities from CSV */
router.get('/get-all-universities', getAllUniversities);

/* GET: user signup */
router.get('/signup', signup.GET);

/* POST: user signup */
router.post('/signup', signup.validateForm, signup.POST);

// future routes
/*
	GET /update-profile
	POST /update-profile
	GET /enrol -- enrol in a game
	POST /enrol -- enrol in a game
	POST /set-profile-picture (or should it be PUT?)
	GET /scoreboard -- shows current scores of all games	
*/

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