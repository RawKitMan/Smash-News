//Access all the necessary packages to make this scraping and mongoosing work
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

//Logs the requests made
var logger = require("morgan");


//Need our models for Mongoose
var db = require("./models");

//Set up our middleware

//Logs requests in the terminal
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

//Server ports we want to access
var PORT = 3000;

//Set up Express
var app = express();

//Sets server to pull up Handlebar pages.
let expresshb = require("express-handlebars");
app.engine("handlebars", expresshb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes")(app);

//Mongoose connection for Heroku
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

