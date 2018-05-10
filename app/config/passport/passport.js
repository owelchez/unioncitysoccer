var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id).then(function(user) {
			if(user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});

	passport.use('local-signup', new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},

			function(req, email, password, done) {
				var generateHash = function(password) {
					return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
				};

					User.findOne({
						where: {
							email: email
						}
					}).then(function(user) {
						if(user) { // If we find user in database return message
							return done(null, false, {
								message: 'This email is already used'
							});
						} else { // If no user is found then create one
							var userPassword = generateHash(password);
							var data = {
								email: email,
								password: userPassword,
								firstname: req.body.firstname,
								lastname: req.body.lastname
							};

							// User.create is a Sequelize method to create new entries
							User.create(data).then(function(newUser, created) {
								if(!newUser) { // If newUser creation fails return false
									return done(null, false);			
								}
								if(newUser) {
									return done(null, newUser);
								}
							});
						}
					});
			}
	));

	passport.use('local-signin', new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},

		function(req, email, password, done) {
			var User = user;
			var isValidPassword = function(userpass, password){
				return bCrypt.compareSync(password, userpass);
			}

			User.findOne({
				where: {
					email: email
				}
			}).then(function(user) {
				if(!user) {
					return done(null, false, {
						message: 'Email does not exist'
					});
				}
				if(!isValidPassword(user.password, password)) {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}

				var userinfo = user.get();

				return done(null, userinfo);
			}).catch(function(err) {
				console.log('Error:', err);

				return done(null, false, {
					message: 'Something is wrong signin in.'
				});
			});
		}
	));
}