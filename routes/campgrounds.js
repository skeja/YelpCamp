var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
var geocoder = require("geocoder");

// INDEX - SHOW ALL CAMPGROUNDS
router.get("/campgrounds", function(req, res){

	//get all campgrounds from dbs
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
		}
	});
});



//// CREATE - ADD A NEW CAMPGROUND
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author= {
		id: req.user._id,
		username: req.user.username
	};
	geocoder.geocode(req.body.location, function (err, data) {
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var location = data.results[0].formatted_address;
	
	var newCampground = {name: name, image: image, description: desc, author: author, price: price};
	//create a new campground and save to DB
	Campground.create(newCampground,function (err, newCampground) {
			/* body... */
		if(err){
			console.log(err);
		}else{
			console.log(newCampground);
			res.redirect("/campgrounds");
	
		}
	});
	});
});

//SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/campgrounds/new", middleware.isLoggedIn , function(req, res){
	res.render("campgrounds/new");
});

//SHOW -show more info about one campground
router.get("/campgrounds/:id",function(req, res){
	//FIND THE CAMPGROUND WITH PROVIDED id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			console.log(err);
			 res.redirect("back");
		} else {
			console.log(foundCampground);
		//RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
		res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT campground route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership ,function (req, res) {
		Campground.findById(req.params.id,function (err, foundCampground) {
			res.render("campgrounds/edit", {campground: foundCampground});			
			});
		});

// UPDATE campground route
// router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req,res) {
// 	geocoder.geocode(req.body.location, function (err, data) {
// 		var lat = data.results[0].geometry.location.lat;
//     	var lng = data.results[0].geometry.location.lng;
//     	var location = data.results[0].formatted_address;
//     	// var newData = {name: req.body.name}
// 		var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
// 	Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function (err, updatedCampground) {
// 		if (err) {
// 			req.flash("error", err.message);
// 			res.redirect("/campgrounds");
// 		} else {
// 			req.flash("success", "Successfully Updated");
// 			res.redirect("/campgrounds/"+ req.params.id);
// 		}	
// 	});
// 	});
// });

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

// DESTROY campground route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership ,function (req, res) {
	Campground.findByIdAndRemove(req.params.id,function (err) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// midleware

module.exports = router;

