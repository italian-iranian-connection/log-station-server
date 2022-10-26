const router = require("express").Router();
const Project = require("../models/Project.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config"); // , fileUploader.single("screenshoot") // to add in the routes POST project


router.post('/projects', fileUploader.single("screenshoot"), (req, res, next) => {
    // if(req.file.path){
    //     const screenshoot = req.file.path
    //     return screenshoot
    // } 
    const userId = req.payload   // _id   to add when defied
    const { name, technologies, deploymentUrl, gitRepoUrl, status } = req.body

    const newProject = {
        name, 
        technologies, 
        deploymentUrl, 
        gitRepoUrl, 
        status,
        userId,
        //screenshoot,
    }

    Project.create(newProject)
    .then((newProject) => {
        res.json(newProject)
    })
    .catch((err) => {
        console.log("error creating new project")
        res.status(500).json({
            message: "error creating a new project",
            error: err,
          });
    })
})

module.exports = router;