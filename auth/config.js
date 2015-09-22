// var callbackURL = path.join('http://imranariffin-login-pag.elasticbeanstalk.com', '/auth/facebook/callback');

// production
var productionCallbackUrl = 'http://my-sukan-2016.herokuapp.com/auth/facebook/callback';
var mysukan_secret = '003b7b4ce78b7542a9da476995bedae2';
var mysukan_id = '748112425316942';

var dummy;

module.exports = {
	'facebook' : {
		'clientID' : '1620888751493470',
		'clientSecret' : 'f376d18b026e5bb842062f86cde484ab',
		// 'callbackURL' : callbackURL,
		// 'callbackURL' : 'http://localhost:3000/auth/facebook/callback'
		// 'callbackURL' : 'http://localhost:3000/auth/facebook/callback'
		// 'clientID' : mysukan_id,
		// 'clientSecret' : mysukan_secret,
		'callbackURL' : productionCallbackUrl
	},
	'twitter' : {
		'consumerKey' : 'VidKk5Rk8mCQswnS55gwvWFqU',
		'consumerSecret' : 'tCUiynOQYgY793ssFQWrIzIx2CfIAwhgiO08EptA1lFIFzmcrM'
	}
};