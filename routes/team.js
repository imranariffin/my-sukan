// EXPORTS
exports.getTeams = getTeams;
exports.createTeamGET = createTeamGET;
exports.createTeamPOST = createTeamPOST;
exports.joinTeam= joinTeam;
// exports.getTeamMembers = getTeamMembers;


var Team = require('../schemas/team');
var Game = require('../schemas/game');

// router.use('/create-team', createTeam)

function getTeams (req, res, next) {

	var page = 'teams';
	var title = 'Teams';
	var user = req.session.user;

	console.log(title);

	Team.find({}, function (err, teams) {
		if (err)
			res.send(err);
		else
			// res.send(teams);
			res.render(page, {
				title : title,
				user : user,
				partials : {
					header : 'header',
					footer : 'footer'
				},
				isTeamPage : true,

				teams : teams
			});
	});
}

function createTeamGET (req, res, next) {

	var page = 'create-team';
	var title = 'Create A Team';
	var user = req.session.user;
	var gameNames;

	// get game names
	Game
		.find({})
		.exec(function (err, games) {
			if (err) 
				res.send(err);
			else
				gameNames = games.map(function (e, i, a) {
					return e.name;
				});

			// res.send(gameNames);

			res.render(page, {
				title : title,
				user : user,
				partials : {
					header : 'header',
					footer : 'footer'
				},
				isCreateTeamPage : true,

				gameNames : gameNames
			});
		});
}

function createTeamPOST (req, res, next) {

	// res.send(req.body);

	var user = req.session.user;

	if (!user)
		res.send("team leader: please login to create team");
	else
		// create new team
		var team = new Team({

			name : req.body.teamName,
			game : req.body.game,
			leader : req.body.leader,
			code : req.body.teamCode,
			members : [req.body.leader]

		}).save(function (err) {

			if (err)
				res.send(err);
			else
				res.redirect('/teams');

		});
}

function joinTeam (req, res, next) {

	var user = req.session.user;
	var teamId = req.body.teamId;
	var correctcode = req.body.correctcode;
	var code = req.body.code;

	if (!user)
		res.send("please login to join teams");
	else if (correctcode != code)
		res.send("incorrect code. Contact the team leader for code");
	else	
		Team
			.findById(teamId)
			.exec(function (err, team) {
				if (err)
					res.send(err);
				else if (team.members.indexOf(user._id) != -1)
					res.send("you are already in the team");
				 else {
				 	team.members.push(user._id);
				 	team.save(function (err) {
				 		if (err)
				 			res.send(err);
				 		else
				 			res.send("You've successfully joined the team! All the best for mysukan2015!");
				 	});
				 }
			});
}

function getTeamMembers (req, res, next) {
	// var memberIds = req.query.memberIds;

	// // convert memberIds into an arr;
	// for (var i=0; i<memberIds.length; i++) {

	// }

	// User.find({})
	// 	.where('_id').in(memberIds)
	// 	.exec(function () {

	// 	});

	res.send({members : 'memberzzz'});
}