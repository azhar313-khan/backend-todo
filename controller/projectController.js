const Project = require("../model/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(req.userId, "i");

    const result = await Project.create({
      name,
      description,
      userId: req.userId,
    });
    res.status(201).json({ message: "Project Create successfully", result });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.getProject = async (req, res) => {
  try {
    const result = await Project.find();
    res.status(201).json({ message: "Projects Get successfully", result });
  } catch (error) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await Project.findByIdAndUpdate(req.params.id, {
      name: name,
      description: description,
    });
    res.status(201).json({ message: "Project updated successfully" });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};
