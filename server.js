var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var exphbs = require("express-handlebars");


// This will extract the body in a request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport authentication 
app.use(session({	secret: 'mazinger z',
					resave: true, // Expiration dates...set to true
					saveUninitialized: true	}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Handlebars
app.set('views', './app/views');
app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
	res.send('Welcome to my realm suckers!');
});

var models = require("./app/models");

// Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

// Passport Strategy
require('./app/config/passport/passport.js')(passport, models.user);


// Make sure your db connection works
models.sequelize.sync().then(function() {
	console.log('Database connection successful!');
}).catch(function(err) {
	console.log(err, 'You messed this one up real bad!');
});


app.listen(5000, function(err) {
	if (!err) {
		console.log('Listening to your beat! Server running');
	} else {
		console.log(err);
	}
})