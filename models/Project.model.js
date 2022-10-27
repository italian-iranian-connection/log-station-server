const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
        type: String,
        required: false,
    },
    technologies: {
        type: [String],
        required: false
    },
    deploymentUrl: {
        type: String,
        required: false,
        trim: true
    },
    gitRepoUrl: {
        type: String,
        required: false,
        trim: true
    },
    status: {
        type: String,
        enum: ["planned", "ongoing", "finished"]
    },
    screenshoot: {
        type: String,
        default:'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}  
)

module.exports = model("Project", projectSchema);