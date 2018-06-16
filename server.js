var express = require("express");
var cookieParser = require('cookie-parser');
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var flash = require('express-flash');
var exphbs = require("express-handlebars");
var path = require('path');

var sessionStore = new session.MemoryStore;

// This will extract the body in a request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));

// Passport authentication 
app.use(cookieParser('mazingerz'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Initialize Handlebars
app.set('views', './app/views');
app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', 'hbs');

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