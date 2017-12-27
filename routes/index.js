var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");



// Routes
router.get('/', function (req, res) {
 res.render("landings");
});




// ======================================
//	AUTH ROUTES
// ======================================
router.get("/register",function (req,res) {
	/* body... */
	res.render("register", {page: "register"});
});

// handle sign up logic
router.post("/register", function (req, res) {
	/* body... */
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function (err, user) {
		/* body... */
		if (err) {
			req.flash("error", err.message);
			return res.render("register", {error: err.message});
		}
		passport.authenticate("local")(req,res, function () {
			req.flash("success", "Wellcome to the Yelpcamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form

router.get("/login",function (req, res) {
	/* body... */
	res.render("login", {page: "login"});
});

//handlin login logic

router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
	 	failureRedirect: "/login"
	}), function (req, res) {
	});

//logout route
router.get("/logout", function (req, res) {
	/* body... */
	req.logout();
	req.flash("success", "you logged out");
	res.redirect("/campgrounds");
});

module.exports = router;