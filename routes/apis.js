
var School = require('../schemas/school');
var User = require('../schemas/user');
var Game = require('../schemas/game');
var Team = require('../schemas/team');

// exports
exports.getUserById = getUserById;
exports.isUserATeamMember = isUserATeamMember;
exports.getTeams = getTeams;
exports.getTeamMembers = getTeamMemberNames;
exports.getGames = getGames;
exports.getSchoolName = getSchoolName;

///////////////////////////////////////////
/////// api middleware definitions ////////
///////////////////////////////////////////

function getUserById (req, res, next) {

	var userId = req.query.userId;

	User
		.findById(userId)
		.exec(function (err, user) {
			if (err)
				res.send(err);
			else
				res.send(user);
		});
}

function isUserATeamMember (req, res, next) {
	var user;
	if (!req.session)
		res.send({response : false});
	else if (!req.session.user)
		res.send({response : false});
	else {

		user = req.session.user;
		var teamId = req.query.teamId;
		var userId = user._id;

		Team
			.findById(teamId)
			// .where('members').in([userId])
			.exec(function (err, team) {
				if (err)
					res.send(err);
				else if 
				(
					team && 
					(team.members.indexOf(userId) != -1) &&
					team.leader == userId
				)
					res.send({response : true, isLeader : true});
				else if 
				(
					team && 
					(team.members.indexOf(userId) != -1)
				)
					res.send({response : true, isLeader : false});
				else
					res.send({response : false});
			});
	}

}

function getTeams (req, res, next) {
	Team
		.find({})
		.exec(function (err, teams) {
			if (err)
				res.send(err);
			else
				res.send(teams);
		});
}

function getTeamMemberNames (req, res, next) {
	var memberIds = req.query.memberIds;

	// convert memberIds into an arr;
	memberIds = memberIds.split(',');

	// res.send(memberIds);

	User.find({})
		.where('_id').in(memberIds)
		.exec(function (err, users) {
			if (err)
				res.send(err);
			else
				res.send(users.map(function (e, i, a) {
					return e.firstName;
				}));
		});

	// res.send({members : 'memberzzz'});
}

function getGames (req, res, next) {
	Game
		.find({})
		.exec(function (err, games) {
			if (err)
				res.send(err);
			else
				res.send(games);
		});
}

function getSchoolName (req, res, next) {

	var user = req.session.user;
	var schoolId = user.school;

	School
		.findOne({ _id : schoolId })
		.exec(function (err, school) {
			res.send({schoolName : school.name});
		});

}