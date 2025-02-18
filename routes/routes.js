const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgetPassword,
  updateProfie,
} = require("../controller/userController");
const {
  createTode,
  getTodo,
  updateTodos,
  deleteTodo,
  getTodoById,
} = require("../controller/todoController");

router.get("/", function (req, res) {
  res.send("Hello from the API");
});

router.post("/", function (req, res) {
  res.send("Hello from the API");
});

//Signup API
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgetPassword", forgetPassword);
router.put("/updateProfile/:id", updateProfie);

//Todo Route
router.post("/createTode", createTode);
router.get("/getTodos", getTodo);
router.put("/updateTodos/:id", updateTodos);
router.delete("/deleteTodo/:id", deleteTodo);
router.get("/getTodoById/:id", getTodoById);

module.exports = router;
