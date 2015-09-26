
var twitterKeys = require('../auth/config').twitter;

// var request = require('request');

var Twitter = require('mtwitter');
var twitter = new Twitter({
	consumer_key : twitterKeys.consumerKey,
	consumer_secret : twitterKeys.consumerSecret,
	application_only : true
});

// hashtag
// var hashtag = 'sehatisejiwa';
// var hashtag = 'istandwithahmed';
var hashtag = 'kipidap';

exports.byhastag = byhastag;
exports.updateTweets = updateTweets;

function byhastag (req, res, next) {

	var byhashtagUrl = 'search/tweets';
	var search_query = '%23'+hashtag;
	// &result_type=recent&include_entities=10';

	twitter.get(byhashtagUrl, {
		q : search_query
	}, function (err, items, response) {

		// res.send(err);
		// res.send(items);
		// res.send(response);
		// res.send(req.session.user);

		res.render('tweets', {
			tweets : items,
			user : req.user,
			partials : {
				header : 'header',
				footer : 'footer'
			},
			isTweetPage : true
		});
	});
}

function updateTweets (req, res, next) {

	var byhashtagUrl = 'search/tweets';
	var search_query = '%23'+hashtag;
	// &result_type=recent&include_entities=10';

	twitter.get(byhashtagUrl, {
		q : search_query
	}, function (err, items, response) {
		res.send(items);
	});
}