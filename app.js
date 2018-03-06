// run these commands in the command line:
//      npm init
//      npm install express --save
//      npm install body-parser
//      npm install mongoose --save
//      npm install ejs --save
//      npm install body-parser --save
// for authenticty:
//  npm install passport passport-local passport-local-mongoose express-session --save
//  npm install method-override --save


var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
    
var Diamond = require("./models/diamond"),
    Design = require("./models/design"),
    User = require("./models/user");

var designRoutes =  require("./routes/designs"),
    diamondRoutes = require("./routes/diamonds"),
    indexRoutes = require("./routes/index");

var    seedDB          = require("./seeds");
    
mongoose.Promise = global.Promise;

app.use(require("express-session")({
    secret: "this is my secret code",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// create and connect to diamonds database
mongoose.connect("mongodb://localhost/rings", {useMongoClient: true});



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB();


app.use("/diamonds/:id/design", designRoutes); 
app.use("/diamonds", diamondRoutes); 
app.use("/", indexRoutes); 

//== tell Express to listen for requests (start server) ===
//  port in cloud9 = process.env.PORT = 3000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started"); 
});