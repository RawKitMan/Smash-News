let express = require("express");
let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models");

let router = express.Router();

router.get('/', function (req, res, next) {
  db.Article.find(function (err, content) {
    //Render the articles to the index handlebars page
    res.render('index', {dbArticles: content });
  });
});

router.get("/scrape", function (req, res) {
  // First, we grab articles from Kotaky
  axios.get("https://kotaku.com/tag/smash-bros").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    let $ = cheerio.load(response.data);
    let counter = 0;
    let length = $(".item__text").length
    // Now, we grab every article, and do the following:
    $(".item__text").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the title, summary, and href of every link, and save them as properties of the result object
      result.title = $(this).children("h1").children("a").children("div").text();

      result.author = $(this).children(".meta--pe").children(".meta__container").children(".author").children(".js_link").text();

      result.summary = $(this).children($(".excerpt")).children("p").text();

      result.article_url = $(this).children("h1").children("a").attr("href");

      result.notes = "";

      console.log(result);

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          //If the article is successfully added to the database, increase the counter
          counter++;

          //Once all the articles are put in, send a response saying the job is done.
          if(counter >= length){
            res.send('Success')
          }

        })
        .catch(function (err) {
          //We don't want the create to stop if an article doesn't come through for some reason. Let's move on to the next.

          //Increase the counter even if the article isn't passed
          counter++;
          //Once all the valid articles are put into the database, send a response saying the job is done.
          if(counter >= length){
            res.send('Success')
          }
        });
    });
  });
});

//Get individual articles by the objectId and populate it with it's note
router.get("/articles/:id", function (req, res) {

  //Find an article with it's associated id
  db.Article.findOne({ _id: req.params.id })
    //Populate all of the notes associated with it
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
      //Find the article with the associated ID and then insert the inserted Notes's ObjectId into the Article object.
      //{new:true} has it so we see the new article note
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
        .then(function () {
          res.send("Success")
        })
        .catch(function (err) {
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

router.put("/articles/:id", function (req, res) {

  //Find the article with the associated id and set the saved property to true or false, depending on if the user saves or unsaves the article
  db.Article.findOneAndUpdate({
    _id: req.params.id
  },
    {
      saved: req.body.saved
    },
    {
      new: true
    })
    .then(function () {
      res.send("Success")
    })
});


//Route to update a note if one currently exists
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
    .then(function () {
      res.send("success");
    })
});


//The route to delete an article based on it's ID.
router.delete("/articles/:id", function (req, res) {

  db.Article.findOne({
    _id: req.params.id
  })
    .then(function (dbArticle) {
      //If there is a note associated with the deleted article, we want to delete it as well.
      if (dbArticle.note) {
        let noteId = dbArticle.note;
        db.Note.findByIdAndDelete(noteId)
          .then(data => {
            res.send("Success")
          })
          .catch(err => {
            res.send(err)
          })

      };
      
      //Find the article and get rid of it.
      db.Article.findByIdAndDelete(req.params.id)
        .then(data => {
          res.send("Success")
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        });
    });
});

//Export to the server.
module.exports = router;