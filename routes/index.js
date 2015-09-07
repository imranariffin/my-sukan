var express = require('express');
var router = express.Router();

/* ROUTES IMPORT */
var getAllUniversities = require('./get-all-universities');
var signup = require('./signup');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Sukan 2016' });
});

/* GET: list of all Canadian universities from CSV */
router.get('/get-all-universities', getAllUniversities);

/* GET: user signup */
router.get('/signup', signup.GET);

module.exports = router;