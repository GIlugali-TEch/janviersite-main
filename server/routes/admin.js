const express = require("express");
const multer = require("multer");
const router = express.Router();
const Publication = require("../models/publication");
const Post = require("../models/Post");
const User = require("../models/User");
const adminLayout = "../views/layouts/admin";
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const path = require("path");

// const bcrypt = require("bcrypt");f
//cloudinary config

cloudinary.config({
  cloud_name: "dvcmlf6qj",
  api_key: "614226899722785",
  api_secret: "ZCpOXTxf91rvvb2tNyXbne5COpQ",
});

//mutler config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const jwt = require("jsonwebtoken");
// const jwtSecret = process.env.JWT_SECRET

/**
 * @authMiddleware
 */

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "You're signed out" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error verifying : ", error);
    res.status(401).json({ message: "invalid token", error });
  }
};

/**
 * get
 * admin page
 */
router.get("/admin", (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, "..", "..", "public", "uploads");
    res.render("admin/index", { layout: adminLayout });
  } catch (error) {
    console.error("Encounted an error : ", error.stack);
  }
});
router.delete("/delete-post/:post", (req, res) => {
  const fileName = req.params.fileName;
  const fileToDelete = path.join("..", "..", "public", "uploads", fileName);

  fs.unlink(fileToDelete, (err) => {
    if (err) {
      console.log("Error in deleting file", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }

    console.log("File deleted Successfully", fileName);
    res.json({
      success: true,
      message: "Deleted File Successfully",
      fileName,
    });
  });
});

/**
 * Admin
 * login page checking
 *
 */

// const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken module

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await User.findOne({ username });

    if (!checkUser) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    // Uncomment above line if using bcrypt for password comparison

    if (password !== checkUser.password)
      return res.status(401).json({ message: "Invalid Credentials" });

    // JWT token assignment & cookies

    const token = jwt.sign({ userId: checkUser._id }, process.env.JWT_SECRET); // Use checkUser._id instead of User._id
    res.cookie("token", token, { httpOnly: true });
    // res.json({
    //   success: true,
    //   message: "Logged in successfully",
    // });
    // res.redirect("/dashboard"); // Remove this line if you're sending JSON response instead of redirecting
    res.redirect("/dashboard");
  } catch (error) {
    console.log("Checking User Error : ", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});


router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const uploadDir = path.resolve(__dirname, "..", "..", "public", "uploads");
    const files = fs.readdirSync(uploadDir);
    console.log(files);
    const locals = {
      title: "Admin",
      content: "Admin's Panel",
      files: files,
    };

    res.render("admin/dashboard", locals);
  } catch (error) {
    console.error("Error Encountered: ", error);
  }
});

router.get("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      content: "Adding the New Post..",
    };

    const data = await Post.find();
    res.render("admin/add-post", { locals, data, layout: adminLayout });
  } catch (error) {
    console.error(error);
  }
});
/**
 * @Addpost
 */

router.post("/add-post",upload.single("book"),authMiddleware, async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Please upload a New post" });
      }
      const uploadedFile = req.file;
      const filePath = uploadedFile.path;
      const uploadDir = path.resolve(
        __dirname,
        "..",
        "..",
        "public",
        "uploads"
      );
      const newFilePath = path.join(uploadDir, uploadedFile.originalname);
      res.json({
        success: true,
        message: "Post Added Successfully",
      });
    } catch (error) {
      console.log("Error Adding post : ", error);
    }
  }
);
/**
 * @GET /
 * Admin -update  a Teacher
 *
 */

router.get("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Tr Janvier | view Post",
      content: "Updating the posts and viewing them",
    };

    const data = await Post.findOne({ _id: req.params.id });
    res.render("admin/edit-post", { locals, data, layout: adminLayout });
  } catch (error) {
    console.log("The error is at : " , error)
  }
});
/**
 * @PUT /
 * admin -update a Teacher
 */

router;

/**
 * post
 * admin Check Login
 * admin
 */

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const createUser = await User.create({
        username,
        password,
      });

      res.status(200).json({
        message: "User created successfully",
        createUser,
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({
          success: false,
          message: "user already exists",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal message Error" });
  }
});

module.exports = router;
