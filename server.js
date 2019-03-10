//Access all the necessary packages to make this scraping and mongoosing work
let express = require("express");
let mongoose = require("mongoose");

//Logs the requests made
let logger = require("morgan");

let app = express();
//Need our models for Mongoose
//let db = require("./models");

//Set up our middleware

//Logs requests in the terminal
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

//Server ports we want to access
let PORT = process.env.PORT || 3000;

//Set up Express

//Sets server to pull up Handlebar pages.
let expresshb = require("express-handlebars");
app.engine("handlebars", expresshb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let routes = require("./routes/api-routes");

app.use(routes);

//Mongoose connection for Heroku
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

