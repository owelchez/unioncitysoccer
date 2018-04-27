// Create a variable with module.exports an empty object as value for brevity
var exports = module.exports = {}

exports.signup = function(req, res) {
	res.render('signup');
}

exports.signin = function(req, res) {
	res.render('signin');
}

exports.dashboard = function(req, res) {
	res.render('dashboard');
}

exports.home = function(req, res) {
	res.render('home');
}

exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
}