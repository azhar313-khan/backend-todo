const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgetPassword,
  updateProfie,
  profile,
  getAllUser,
  updateUserStatus,
} = require("../controller/userController");
const {
  createTode,
  getTodo,
  updateTodos,
  deleteTodo,
  getTodoById,
} = require("../controller/todoController");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome API
 *     description: Returns a welcome message from the API.
 *     responses:
 *       200:
 *         description: Successful response with a welcome message.
 */
router.get("/", function (req, res) {
  res.send("Hello from the API");
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Example Post Route
 *     description: This is an example POST request.
 *     responses:
 *       200:
 *         description: Successful response.
 */
router.post("/", function (req, res) {
  res.send("Hello from the API");
});

//Signup API

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User Signup
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post("/signup", signup);

//Login API
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 */
router.post("/login", login);

//Forget Password API
/**
 * @swagger
 * /forgetPassword:
 *   post:
 *     summary: Forgot Password
 *     description: Sends a reset link to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent.
 */

router.post("/forgetPassword", forgetPassword);

//Update Profile API
/**
 * @swagger
 * /updateProfile/{id}:
 *   put:
 *     summary: Update User Profile
 *     description: Updates a user's profile information.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 */

router.put("/updateProfile/:id", updateProfie);

//Profile API
/**
 * @swagger
 * /getProfile:
 *   get:
 *     summary: Get User Profile
 *     description: Retrieves the profile of the authenticated user.
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 */
router.get("/getProfile", profile);

//Get All User API
/**
 * @swagger
 * /getAllUser:
 *   get:
 *     summary: Get All Users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/getAllUser", getAllUser);
router.put("/updateUserStatus/:id", updateUserStatus);

//Todo Route
router.post("/createTode", createTode);
router.get("/getTodos", getTodo);
router.put("/updateTodos/:id", updateTodos);
router.delete("/deleteTodo/:id", deleteTodo);
router.get("/getTodoById/:id", getTodoById);

module.exports = router;
