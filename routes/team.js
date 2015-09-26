// EXPORTS
exports.getTeams = getTeams;
exports.createTeamGET = createTeamGET;
exports.createTeamPOST = createTeamPOST;


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
			res.render(page, {
				title : title,
				user : user,
				partials : {
					header : 'header',
					footer : 'footer'
				},

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
	res.send(req.body);
}