const express = require("express");
// const app = express();
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// try and import mongo here 
// const mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost/scraperhw", { useNewUrlParser: true});

// Scrape Routes

router.get("/scrape", function(req, res) {
  
  // Grab html with axios

  axios.get("https://old.reddit.com/r/programming/").then(function(response) {

      // Load cheerio for $ selector

      const $ = cheerio.load(response.data);

      // Grab article information

      $("div.top-matter").each(function(i, element) {

        // save empty result object
        const result = {};

        // Add important info to result object

        result.title = $(element).find("a.title").text();
        result.link = $(element).find("a.title").attr("href");
        console.log(result);

        // create new doc in db using result object

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          })
      })

      // send success message if success
      res.send("Scrape Complete");
    })
})

module.exports = router;
