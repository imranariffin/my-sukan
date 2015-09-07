var express = require('express');
var router = express.Router();

/* ROUTES IMPORT */
var getAllUniversities = require('./get-all-universities');
var signup = require('./signup');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin' });
});

// router.get('')

module.exports = router;