const router = require("express").Router();
const mongoose = require("mongoose")
const Project = require("../models/Project.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config"); // , fileUploader.single("screenshoot") // to add in the routes POST project

router.post(
  "/projects",
  isAuthenticated, 
  fileUploader.single("screenshoot"),
  (req, res, next) => {
    if(req.file.path){
        const screenshoot = req.file.path
        return screenshoot
    }
    const userId = req.payload._id  // to add when defied
    const { name, technologies, deploymentUrl, gitRepoUrl, status } = req.body;

    const newProject = {
      name,
      technologies,
      deploymentUrl,
      gitRepoUrl,
      status,
      userId,
      screenshoot,
    };

    Project.create(newProject)
      .then((newProject) => {
        res.json(newProject);
      })
      .catch((err) => {
        console.log("error creating new project");
        res.status(500).json({
          message: "error creating a new project",
          error: err,
        });
      });
  }
);

router.get("/projects", (req, res, next) => {

  Project.find()
    .then((projectsList) => {
      res.json(projectsList);
    })
    .catch((err) => {
      console.log("error getting all projects");
      res.status(500).json({
        message: "error getting all projects",
        error: err,
      });
    });
});

router.get("/projects/:projectId", (req, res, next) => {

    const {projectId } = req.params

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified project id is not valid' });
        return;
    }

    Project.findById(projectId)
    .then((project) => {
        res.json(project)
    })
    .catch((err) => {
        console.log("error getting the project", projectId);
        res.status(500).json({
          message: `error getting the project ${projectId} `,
          error: err,
        });
      });
});

router.put("/projects/:projectId", isAuthenticated, (req, res, next) => {

    const {projectId } = req.params
    const userId = req.payload._id 
    const { name, technologies, deploymentUrl, gitRepoUrl, status } = req.body;

    const updateProject = {
      name,
      technologies,
      deploymentUrl,
      gitRepoUrl,
      status,
      screenshoot,
    };

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified project id is not valid' });
        return;
    } 
    Project.findByIdAndUpdate( projectId, updateProject, { returnDocument: "after" } )
    .then((projectUpdated) => {
        if(req.payload && userId == projectUpdated.userId){
            res.json(projectUpdated)
        } else {
            res.status(400).json({message: 'Not authorize to update this project'})
        }
    })
    .catch((err) => {
        console.log("error updating the project", projectId);
        res.status(500).json({
          message: `error updating the project ${projectId} `,
          error: err,
        });
      });
})

router.delete("/projects/:projectsId", isAuthenticated, (req, res, next) => {
    const {projectId } = req.params

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified project id is not valid' });
        return;
    } 

    Project.findByIdAndRemove(projectId)
    .then((project)=> {
        if(req.payload && req.payload._id == project.userId){
            res.json({message: `Project: ${projectId} succesfully deleted` })
        } else {
            res.status(400).json({message: 'Not authorize to delete this project'})
        }
    })
    .catch((err) => {
        console.log("error deleting the project", projectId);
        res.status(500).json({
          message: `error deletingting the project ${projectId} `,
          error: err,
        });
      });

    
})

module.exports = router;
