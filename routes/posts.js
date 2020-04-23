const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//Middleware
const getPost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.json({ message: "cannot find the post" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
  res.post = post;
  next();
};

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
// router.get("/:id", getPost, (req, res) => {
//   res.json(res.post);
// });

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//creating One
router.post("/", async (req, res) => {
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

//Updating one
// router.patch("/:id", getPost, async (req, res) => {
//   if (req.body.title != null) {
//     res.post.title = res.body.title;
//   }
//   if (req.body.description != null) {
//     res.post.description = res.body.description;
//   }
//   try {
//     const updatedPost = await res.post.save();
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });

router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Deleting one
// router.delete("/:id", getPost, async (req, res) => {
//   try {
//     await res.post.remove();
//     res.json({ message: "Deleted Post" });
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });
router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.id });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
