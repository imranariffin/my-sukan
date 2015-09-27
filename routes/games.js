var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('../schemas/user');
var School = require('../schemas/school');
var Game = require('../schemas/game');

/* password hasher for much security */
var bcrypt = require('bcryptjs');

/* EXPORTS */
exports.GET = gamesGET;
exports.enrolGET = enrolGET;
exports.schedule = schedule;

// exports.POST = gamesPOST;

/* CALLBACK function definitions */

function gamesGET (req, res, next) {

	var page = 'games';
	var title = 'Games';

	if (req.session.user) {
		User.findOne({email : req.session.user.email}, function (err, user) {
			if (err) {
				res.send(err);
			} else if (user) {
				res.render(page, { 
					user : user,
					title : title,
					isGamesPage : true,
					games : games,
					partials : {
						header : 'header',
						footer : 'footer'
					}
				});
			} else {
				res.render(page, { 
					title : title,
					isGamesPage : true,
					games : games,
					partials : {
						header : 'header',
						footer : 'footer'
					}
				});
			}
		});
	} else {
		res.render(page, { 
			title : title,
			isGamesPage : true,
			games : games,
			partials : {
				header : 'header',
				footer : 'footer'
			}
		});
	}

	// res.render('games', {
	// 	title : 'Games',
	// 	isGamesPage : true,
	// 	partials : {
	// 		header : 'header',
	// 		footer : 'footer'
	// 	}
	// });
}

function enrolGET (req, res, next) {

	var page = 'enrol';
	var title = 'Enrol';
	var user = req.session.user;

	res.render(page, {
		user : user,
		title : title,
		partials : {
			header : 'header',
			footer : 'footer'
		}
	});
}

function schedule (req, res, next) {
	var page = 'schedule';

	res.render(page, {
		user : req.session.user,
		title : 'Game Schedule',
		partials : {
			header : 'header',
			footer : 'footer'
		},
		isSchedulePage : true
	});
}

////////////////////
/* games data set */
////////////////////

