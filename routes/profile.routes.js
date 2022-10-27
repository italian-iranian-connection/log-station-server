const router = require("express").Router();
const mongoose = require("mongoose")
// const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
// const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");



router.get("/user/:userId", (req, res, next) => {

    const {userId} = req.params;

  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log("error getting user");
      res.status(500).json({
        message: "error getting user",
        error: err,
      });
    });
});





router.post(
    "/profile",
  //   fileUploader.single("image"),
     (req, res, next) => {
  //     if(req.file.path){
  //         const screenshoot = req.file.path
  //         return screenshoot
  //     }
  //     const userId = req.payload._id  // to add when defied
       const { name, technologies, basedIn, description, headline } = req.body;
  
      const newProfile = {
        name,
        technologies,
        basedIn,
        description,
        headline
      };
  
  
      User.create(newProfile)
        .then((newProfile) => {
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








module.exports = router;



