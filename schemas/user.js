var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = mongoose.model('User', new Schema ({

	/* BASIC INFORMATION */
	firstName : String,
	lastName : String,
	email : String,
	// url of profile photo
	photo : {type : String, default : ""},
	id : ObjectId,

	/* OAuth */
	password : String,

	/* FUNCTIONAL INFORMATION */
	// list of sports id
	sports : [String],
	// schoold id
	school : String,

	// facebook
	facebook : {
		profile : Object,
		accessToken : String,
		isLinked : {
			type : String,
			default : false
		}
	}
	
}));

module.exports = User;