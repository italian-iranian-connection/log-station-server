const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
// const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");

router.put(
  "/user/:userId/",
  fileUploader.single("image"),
  (req, res, next) => {
    // if (req.file.path) {
    //   const profileImg = req.file.path;
    //   return profileImg;
    // }
    const {userId} = req.params;
    const { headline, basedIn, technologies, githubUrl, profileImg } = req.body;

    const newProfile = {
      headline,
      basedIn,
      technologies,
      githubUrl,
      profileImg,
    };
    console.log(userId)
    console.log(newProfile)

    User.findByIdAndUpdate(userId, { profile: newProfile} ,{ returnDocument: "after" })
      .then((newProfile) => {
        console.log(newProfile)
        res.json(newProfile);
      })
      .catch((err) => {
        console.log("error creating new profile");
        res.status(500).json({
          message: "error creating a new profile",
          error: err,
        });
      });
  }
);

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

module.exports = router;
