
var twitterKeys = require('../auth/config').twitter;

// var request = require('request');

var Twitter = require('mtwitter');
var twitter = new Twitter({
	consumer_key : twitterKeys.consumerKey,
	consumer_secret : twitterKeys.consumerSecret,
	application_only : true
});

exports.byhastag = byhastag;
exports.updateTweets = updateTweets;

function byhastag (req, res, next) {

	var byhashtagUrl = 'search/tweets';
	var search_query = '%23istandwithahmed';
	// &result_type=recent&include_entities=10';

	twitter.get(byhashtagUrl, {
		q : search_query
	}, function (err, items, response) {

		// res.send(err);
		// res.send(items);
		// res.send(response);

		res.render('tweets', {
			tweets : items,
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
	var search_query = '%23istandwithahmed';
	// &result_type=recent&include_entities=10';

	twitter.get(byhashtagUrl, {
		q : search_query
	}, function (err, items, response) {
		res.send(items);
	});
}