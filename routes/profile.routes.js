const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");

router.put(
  "/user/:userId/",
  fileUploader.single("image"),
  (req, res, next) => {
    const {userId} = req.params;
    const { headline, basedIn, technologies, githubUrl, screenshoot } = req.body;

  const newProfile = {
    headline,
    basedIn,
    technologies,
    githubUrl,
    screenshoot,
  };
  console.log(userId);
  console.log(newProfile);

  User.findByIdAndUpdate(
    userId,
    { profile: newProfile },
    { returnDocument: "after" }
  )
    .then((newProfile) => {
      console.log(newProfile);
      res.json(newProfile);
    })
    .catch((err) => {
      console.log("error creating new profile");
      res.status(500).json({
        message: "error creating a new profile",
        error: err,
      });
    });
});

router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified user id is not valid" });
    return;
  }

  User.findById(userId)
    .then((user) => {
      // if (req.payload._id == userId) {
      res.json(user);
      // } else {
      //  res.status(400).json({ message: "Not authorize to see this profile" });
      // }
    })
    .catch((err) => {
      console.log("error getting user");
      res.status(500).json({
        message: "error getting user",
        error: err,
      });
    });
});

router.put("/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { headline, basedIn, technologies, githubUrl, screenshoot } = req.body;

  const updatedProfile = {
    headline,
    basedIn,
    technologies,
    githubUrl,
    screenshoot,
  };

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified profile id is not valid" });
    return;
  }
  Profile.findByIdAndUpdate(userId, updatedProfile, { returnDocument: "after" })
    .then((updatedProfile) => {
      if (req.payload._id == userId) {
        res.json(updatedProfile);
      } else {
        res
          .status(400)
          .json({ message: "Not authorize to update this profile" });
      }
    })
    .catch((err) => {
      console.log("error updating the profile", userId);
      res.status(500).json({
        message: `error updating the profile ${userId} `,
        error: err,
      });
    });
});

module.exports = router;
