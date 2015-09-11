var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Game = mongoose.model('Game	', new Schema ({
	name : String,
	id : ObjectId,

	categories: [String],
	venues : Object,

	location : String,
	// timetable: [Date?]
	timetable : Object,

	mainRule : String,
	rules : [String],

	// strings correspond to id's of users who are volunteers
	volunteers : [String]

}));

module.exports = Game;