const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],
        required: true
    },
    deploymentUrl: {
        type: String,
        trim: true,
    },
    gitRepoUrl: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["planned", "ongoing", "finished"]
    },
    screenshoot: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
  }, 
  {
    timestamps: true,
  } 
)

module.exports = model("Project", projectSchema);