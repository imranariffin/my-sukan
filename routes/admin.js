var express = require('express');
var router = express.Router();

// required modules
var csvConverter = require('csvtojson').Converter;
var fs = require('fs');

// db
var School = require('../schemas/school');
var User = require('../schemas/user');

// // router middlewares
// var updateSchools = require('./updateSchools');

/* GET admin home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Admin',
  	admin : true
  });
});

/* GET: admin views all schools */
router.get('/schools', function (req, res, next) {
	School.find({})
		.exec(function (err, schools) {
			if (err)
				res.send(err);
			else
				res.send(schools);
		});
});

/* GET: admin views all users */
router.get('/users', function (req, res, next) {
	User.find({})
		.exec(function (err, users) {
			if (err)
				res.send(err);
			else
				res.send(users);
		});
});

/* DELETE: admin removes a school by id */
router.get('/delete-school/:schoolId', function (req, res, next) {
	var schoolId = req.params.schoolId;

	School.remove({_id : schoolId}, function (err) {
		if (err)
			res.send(err);
		else
			res.send('SUCCESS: removed school: ' + schoolId);
	})
});

/* POST: update schools to DB from csv file */
router.post('/update-schools', updateSchools);

module.exports = router;

//////////////////////////////
/******** MIDDLEWARES *******/
//////////////////////////////

function updateSchools (req, res, next) {
	// get file from csv
	var fileStream = fs.createReadStream('./csv/world-universities.csv');
	// parse to school json
	var converter = new csvConverter ({constructResult : true});
	var n = 0;
	converter.on('end_parsed', function (schools) {
		// schools.filter(function (e) {
		// 	return (e.AD === 'CA');
		// }).forEach(function (_school, i, _schools) {
		// 	var school = new School ({
		// 		name : _school['University of Andorra']
		// 	});
		// 	school.save();

		// 	n++;
		// 	if (n === _schools.length - 1)
		// 		res.send('done uploading all schools');
		// });
	});

	// read from file
	fileStream.pipe(converter);
}