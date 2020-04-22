require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
//const MongoClient = require("mongodb").MongoClient;
const app = express();

//Connect to DB
// mongoose.connect(process.env.DB_CONNECTION, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", (error) => console.err(err));
// db.once("open", () => console.log("Coonected to the database"));

const db = require("./db.js");
const dbName = "rest-api";
const collectionName = "posts";

// << db init >>
db.initialize(
  dbName,
  collectionName,
  function (dbCollection) {
    // successCallback
    // get all items
    dbCollection.find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
    });

    // << db CRUD routes >>
  },
  function (err) {
    // failureCallback
    throw err;
  }
);
//Apply Middleware
//app.use(logger);

//Body Parser Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//Import ROutes
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

//How to start listening to server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
