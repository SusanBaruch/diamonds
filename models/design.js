var mongoose = require("mongoose");

// schema
var designSchema = new mongoose.Schema({
    text: String, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
        }
});

module.exports = mongoose.model("Design", designSchema);

