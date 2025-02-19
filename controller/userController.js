const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const generateToke = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).send({ message: "invalid email or password" });
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) return res.status(400).send({ message: "Password is wrong" });
    const token = generateToke(user._id);
    res.json({ message: "Login Successful", user, token });
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
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    user.name = name || user.name;
    user.email = email || user.email;

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
