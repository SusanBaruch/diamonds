var express = require("express");
var router = express.Router();
var Diamond = require("../models/diamond");
var middleware = require("../middleware");

// Index route = show all diamonds        
router.get("/", function(req,res){
    Diamond.find({}, function(err,allDiamonds){
        if (err){
            console.log(err);
        } else {
          res.render("diamonds/index", {diamonds: allDiamonds});
        }
    });
});

// Create route - add new diamond to database
// get data from form and add to jewelry database

router.post("/", middleware.isLoggedIn, function(req,res){
    // get data from form and add to diamond array
    //redirect back to diamonds page
    // body-parser
   var name = req.body.name;
   var image = req.body.image;

   var desc = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username };
      
   var newDiamond = {name: name, image: image, description: desc, author: author};
   Diamond.create(newDiamond, function(err, newlyCreated){
       if (err){
           console.log(err);
       } else {
    //redirect back to diamond page  
         res.redirect("/diamonds");
       }
    });
});


// new route - show form to create new diamond ring
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("diamonds/new");
});


// show route - show specific diamond record
router.get("/:id", function(req,res){
    //find diamond with id
    Diamond.findById(req.params.id).populate("design").exec(function(err, foundDiamond){
        if (err || !foundDiamond){
            req.flash("error","Diamond not found");
            res.redirect("back");
        } else {
            res.render("diamonds/show", {diamond: foundDiamond});
        }
    });
});

// edit diamond route
router.get("/:id/edit", middleware.checkDiamondOwnership, function(req,res){
    Diamond.findById(req.params.id, function(err, foundDiamond){
         res.render("diamonds/edit", {diamond: foundDiamond});
    });
});

// update diamond route
router.put("/:id", middleware.checkDiamondOwnership, function(req,res){
    // find and update diamond
    Diamond.findByIdAndUpdate(req.params.id, req.body.diamond, function (err, updatedDiamond){
        if (err){
            res.redirect("/diamonds");
        } else {
                //redirect to show page
            res.redirect("/diamonds/" + req.params.id);
        }
    });
});

// delete route
router.delete("/:id",middleware.checkDiamondOwnership, function(req,res){
    Diamond.findByIdAndRemove(req.params.id, function(err){
    if (err){
        res.redirect("/diamonds");
        } else {
        res.redirect("/diamonds");
        }
    });
});



module.exports = router;
