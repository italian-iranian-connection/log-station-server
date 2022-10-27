const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  headline: {
    type: String,
    required: true,
  },
  basedIn: {
    type: String,
    default: "🗺",
  },
  technologies: {
    type: [String],
    required: true,
  },
  githubUrl: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default:
      "https://www.canva.com/templates/EAEeKH905XY-yellow-and-black-gamer-grunge-twitch-profile-picture/",
  },
});

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
    profile: profileSchema,
  },

  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
