
// required modules
var csvConverter = require('csvtojson').Converter;
var fs = require('fs');

module.exports = getAllUniversities;

function getAllUniversities (req, res, next) {

	var keyWords = req.query.keyWords;

	// console.log('req.query:');
	// console.log(req.query);

	// res.send(req.query);

	// read csv
	fileStream = fs.createReadStream('./csv/world-universities.csv');
	// res.send(fileStream);

	var converter = new csvConverter({constructResult : true});
	// parse
	converter.on('end_parsed', function (jsonObj) {
		// send

		// res.send({

		// 	'response' : 'University of toronto torontozz'.match(/toronto/i)	

		// });

		// filter: choose one Canadian universities
		res.send(
			jsonObj.filter(function (e) {

				// console.log("e['University of Andorra']:");
				// console.log(e['University of Andorra']);
				// if (e['University of Andorra'].match(new RegExp(keyWords, 'i'))) {
				// 	console.log('MATCHED: keyWords= ' + keyWords);
				// 	console.log('University= ' + e['University of Andorra']);
				// }

				// console.log('keyWords:');
				// console.log(keyWords);
				// console.log("e['University of Andorra'].match(new RegExp(keyWords, 'i'):");
				// console.log(e['University of Andorra'].match(new RegExp(keyWords, 'i')));

				return (
					(e.AD === 'CA') && 
					(e['University of Andorra'].match(new RegExp(keyWords, 'i')))
				);
			}));
	});

	// read from file
	fileStream.pipe(converter);
}