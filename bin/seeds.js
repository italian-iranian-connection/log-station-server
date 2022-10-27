const mongoose = require('mongoose');
const Profile = require('../models/Premium.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/log-station-server';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });




//
const profile = [
    {   name: "alice",
        email: "alice@alice.com",
        techSkills: ["JS", "NODE", "EXPRESS"],
    },
    {   
      name: "bob",
      email: "bob@bob.com",
      techSkills: ["JS", "NODE", "EXPRESS"],
  },
  
];



Profile.create(profile)
  .then( (result) => {

    mongoose.connection.close();

  })
  .catch( e => console.log("error seeding data in DB....", e));