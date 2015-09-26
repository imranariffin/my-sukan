// var express = require('express');
// var router = express.Router();

exports.requireAdmin = requireAdmin;

function requireAdmin (req, res, next) {
	var user = req.session.user;

	if (!user)
		res.send('err: please sign in');
	else if (user.isAdmin)
		next();
	else
		res.send('err shall not pass: must be admin.');
}