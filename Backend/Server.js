
// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var cors = require("cors");

// Initialize Express
var app = express();
app.use(cors());

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/api/data", function(req, res) {
  db.scrapper.find({}, (err, data) => res.json(data));
});

app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/section/science").then(function(response) {
    var $ = cheerio.load(response.data);

    var results = [];
    $("article").each(function(i, element) {
      var title = $(element)
        .children()
        .text();
      var link = $(element)
        .find("a")
        .attr("href");

      results.push({
        title: title,
        link: link
      });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    db.scrapper.insert(results, (err, data) => {
      if (err) return res.send("there was an error");
      res.send("it worked");
    });
  });
});


// Listen on port 3000
app.listen(3002, function() {
  console.log("App running on port 3002!");
});