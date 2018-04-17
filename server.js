var exphbs = require("express-handlebars");
var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var models = require("./app/models");

// Make sure your db connection works
models.sequelize.sync().then(function() {
	console.log('Database connection successful!');
}).catch(function(err) {
	console.log(err, 'You messed this one up real bad!');
});

// This will extract the body in a request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport authentication 
app.use(session({	secret: 'mazinger z',
					resave: true, // Expiration dates...set to true
					saveUninitialized: true	}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
	res.send('Welcome to my realm suckers!');
});

// Initialize Handlebars
app.set('views', './app/views');
app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', 'hbs');

// Routes
var authRoute = require('./app/routes/auth.js')(app);

app.listen(5000, function(err) {
	if (!err) {
		console.log('Listening to your beat! Server running');
	} else {
		console.log(err);
	}
})