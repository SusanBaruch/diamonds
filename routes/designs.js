//
//-----design section -------
//
var express = require("express");
var router = express.Router({mergeParams: true});

var Diamond = require("../models/diamond");
var Design = require("../models/design");
var middleware = require("../middleware");

// new design
router.get("/new", middleware.isLoggedIn, function(req,res){
    //find diamond id
    Diamond.findById(req.params.id, function(err,diamond){
        if (err){
            console.log(err);
        } else {
        res.render("design/new", {diamond: diamond});
        }
    });
});

    // create new design
    // connect design to diamond
router.post("/", middleware.isLoggedIn, function(req, res){
      Diamond.findById(req.params.id, function(err,diamond){
        if (err){
            console.log(err);
            res.redirect("/diamonds");
        } else {
            Design.create(req.body.design, function(err,design){
                if (err){
                    console.log(err);
                } else {
                    design.author.id = req.user._id;
                    design.author.username = req.user.username;
    // save new comment to campground
                    design.save();
                    diamond.design.push(design);
                    diamond.save();
                    res.redirect("/diamonds/" + diamond._id);
                }
            });
        }
    });
});

// edit route - design
router.get("/:design_id/edit", middleware.checkDesignOwnership, function(req,res){
    Diamond.findById(req.params.id, function(err, foundDiamond){
        if(err || !foundDiamond){
            req.flash("error","diamond not found");
            return res.redirect("back");
        }
        Design.findById(req.params.design_id, function(err,foundDesign){
            if (err){
                res.redirect("back");
            } else {
                res.render("design/edit", {diamond_id: req.params.id, design: foundDesign});
            }
        });

    });
});

// update route - design
router.put("/:design_id", middleware.checkDesignOwnership, function(req, res){
   Design.findByIdAndUpdate(req.params.design_id, req.body.design, function(err, updatedDesign){
       if (err){
           res.redirect("back");
       } else {
       res.redirect("/diamonds/"+req.params.id);
       }
   }); 
});

// delete design route
router.delete("/:design_id", middleware.checkDesignOwnership, function(req, res){
    Design.findByIdAndRemove(req.params.design_id, function(err){
        if (err){
            res.redirect("back");
        } else {
            res.redirect("/diamonds/"+req.params.id);
        }
    });
});




module.exports = router;
