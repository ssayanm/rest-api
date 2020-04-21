const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

//Apply Middleware
//app.use(logger);

//ROUTES
app.get("/", (req, res) => res.send("We are on the homepage"));
app.get("/posts", (req, res) => res.send("We are on the posts"));

//Connect to DB
mongoose.createConnection(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database")
);

//How to start listening to server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
