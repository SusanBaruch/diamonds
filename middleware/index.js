var Diamond = require("../models/diamond.js");
var Design = require("../models/design.js");

var middlewareObj = {};

middlewareObj.checkDiamondOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Diamond.findById(req.params.id, function(err, foundDiamond){
        if (err){
            res.redirect("back");
        } else {
          if (foundDiamond.author.id.equals(req.user._id)){  
                next();
          } else {
              req.flash("error","You don't have permission to do that.");
              res.redirect("back");
          }
        }
        });
    } else {
        req.flash("error", "You need to be logged in.");
        res.redirect("back");
    }
};

middlewareObj.checkDesignOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Design.findById(req.params.design_id, function(err, foundDesign){
        if (err){
            res.redirect("back");
        } else {
          if (foundDesign.author.id.equals(req.user._id)){             
                next();
          } else {
              req.flash("error","You don't have permission to do that.");
              res.redirect("back");
          }
        }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
    return next();
    }
    req.flash("error", "Please login in first!");
    res.redirect("/login");
};


module.exports = middlewareObj;