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

exports.pictures = function(req, res) {
	res.render('pictures');
}

exports.register = function(req, res) {
	//Here we make a flash message available for register view
	res.render('register', {flash: {alert: req.flash('alert')}});
}

exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
}