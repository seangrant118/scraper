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

//json article data

router.get("/articles", function(req, res) {
  db.Article.find({}).then(function(dbArticle) {
    res.json(dbArticle);
  }).catch(function(err) {
    res.json(err);
  }) 
})

// Main page

router.get("/", function(req, res) {
  db.Article.find({}).then(function(dbArticle) {
    const hbsObject = {
      article: dbArticle
    };
    res.render("index", hbsObject)
  })
})

// grab article by id

router.get("/articles/:id", function(req, res) {

    // use req.params.id to find article

    db.Article.findOne({_id: req.params.id}).populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle)
    }).catch(function(err) {
      res.json(err);
    })
})

// Save articles associated note

router.post("/articles/:id", function(req, res) {
  db.Note.create(req.body).then(function(dbNote) {
    return db.Article.findOneAndUpdate({
      _id: req.params.id
    }, {
      note: dbNote._id
    }, {
      new: true
    })
  }).then(function(dbArticle) {
    res.json(dbArticle)
  }).catch(function(err) {
    res.json(err)
  })
})

module.exports = router;
