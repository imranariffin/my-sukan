var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Game = mongoose.model('Game', new Schema ({
	_id : ObjectId,
	
	// from /game route
	id : String,
	name : String,
	venue : String,
	teamSize : String,
	gameplay : String,
	image : String,
	type : String,
	details : [String],
	extras : [String],
	times : [String],
	gameplayAndTiming : [String],
	// 

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