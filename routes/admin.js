var express = require('express');
var router = express.Router();

// required modules
var csvConverter = require('csvtojson').Converter;
var fs = require('fs');

// // router middlewares
// var updateSchools = require('./updateSchools');

/* GET admin home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin' });
});

// router.get('')

// /* POST: update schools to DB from csv file */
// router.post('/update-schools', updateSchools);

module.exports = router;

//////////////////////////////
/******** MIDDLEWARES *******/
//////////////////////////////

// function updateSchools (req, res, next) {
// 	// get file from csv
// 	var fileStream = fs.createRead
// 	// parse to school json
// 	// while loop post
// }