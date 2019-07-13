// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;

//Require models
const db = require("./Models");

// Initialize Express
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
app.use("/", express.static("../Frontend/news-scraper/build/"));
// }

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
//scraping
app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/section/science").then(function(response) {
    var $ = cheerio.load(response.data);

    // var results = [];
    var results = {};
    $("article").each(function() {
      results.title = $(this)
        .find("a")
        .text();
      results.link = $(this)
        .find("a")
        .attr("href");
      results.image = $(this)
        .find("img")
        .attr("src");

      db.Article.create(results)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
      res.send("Successful Scrape");
    });
    console.log(results);
  });
});
//route for getting articles
app.get("/api/data", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});
//route for getting the comment
app.get("/api/data/:id", function (req, res) {
  db.Article.findOne({ _id: req.params.id})
  .populate("comment")
  .then(function(dbArticle){
  res.json(dbArticle)
  })
  .catch(function(err){
    res.json(err);
  })
})
//route for creating new comment
app.post("/api/data/:id", function(req, res) {
  db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { comment: dbComment._id },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Listen on port 3002
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});
