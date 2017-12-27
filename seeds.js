var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment 	= require("./models/comment");

var data = [
		{
			name: "Cloud's rest",
		image: "http://www.grampiansparadise.com.au/jpg/home-gp/20131016-072--l3--wedding-guests-camping-on-lakeside-sites--at-grampians-paradise-camping-and-caravan-parkland--cropped-939px.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
		name: "Desert Mesa",
		image: "https://www.decathlon.co.uk/ecuk/static/wedze/assets/img/camping/camping-background.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
		name: "Canyon Floor",
		image: "http://haileyidaho.com/wp-content/uploads/2015/01/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}
	];

function seedDB () {
	// REMOVE ALL CAMPGROUNDS 
	Campground.remove({},function(err){
	if (err) {
		console.log("err");
	}
	console.log("removed campgrounds");
	// ADD A FEW CAMPGROUNDS
	data.forEach( function(seed) {
		Campground.create(seed,function(err, campground){
			if (err) {
				console.log(err);
			} else {
				console.log("added a campground");
				// CREATE A COMMENT
				Comment.create(
				{
					text:"this place is great, but i wish there was internet",
					author: "Homer"
				}, function(err, comment){
					if (err) {
						console.log(err);
					} else {
						campground.comments.push(comment);
					campground.save();
					console.log("created new comment");
					}
					
				});
			}
		});
	});
	});
	
	
	

	//ADD A FEW COMMENTS
}

module.exports = seedDB;