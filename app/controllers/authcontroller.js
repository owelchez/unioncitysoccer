// Create a variable with module.exports an empty object as value for brevity
var exports = module.exports = {}

exports.signup = function(req, res) {
	res.render('signup', { title: 'Union City Soccer Club' });
}

exports.signin = function(req, res) {
	res.render('signin', { title: 'Union City Soccer Club' });
}

exports.dashboard = function(req, res) {
	res.render('dashboard', { title: 'Union City Soccer Club' });
}

exports.home = function(req, res) {
	res.render('home', { title: 'Union City Soccer Club' });
}

exports.pictures = function(req, res) {
	res.render('pictures', { title: 'Union City Soccer Club' });
}

exports.contact = function(req, res) {
	res.render('contact', { title: 'Union City Soccer Club'});
}

exports.about = function(req, res) {
	res.render('about', { title: 'Union City Soccer Club'});
}

// The below it's in case I want to use req.flash messages
/*exports.register = function(req, res) {
	//Here we make a flash message available for register view
	res.render('register', {flash: {alert: req.flash('alert')}});
}*/

exports.register = function(req, res) {
	res.render('register', { sessionFlash: res.locals.sessionFlash });
}

exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
}