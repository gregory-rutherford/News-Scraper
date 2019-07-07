
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

// Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

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
    //   var title = $(element)
      results.title = $(this)
        .children()
        .text();
    //   var link = $(element)
        results.link = $(this)
        .find("a")
        .attr("href");
    //   var image = $(element)
        results.image = $(this)
        .find("img")
        .attr("src");  

    //   results.push({
    //     title: title,
    //     link: link,
    //     image: image
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

    // Log the results once you've looped through each of the elements found with cheerio
    // db.scrapper.insert(results, (err, data) => {
    //   if (err) return res.send("there was an error");
    //   res.send("it worked");
    // });
  });


// Listen on port 3000
app.listen(3002, function() {
  console.log("App running on port 3002!");
});