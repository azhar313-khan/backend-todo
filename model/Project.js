const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "active",
    },
    userId: {
      type: String,
      required: true, // Consider adding this to avoid undefined `userId`
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
