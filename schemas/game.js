var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Game = mongoose.model('Game	', new Schema ({
	name : String,
	id : ObjectId,

	categories: [String],
	venues : Object,

}));

module.exports = Game;