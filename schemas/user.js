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
	// user types
	isVolunteer : {type : Boolean, default : false},
	isAdmin : {type : Boolean, default : false},

	/* OAuth */
	password : String,

	/* FUNCTIONAL INFORMATION */
	// list of sports id
	games : [String],
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