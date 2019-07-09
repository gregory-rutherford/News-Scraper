
// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var cors = require("cors");
const mongoose = require("mongoose");

//Require models
const db = require("./Models");

// Initialize Express
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true});

app.get("/api/data", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    })
});

app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/section/science").then(function(response) {
    var $ = cheerio.load(response.data);

    // var results = [];
    var results = {};
    $("article").each(function(i, element) {
      results.title = $(this)
        .children()
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


// Listen on port 3000
app.listen(3002, function() {
  console.log("App running on port 3002!");
});