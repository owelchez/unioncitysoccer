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

	app.post('/register/player', function(req, res, done) {
		var newplayer = req.body;
		//console.log("This is req.body " + JSON.stringify(nuevomaje));

		var email = newplayer.email;

		Player.findOne({
			where: {
				email: email
			}
		}).then(function(player) {
			if(player) {
				return done(null, false, {
					message: 'This player is already registered'
				});
			} else {
				var routename = newplayer.firstname.replace(/\s+/g, '').toLowerCase();
				
				var data = {
					routename: routename,
					firstName: newplayer.firstName,
					middlename: newplayer.middlename,
					lastName: newplayer.lastName,
					secondlastname: newplayer.secondlastname,
					dob: newplayer.dob,
					address: newplayer.address,
					email: newplayer.email,
					phoneNumber: newplayer.phoneNumber,
					emergencyPhoneNumber: newplayer.emergencyPhoneNumber,
					profilePicture: newplayer.profilePicture,
					currentTeam: newplayer.currentTeam
				};

				Player.create(data).then(function(newPlayer, created) {
					if(!newPlayer) {
						return done(null, false);
					}
					if(newPlayer) {
						return done(null, newPlayer);
					}
				});
			}
		});
	});

	app.post('/signin', passport.authenticate('local-signin', {
		successRedirect: '/dashboard',
		failureRedirect: '/signin'
	}))

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();
			res.redirect('/signin');
	}
}