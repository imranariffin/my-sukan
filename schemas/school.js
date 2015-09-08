var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var School = mongoose.model('School', new Schema ({
	name : String,
	id : ObjectId
}));

module.exports = School;