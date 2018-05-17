var authController = require('../controllers/authController.js');
var passport = require("passport");
var sequelize = require('sequelize');
var Player = require('../models')['Player'];


module.exports = function(app, passport) {
	app.get('/signup', authController.signup);

	app.get('/signin', authController.signin);

	app.get('/dashboard', isLoggedIn, authController.dashboard);

	app.get('/', authController.home);

	app.get('/pictures', authController.pictures);

	app.get('/logout', authController.logout);

	app.get('/register', authController.register);

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/signin',
		failureRedirect: '/signup'
		}
	));

	app.post('/register/player', function(req, res) {
		var newplayer = req.body;
		//console.log("This is req.body " + JSON.stringify(nuevomaje));

		var email = newplayer.email;

		Player.findOne({
			where: {
				email: email
			}
		}).then(player => {
			if(player) {
				res.json('This player is already registered');
			} else {
				var routename = newplayer.firstname.replace(/\s+/g, '').toLowerCase();
				
				var data = {
					email: newplayer.email,
					routename: routename,
					firstname: newplayer.firstname,
					middlename: newplayer.middlename,
					lastname: newplayer.lastname,
					secondlastname: newplayer.secondlastname,
					dob: newplayer.dob,
					team: newplayer.team,
					address: newplayer.address,
					city: newplayer.city,
					state: newplayer.state,
					zipcode: newplayer.zipcode,
					position: newplayer.position,
					nickname: newplayer.nickname,
					phonenumber: newplayer.phonenumber,
					emergencyphonenumber: newplayer.emergencyphonenumber,
					about: newplayer.about,
					profilepicture: newplayer.profilepicture
				};

				Player.create(data).then(newPlayer => {
					if(!newPlayer) {
						res.json("Player not created");
					} 
					if(newPlayer) {
						res.json("Player has been created");
					}
				})
			}
		});
	});

	app.post('/signin', passport.authenticate('local-signin', {
		successRedirect: '/dashboard',
		failureRedirect: '//signin'
	}))

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();
			res.redirect('/signin');
	}
}