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
  dashboradCount,
} = require("../controller/userController");
const {
  createTode,
  getTodo,
  updateTodos,
  deleteTodo,
  getTodoById,
} = require("../controller/todoController");
var multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

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

router.put("/updateProfile/:id", upload.single("profileImage"), updateProfie);

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
 *     description: Retrieves a paginated list of users with optional search and sorting.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search users by name or email.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: "created_at"
 *         description: Field to sort by (e.g., "name", "email", "created_at").
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *         description: Sort order (ascending or descending).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page.
 *     responses:
 *       200:
 *         description: A paginated list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All signup user"
 *                 totalUser:
 *                   type: integer
 *                   example: 50
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPage:
 *                   type: integer
 *                   example: 5
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *       404:
 *         description: Server error.
 */
router.get("/getAllUser", getAllUser);
/**
 * @swagger
 * /updateUserStatus/{id}:
 *   put:
 *     summary: Update User Status
 *     description: Updates the status of a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive, banned]
 *                 example: "active"
 *     responses:
 *       200:
 *         description: User status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User status updated successfully."
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       400:
 *         description: Invalid request or missing parameters.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.put("/updateUserStatus/:id", updateUserStatus);
router.get("/getCount", dashboradCount);

//Todo Route
router.post("/createTode", createTode);
router.get("/getTodos", getTodo);
router.put("/updateTodos/:id", updateTodos);
router.delete("/deleteTodo/:id", deleteTodo);
router.get("/getTodoById/:id", getTodoById);

//Image Upload
// router.post("/uploadImage", uploadImage);

module.exports = router;
