var express = require("express"); 
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// ROOT route 
router.get("/", function(req, res){
    res.render("landing");
});



// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

// handle signup logic
router.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
       passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds");
       });
   });
});

// show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// handling login lgoic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    successFlash: 'Welcome Back!',
    failureFlash: 'Incorrect credentials, please try again.'
}),function(req,res){
});

// logout route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Successfully logged out");
   res.redirect("/campgrounds");
});

module.exports = router;