// EXPORTS
exports.getTeams = getTeams;
exports.createTeamGET = createTeamGET;
exports.createTeamPOST = createTeamPOST;
exports.getTeamMembers = getTeamMembers;


var Team = require('../schemas/team');

// router.use('/create-team', createTeam)

function getTeams (req, res, next) {

	var page = 'teams';
	var title = 'Teams';
	var user = req.session.user;

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

	res.render(page, {
		title : title,
		user : user,
		partials : {
			header : 'header',
			footer : 'footer'
		},
		isCreateTeamPage : true
	});

}

function createTeamPOST (req, res, next) {

	// res.send(req.body);

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