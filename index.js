const express = require("express");
// const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

require("dotenv/config");

const app = express();

//Apply Middleware
//app.use(logger);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Import ROutes
const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

//ROUTES
app.get("/", (req, res) => res.send("We are on the homePage"));

//Connect to DB
// mongoose.createConnection(
//   process.env.DB_CONNECTION,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => console.log("Connected to database")
// );

const url = process.env.DB_CONNECTION;

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("rest-api");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("posts").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("rest-api").collection("posts");
  const posts = {
    title: "my first post",
    description: "this is my first description",
  };

  collection.insertOne(posts, (err) => {
    if (err) throw err;
    console.log("1 document inserted");
    client.close();
  });
});

//How to start listening to server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
