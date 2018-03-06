var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/", function(req,res){
    res.render("landing");
});


// ========= authentic route  ==================
//
// Registration
router.get("/register", function(req,res){
    res.render("register");    
});

// handle registration
router.post("/register", function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error",err.message);
//                  return res.render("register");
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","You have successfully registered!");
            res.redirect("/diamonds");
        });
    });
});


// login
router.get("/login", function(req,res){
    res.render("login");    
});
//           req.flash("error", err.message);
//            return res.render("register");
            
//                 return res.render("register", {"error": err.message});
//  --return res.render("register", {"error": err.message});

router.post("/login", passport.authenticate("local", 
    {successRedirect: "/diamonds",
    failureRedirect: "/login"  }), 
    function(req,res){
                    req.flash("success","You have successfully logged in!");
});

// logout route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "You Logged Out.");
    res.redirect("/diamonds");
});

module.exports = router;
