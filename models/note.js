const mongoose = require("mongoose");

// Reference to Schema constructor

const Schema = mongoose.Schema;

// Create NoteSchema object

const NoteSchema = new Schema({
  title: String,
  body: String
});

// Create model

const Note = mongoose.model("note", NoteSchema);

// Export

module.exports = Note;