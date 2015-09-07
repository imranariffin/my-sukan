var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var School = {
	name : String,
	id : ObjectId
};

module.exports = School;