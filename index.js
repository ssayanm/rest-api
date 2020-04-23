require("dotenv/config");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
//const MongoClient = require("mongodb").MongoClient;
const app = express();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, options)
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log("Connection failed!", error));

//Apply Middleware
//app.use(logger);

//Body Parser Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//Import ROutes
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//How to start listening to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
