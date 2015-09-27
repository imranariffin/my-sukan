var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Team = mongoose.model('Team', new Schema ({

	name : String,
	game : String,
	leader : String,
	code : String,
	members : [String]

}));

module.exports = Team;