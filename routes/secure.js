// var express = require('express');
// var router = express.Router();

module.exports = requireAdmin;

function requireAdmin (req, res, next) {
	var user = req.session.user;

	if (user.isAdmin)
		next();
	else
		res.send('err shall not pass: must be admin.');
}