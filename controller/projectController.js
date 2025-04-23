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
    const {
      search,
      sortBy = "createAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const sortOrder = order === "asc" ? 1 : -1;

    const result = await Project.find(searchQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(pageSize);

    const totalProjects = await Project.countDocuments(search);
    res.status(201).json({
      message: "Projects fetched successfully",
      total: totalProjects,
      page: pageNumber,
      pageSize,
      result,
    });
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

exports.deleteProject = async (req, res) => {
  try {
    const findProject = await Project.findById(req.params.id);
    if (!findProject) {
      return res.status(404).json({ message: "Project Not Found" });
    }
    const deleteProject = await Project.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Project Delete successfully" });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const findProject = await Project.findById(req.params.id);
    if (!findProject) {
      return res.status(404).json({ message: "Project Not Found" });
    }
    return res
      .status(201)
      .json({ message: "Project Get successfully", findProject });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
    s;
  }
};
