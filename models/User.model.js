const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case


const profileSchema = new Schema({
  techSkills: [String],
  basedIn: String
})  


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [false, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [false, "Password is required."],
    },
    name: {
      type: String,
      required: [false, "Name is required."],
    },
    profile: profileSchema
  }, 
    {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }

  );

const User = model("User", userSchema);


module.exports = User;
