const mongoose = require("mongoose");

// Schema Constructer

const Schema = mongoose.Schema;

// Create UserSchema obj

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },

  // Populate article with Note

  note: {
    type: Schema.Types.ObjectId,
    ref: "note"
  }
});

// Create Model

const Article = mongoose.model("Article", ArticleSchema);

// export

module.exports = Article;