var games = [
	{
		id : 'soccer',
		name : 'Soccer (M)',
		venue : 'McMaster Soccer Field',
		teamSize : '6',
		gameplay : 'League grouping',
		image : 'kasut.JPG',
		type : 'outdoor',
		details : [
			'15 minutes per half',
			'5 minutes break',
			'7 a side 3 substitutes (rolling)',
			'Two games will commence at the same time as the field is separated into two',
			'Each team has to come up with one regular referee',
			'Linesman is not needed as there will be no offside'
		],
		extras : [
			'Estimation of 12 teams. Three teams in each group.',
			'GROUP STAGE: 6 games (per field)',
			'SEMIFINAL: 1 game (per field)',
			'FINAL: 1 game'
		],
		times : [
			'8.00 am - 8.45 am',
			'8.45 am - 9.30 am',
			'9.30 am - 10.15 am',
			'10.15 am - 11.00 am',
			'11.00 am - 11.45 am',
			'11.45 am - 12.30 pm',
			// semi-final
			'1.00 pm - 1.45 pm',
			// final
			'2.00 pm - 2.45 pm'
		],
		gameplayAndTiming : [
			'1. The first stage would be of the grouping stage. There will be four groups in total and the team with most points from each group will advance to the semi-finals stage.',
			'2. If two teams from the same group share the same points, therefore the team with a greater goal difference will advance through.',
			'3. Each game consist of two halves; 15 minutes per half including a 5 minutes break before the second half commence',
			'4. Each team can only have a maximum of 10 players registered. The game will be 7 a side thus allowing 3 substitutes per team. And substitution is of rolling basis.',
			'5. There will be of no linesman during the game since there will be no offside.'
		]
	},
	{
		id : 'frisbee',
		name : 'Frisbee',
		venue : 'McMaster Soccer Field',
		image : 'dog-with-frisbee.jpg',
		type : 'outdoor',
		times : [
			'2.45pm – 6.00 pm'
		],
		details : [
			'Estimation of 5 to 7 teams',
			'15 minutes per half',
			'First to reach 5 tries will win by default. ',
			'If both team does not reach 5 tries, than the team with most tries within full match time is considered to be the winner',
			'This game will be conducted as soon as soccer ends.'
		],
		gameplayAndTiming : [
			'1. The game is played to 10 points with a 30 minute running time limit which will be timed from a central clock. There will be a warning when there are 5 minutes remaining in regulation. ',
			'2. Half-time will occur when one team reaches 6 points or when 15 minutes of regulation have been played, whichever happens first. ',
			'3. Half-time will be 5 minutes long. ',
			'4. Time lost to injuries cannot and will not be made up. ',
			'5. At the end of regulation time, the point-in-progress shall be completed if there is a differential of one point between the two teams. If at the completion of that point there is a tie, another point shall be played with the team just scoring throwing off to the team scored upon. ',
			'6. Substitutions may be made after each point. ',
			'7. Object of the game is to score goals. A goal is scored each time the offense completes a pass in the defense’s end zone. Each goal counts as 1. Each time a goal is scored, the teams switch directions of their attack. ',
			'8. A coin flip will determine who will receive in the first half. The opposing team receives in the second half. Play is initiated with both teams lining up on the front of their respective end zones line. The defense throws the disc to the offense. Players may not leave their respective end zones until the disc is released',
		]
	},
	{
		id : 'badmintonsingle',
		name : 'Badminton (M&W single)',
		venue : 'Sport Hall, David Braley Athletic Centre',
		teamSize : '1',
		gameplay : 'League grouping',
		image : 'leechongwei.jpg',
		type : 'indoor',
		times : [
			'8.00 am to 1.00 pm (W)',
			'1.00 pm to 6.00 pm (M)'
		],
		extras : [
			'Consisting of four badminton courts',
			'Two volleyball courts'
		],
		details : [
			'1. There will be the following number of players allowed in each team for each category ',
			'1.1. Men Singles: 1 ',
			'1.2. Women Singles: 1 ',
			'1.3. Mixed Doubles: 2 ',
			'2. Badminton will be held in David Braley Athletic Centre. ',
			'3. Players are expected to bring their own badminton rackets and whatever equipment they see fit.',
			'4. Players are expected to wear comfortable sports attire. '
		],
		gameplayAndTiming : [
			'1. Each tournament will feature a single elimination knockout format.',
			'2. All matchups will feature a best out of three sets, with each set/match is played by whoever gets 21 points first with a 2 points lead.',
			'3. In the case of a deduce at 20-20 or above points, i.e. both teams have the same points and their points are 20 and above, a deuce will be automatically called, where in order to win the match, a 2-point lead must be present until one of the teams hit 30 points, which the team that has 30 points will win the match. ',
			'4. A shuttlecock will be thrown by the referee to determine who will serve first. Players can choose their own side of the court initially, but after the shuttlecock is thrown, no changes can be made for the first match. For the second match, players will play at the opposite of side of the court from the first match. For the third match, the players will play the first 11 points in the same court of their first match, and the remaining 10+ points in the same side of the court of the second match.'
		]
	},
	{
		id : 'badmintondouble',
		name : 'Badminton (mixed double)',
		venue : 'Sport Hall, David Braley Athletic Centre',
		teamSize : '2',
		gameplay : 'League grouping',
		image : 'badminton-double-malaysia.jpg',
		type : 'indoor',
		times : [
			'8.00 am to 1.00 pm (W)',
			'1.00 pm to 6.00 pm (M)'
		],
		extras : [
			'Consisting of four badminton courts',
			'Two volleyball courts'
		],
		details : [
			'1. There will be the following number of players allowed in each team for each category ',
			'1.1. Men Singles: 1 ',
			'1.2. Women Singles: 1 ',
			'1.3. Mixed Doubles: 2 ',
			'2. Badminton will be held in David Braley Athletic Centre. ',
			'3. Players are expected to bring their own badminton rackets and whatever equipment they see fit.',
			'4. Players are expected to wear comfortable sports attire. '
		],
		gameplayAndTiming : [
			'1. Each tournament will feature a single elimination knockout format.',
			'2. All matchups will feature a best out of three sets, with each set/match is played by whoever gets 21 points first with a 2 points lead.',
			'3. In the case of a deduce at 20-20 or above points, i.e. both teams have the same points and their points are 20 and above, a deuce will be automatically called, where in order to win the match, a 2-point lead must be present until one of the teams hit 30 points, which the team that has 30 points will win the match. ',
			'4. A shuttlecock will be thrown by the referee to determine who will serve first. Players can choose their own side of the court initially, but after the shuttlecock is thrown, no changes can be made for the first match. For the second match, players will play at the opposite of side of the court from the first match. For the third match, the players will play the first 11 points in the same court of their first match, and the remaining 10+ points in the same side of the court of the second match.'
		]
	},
	{
		id : 'volleyball',
		name : 'Volleyball (M&W)',
		venue : 'Sport Hall, David Braley Athletic Centre',
		teamSize : '6',
		gameplay : 'League grouping',
		image : 'volleyball-spike.jpg',
		type : 'outdoor',
		times : [
			'8.00 am to 1.00 pm (W)',
			'1.00 pm to 6.00 pm (M)'
		],
		gameplayAndTiming : [
			'1. A team shall consist of six players in all matches; two are required to start a match. ',
			'2. A team can begin play with fewer than six players on a side, or use a rotation system whereby players rotate outside the court and are not allowed to participate until they rotate back within the court. ',
			'3. Should a team play with less than six players; a side-out is not issued against the shorthanded team, as in National Federation rules. Instead, the team continues to rotate until a player rotates into the serving position. For purposes of the rules regarding back-row play, the three players to the server’s right (or remaining players, if there are less than four players on the team) in the serving rotation shall be considered front-row players.',
			'4. A match is two games to 21 (rally score) and the third (rubber) game to 15 (rally score); or, a 55 minute time limit from the scheduled start of the game, with a 5 minutes break between games.'
		]
	},
	{
		id : 'bingo',
		name : 'Bingo',
		image : 'uh.png',
		type : 'indoor'
	},
	{
		id : 'checkers',
		name : 'Checkers',
		image : 'checkers.jpg',
		type : 'indoor'
	},
	{
		id : 'seremban',
		name : 'Batu Seremban',
		image : 'batu-seremban.jpg',
		type : 'indoor'
	}
];

