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

// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

var models = require("./app/models");

// Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

// Passport Strategy
require('./app/config/passport/passport.js')(passport, models.user);

// Initialize Handlebars
app.engine('hbs', 
    exphbs({
	extname: 'hbs',
    defaultLayout: 'layout', // This is the name of file inside layouts folder
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: [
        __dirname + '/views/partials/',
    ],
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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


/*
Includes (Partials)
Includes or partials templates in Handlebars are interpreted by the {{>partial_name}} expression. Partials are akin to helpers and are registered with Handlebars.registerPartial(name, source), where name is a string and source is a Handlebars template code for the partial.
*/