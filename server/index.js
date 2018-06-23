"use strict";
// Basic express setup:
const express = require("express");
const PORT = 8080;
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();

// Mongo setup:
const {MongoClient} = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI;


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, client) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);


const DataHelpers = require("./lib/data-helpers.js")(client);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.listen(process.env.PORT || 8080) 

})