function game (name, venue, teamSize, gameplay) {
	this.name = name;
	this.venue = venue;
	this.teamSize = teamSize;
	this.gameplay = gameplay;

	return this;
}

function editGame (name, venue, teamSize, gameplay) {

	for (i in games) {
		game = games[i];
		if (game.name === name) {
			games[i].name = name;
			games[i].venue = venue;
			games[i].teamSize = teamSize;
			games[i].gameplay = gameplay;

			return true;
		} else {
			return false;
		}
	}
}

function addGame (game) {
	games.append(game);
}

//////////////////////////////////////////////
// !!!!!! important: only use once !!!!!!!! //
//////////////////////////////////////////////

exports.updateAllGames = updateAllGames;

function updateAllGames (req, res, next) {

	for (i in games) {
		var game = games[i];
		var newGame = new Game ({
			_id : mongoose.Types.ObjectId(),
			id : game.id,
			name : game.name,
			image : game.image,
			type : game.type,
		});

		console.log('\ngame:')
		console.log(game);

		if (game.details)
			newGame.details = game.details;
		if (game.extras)
			newGame.extras = game.extras;
		if (game.extras)
			newGame.extras = game.extras;
		if (game.times)
			newGame.times = game.times;
		if (game.gameplayAndTiming)
			newGame.gameplayAndTiming = game.gameplayAndTiming;
		if (game.venue)
			newGame.venue = game.venue;
		if (game.extras)
			newGame.teamSize = game.teamSize;
		if (game.extras)
			newGame.gameplay = game.gameplay;

		newGame.save(function (err) {
			if (err)
				console.log(err);
		});

		console.log('\nnewGame:')
		console.log(newGame);

	}

	Game
		.find({})
		.exec(function (err, games) {
			if (err)
				res.send(err)
			else
				res.send(games);
		});
}