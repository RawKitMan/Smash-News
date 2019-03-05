//Using Mongoose to store Notes for an article
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Schema for the notes. Only need the title of the note and the note itself
var NoteSchema = new Schema({
  
  title: String, 
  body: String
});

// Creates the Note model using Mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;