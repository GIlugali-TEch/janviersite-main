const express = require("express");
const Post = require("../models/Post");
const path = require("path")
const router = express.Router();
const fs = require('fs')

router.get("", async (req, res) => {
  try {
       
       const fileDir = path.join(__dirname, "..", "..", "public", "uploads");
       const files = fs.readdirSync(fileDir);


       console.log("files", files)

    const locals = {
      title: "WelcomePage",
      details: "Home Page of my Blog",
      files:files
    };

    // const perPage = 3;
    // const page = req.query.page || 1;

    // const data = await Post.aggregate([{ $sort: { createAt: -1 } }])
    //   .skip(perPage * page - perPage)
    //   .limit(perPage)
    //   .exec();

    // const count = await Post.countDocuments();
    // let nextPage = parseInt(page) + 1;
    // let hasNextPage = nextPage <= Math.ceil(count / perPage);
    res.render("index", locals);
  } catch (error) {
    console.error("We encountered an error : { ", error, "}");
  }
});

router.post("/search", async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNonSpecialChars = searchTerm.replace(/[^a-zA-z0-9]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNonSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchTerm, "i") } },
      ],
    });

    const locals = {
      title: data.title,
      content: "Just studying",
    };

    console.log(searchTerm);

    res.render("search", { locals, data });
  } catch (error) {
    console.error("We encountered an error : { ", error, "}");
  }
});

const insertPostData = () => {
  Post.insertMany([
    {
      title: "New changes",
      body: "damnnnnnnnnnnnnnnnnnnnn..!",
    },
    {
      title: "We're not given",
      body: "what be thisssss..!",
    },
  ]);
};

// insertPostData()

router.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const data = await Post.findById({ _id: postId });
    const locals = {
      title: data.title,
      content: "Its about what i want",
    };
    res.render("post", { locals, data });
  } catch (error) {
    console.error("Error From postId: ", error);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
