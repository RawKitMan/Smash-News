var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

var router = express.Router();

router.get('/', function (req, res, next) {
  db.Article.find(function (err, content) {
    console.log(content);
    res.render('index', { title: 'Smash News', dbArticles: content });
  });
});

router.get("/articles", function(req, res){
  db.Article.find({})
  .then(function(dbArticles){
    res.json(dbArticles);
  })
  .catch(function(err){
    if(err){
      res.json(err);
    }
  })
});

router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://kotaku.com/tag/smash-bros").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every article, and do the following:
    $(".item__text").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the title, summary, and href of every link, and save them as properties of the result object
      result.title = $(this).children("h1").children("a").children("div").text();

      result.summary = $(this).children($(".excerpt")).children("p").text();

      result.article_url = $(this).children("h1").children("a").attr("href");

      result.notes = ""

      console.log(result);
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);

        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });

    });

    // Send a message to the client
  });
});

//Get individual articles by the objectId and populate it with it's note
router.get("/articles/:id", function (req, res) {

  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//Update the note for the selected article
router.post("/articles/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
      .then(function(){
        console.log("Note saved");
      })
      .catch(function(err){
        res.json(err);
      });
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

router.put("/articles/:id", function(req, res){
  db.Article.findOneAndUpdate({
    _id: req.params.id
  },
  {
    saved: req.body.saved
  },
  {
    new: true
  })
  .then(function(){
    console.log("Update Complete")
  })
});

router.put("/note/:id", function (req, res) {
  db.Note.findOneAndUpdate({ 
    _id: req.params.id 
  }, 
    { 
      title: req.body.title, 
      body: req.body.body 
    }, 
    { 
      new: true 
    })
    .then(function(){
      console.log("Update Complete");
    })
});

router.delete("/articles/:id", function(req, res){
  
  db.Article.find({
    _id: req.params.id
  })
  .then(function(dbArticle){
    let noteId = dbArticle.note;
    db.Article.drop({_id: req.params.id});
    db.Note.drop({_id: noteId});
    console.log("Deleted");
  })
})
//Export to the server.
module.exports = router;