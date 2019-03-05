var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

var router = express.Router();

router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://kotaku.com/tag/smash-bros").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every article, and do the following:
      $(".item__text").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the title, summary, and href of every link, and save them as properties of the result object
        result.title = $(this).children("h1").children("a").children("div").text();

        result.summary = $(this).children($(".excerpt")).children("p").text();
        
        result.article_url = $(this).children("h1").children("a").attr("href");
  
        console.log(result);
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

module.exports = router;