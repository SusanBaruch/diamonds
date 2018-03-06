var mongoose = require("mongoose");
var Diamond = require("./models/diamond");
var Design = require("./models/design");

    var data = [
        {name: "Ring 2-1", 
          image:"images/Page2_1.jpg",
          description:"this is a beautiful ring"}, 
        {name: "Ring 12-4l", 
          image:"images/Page12_4.jpg",
          description: "ring 2"},
        {name: "Ring 43-3", 
          image:"images/Page43_3.jpg",
          description: "ring 3"},
       {name: "Ring 55-2", 
          image:"images/Page55_2.jpg",
          description: "ring 4"},
       {name: "Ring 58-2", 
          image:"images/Page58_2.jpg",
          description: "ring 4"},
        {name: "Ring 90-3", 
           image:"images/Page90_3.jpg",
            description: "ring 4"},
         {name: "Ring 93-4", 
           image:"images/Page93_4.jpg",
            description: "ring 4"},
         {name: "Ring 105-4", 
            image:"images/Page105_4.jpg",
            description: "ring 4"},
        {name: "Ring 138-1", 
            image:"images/Page138_1.jpg",
            description: "ring 4"},
         {name: "Ring 153-2", 
            image:"images/Page153_2.jpg",
            description: "ring 4"},
        {name: "Ring 166-4", 
           image:"images/Page166_4.jpg",
           description: "ring 4"},
        {name: "Ring-211-2", 
           image:"images/Page211_2.jpg",
            description: "ring 4"},
         {name: "Ring 217-4", 
            image:"images/Page217_4.jpg",
            description: "ring 4"}
           ];
    
function seedDB(){
    // remove all diamonds
    Diamond.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("you have removed all the diamonds");
        Design.remove({}, function(err) {
            if(err){
	                console.log(err);
	            }
            console.log("removed comments!");
        
 
     // add diamonds
//        data.forEach(function(seed){
//            Diamond.create(seed, function(err, diamond){
//               if (err){
//                   console.log(err);
 //              } else {
  //                 console.log("added a diamond");
   //                   //add designs
   //                   Design.create(
   //                       {
    //                      text: "This is a beautiful ring.",
    //                      author: "susan"
    //                       }, function (err, design){
     //                           if (err){
  //                                 console.log(err);
 //                              } else {
 //                                 diamond.design.push(design);
 //                                 diamond.save();
 //                                 console.log("created new design");
 //                             }
  //                       });
  //                  }
//            });
//        });

      });
   });
}

module.exports = seedDB;

//
//var diamonds = [
//{name: "Petite Diana", 
//image:"https://www.doamore.com/wp-content/uploads/2017/03/dainty-engagement-ring.jpg"}, 
//{name: "Square Hill", image:"https://barkevs.r.worldssl.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/7/8/7840lw_barkev_s_engagement_ring_1.jpg"},
//{name: "White and Rose", image:"https://cdn-images.gabrielny.com/is/image/GabrielCo/Medium/Gabriel-Zaira-14k-White-And-Rose-Gold-Round-Free-Form-Engagement-Ring~ER12337R6T44JJ-3.jpg"},
//{name: "Jack Kelege", image:"https://s3.amazonaws.com/ISHOWIMAGES/jack_kelege/ORIGINAL/44735111_0.png"}];
//





