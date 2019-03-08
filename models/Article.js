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
  // Want to store the article's URL as a string and make sure there are NO COPIES in the database
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