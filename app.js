// Variables
var express 	= require('express'),
	app 		= express(),
	bodyParser  = require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground  = require("./models/campground"),
	seedDB 		= require("./seeds"),
	Comment 	= require("./models/comment"),
	passport 	= require("passport"),
	LocalStrategy= require("passport-local"),
	User 		= require("./models/User"),
	methodOverride = require("method-override"),
	flash = require("connect-flash");


var commentRoutes	= require("./routes/comments"),
	camproundRoutes = require("./routes/campgrounds"),
	indexRoutes		= require("./routes/index");

app.locals.moment = require("moment");

//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Korina je najbolja",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seedDB();
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp ";
mongoose.connect(url,{ useMongoClient: true });
// mongoose.connect('mongodb://skeja:skeja@ds159254.mlab.com:59254/yelp_camp',{ useMongoClient: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// use current user in whole routes
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//ROUTES REQUIRE
app.use(indexRoutes);
app.use(commentRoutes);
app.use(camproundRoutes);


//Port listening
app.listen(process.env.PORT || 3000, function () {
  console.log('App running on port 3000!');
});