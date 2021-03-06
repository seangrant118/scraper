// import dependencies 

const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// PORT

const PORT = process.env.PORT || 3000;

// Express 

const app = express();

// Middleware

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Connect to MongoDB
var databaseURI = "mongodb://localhost/scraperhw";
// mongoose.connect("mongodb://localhost/scraperhw", { useNewUrlParser: true});
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect(databaseURI)
}

// Routes

const routes = require("./controllers/controller")
app.use(routes);

// Start server

app.listen(PORT, function() {
  console.log(`Server listening on :http://localhost:${PORT}`);
})

