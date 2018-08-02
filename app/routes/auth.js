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
				req.session.sessionFlash = {
        			type: 'alert alert-danger',
        			message: 'This email address is already registered!.'
    			}
				res.redirect('/register/');
			} else {
				var routename = newplayer.firstname.replace(/\s+/g, '').toLowerCase();
				
				var data = new TeamPlayer(
					newplayer.email,
					routename,
					newplayer.firstname,
					newplayer.middlename,
					newplayer.lastname,
					newplayer.secondlastname,
					newplayer.dob,
					newplayer.team,
					newplayer.address,
					newplayer.city,
					newplayer.state,
					newplayer.zipcode,
					newplayer.position,
					newplayer.nickname,
					newplayer.phonenumber,
					newplayer.emergencyphonenumber,
					newplayer.about,
					newplayer.profilepicture
				);

				Player.create(data).then(newPlayer => {
					if(!newPlayer) {
						req.session.sessionFlash = {
        					type: 'alert alert-warning',
        					message: 'Something went wrong!.'
    					}
						res.redirect('/register/');
						//res.json("Player not created");
					} 
					if(newPlayer) {
						req.session.sessionFlash = {
        					type: 'alert alert-success',
        					message: 'The player has been registered!.'
    					}
						res.redirect('/register/');
						//res.json("Player has been created");
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

class TeamPlayer {
	constructor(email,routename,firstname,middlename,lastname,secondlastname,
				dob,team,address,city,state,zipcode,position,nickname,
				phonenumber,emergencyphonenumber,about,profilepicture
	) {
		this.email = email;
		this.routename = routename;
		this.firstname = firstname;
		this.middlename = middlename;
		this.lastname = lastname;
		this.secondlastname = secondlastname;
		this.dob = dob;
		this.team = team;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zipcode = zipcode;
		this.position = position;
		this.nickname = nickname;
		this.phonenumber = phonenumber;
		this.emergencyphonenumber = emergencyphonenumber;
		this.about = about;
		this.profilepicture = profilepicture;
	}

	// The below will simply return Player's name.
	getName() {
		return this.firstname + ' ' + this.lastname;
	}
}