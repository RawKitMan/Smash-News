//Using Mongoose to store data from the articles we receive
var mongoose = require("mongoose");

// Variable to hold the Schema constructor
var Schema = mongoose.Schema;

//How our articles will be stored
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },

  //Author of the article
  author: {
    type: String,
  },
  //Contains the image associated with the article. If there's no image, then we don't save it
  article_url: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true,
    unique: true
  },
  //Stores the note's ObjectId for the associated article.
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  saved: {
    type: Boolean,
    default: false
  }
});

// Using mongoose's model method to create the Article model from our schema above
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;