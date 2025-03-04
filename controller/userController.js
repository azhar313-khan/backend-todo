const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { signUpValidator, loginValidator } = require("../utils/validator");

const generateToke = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    password = String(password);
    const validator = signUpValidator({ name, email, password });
    if (validator.error) {
      return res
        .status(400)
        .json({ message: validator.error.details[0].message });
    }

    const userExits = await User.findOne({ email });
    if (userExits)
      return res.status(400).json({ message: "User Email is already Exists" });
    //hash Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(String(password), salt);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(201).json({ message: "User Registration Successful", user });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    password = String(password);
    const validator = loginValidator({ email, password });
    if (validator.error) {
      return res
        .status(400)
        .json({ message: validator.error.details[0].message });
    }
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ message: "User Not Found with this email Please Sign Up" });
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) return res.status(400).send({ message: "Password is wrong" });
    const token = generateToke(user._id);
    res.status(201).send({ message: "Login Successful", user, token });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });
    const resetToke = generateToke(user._id);
    const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${resetToke}`;

    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false, // use TLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transport.sendMail({
      from: "azhar.khan@thoughtwin.com",
      to: email,
      subject: "Reset Password",
      text: `Please click on the following link to reset your password: ${resetURL}`,
    });
    res.json({ message: "Password reset link sent to email" });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.updateProfie = async (req, res) => {
  try {
    const { name, email, password, phone, status } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.status = status || user.status;
    if (req.file.filename) {
      console.log(req.file.filename);
      user.profileImage = `/uploads/${req.file.filename}`;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(String(password), salt);
      user.password = hash;
    }
    await user.save();
    res.json({ message: "User profile updated", user });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.profile = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(201).send({ message: "User profile", user });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const {
      search,
      sortBy = "created_at",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;
    let filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    let totalUser = (await User.find(filter)).length;
    const totalPage = Math.ceil(totalUser / limit);

    res.status(201).json({
      message: "All signup user",
      totalUser: totalUser,
      currentPage: Number(page),
      totalPage,
      pageSize: Number(limit),
      users,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    user.status === "active" ? "inactive" : "active";
    if (user.status === "active") {
      user.status = "inactive";
    } else if (user.status === "inactive") {
      user.status = "active";
    }

    await user.save();
    res.json({ message: "User Status Updated Successfully", user });

    return user;
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.dashboradCount = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    const activeUserCount = await User.countDocuments({ status: "active" });
    const inactiveUserCount = await User.countDocuments({ status: "inactive" });
    res.status(201).json({
      message: "Get Count Successfully",
      totalUser,
      activeUserCount,
      inactiveUserCount,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};
