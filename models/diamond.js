var mongoose = require("mongoose");

// schema
var diamondSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {   type:mongoose.Schema.Types.ObjectId,
                ref: "User"    },
        username: String, 
        },
    design: [{   
        type:mongoose.Schema.Types.ObjectId,
        ref: "Design"  }]
});

module.exports = mongoose.model("Diamond", diamondSchema);
