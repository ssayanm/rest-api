const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//Getting all
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Getting One
router.get("/:id", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newPost = await post.save();
    res.json(newPost);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//creating One
router.post("/", (req, res) => {});

//Updating one
router.patch("/:id", (req, res) => {});

//Deleting one
router.delete("/:id", (req, res) => {});

module.exports = router;
