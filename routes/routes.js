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
  changePassword,
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
const { varifyToken } = require("../utils/authMiddleware");
const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjectById,
} = require("../controller/projectController");

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
 *     summary: Test API Route
 *     description: Returns a simple "Hello from the API" message. Requires authentication.
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     responses:
 *       200:
 *         description: Successful response with a greeting message.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Hello from the API"
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 */
router.get("/", varifyToken, function (req, res) {
  res.send("Hello from the API");
});
/**
 * @swagger
 * /:
 *   post:
 *     summary: Test API Endpoint
 *     description: Returns a simple hello message.
 *     security:
 *       - bearerAuth: []  # Requires JWT authentication
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello from the API"
 */
router.post("/", varifyToken, function (req, res) {
  res.json({ message: "Hello from the API" });
});
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       500:
 *         description: Internal server error
 */
router.post("/signup", signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "65dfad7b79bfb"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);

router.post("/forgetPassword", forgetPassword);

/**
 * @swagger
 * /updateProfile:
 *   put:
 *     summary: Update User Profile
 *     description: Updates a user's profile information.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's new password (optional)
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               status:
 *                 type: string
 *                 description: User's account status (e.g., active/inactive)
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Bad request - Validation errors
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put(
  "/updateProfile",
  varifyToken,
  upload.single("profileImage"),
  updateProfie
);
/**
 * @swagger
 * /getProfile:
 *   get:
 *     summary: Get User Profile
 *     description: Retrieves the profile information of the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f6c2b7e6f6f7b2b8e7b9c3"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     profileImage:
 *                       type: string
 *                       example: "/uploads/profile.jpg"
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.get("/getProfile", varifyToken, profile);

/**
 * @swagger
 * /getAllUser:
 *   get:
 *     summary: Get All Users
 *     description: Retrieves a list of all users with pagination, sorting, and search functionality.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search users by name or email (case-insensitive)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, email, created_at]
 *           default: created_at
 *         description: Sort results by a specific field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (ascending or descending)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: Successfully retrieved users.
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
 *                         example: "60f6c2b7e6f6f7b2b8e7b9c3"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: "john@example.com"
 *                       phone:
 *                         type: string
 *                         example: "+1234567890"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       profileImage:
 *                         type: string
 *                         example: "/uploads/profile.jpg"
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Invalid token
 *       500:
 *         description: Server error
 */

router.get("/getAllUser", varifyToken, getAllUser);

/**
 * @swagger
 * /updateUserStatus:
 *   put:
 *     summary: Update User Status
 *     description: Toggles the user's status between "active" and "inactive".
 *     security:
 *       - BearerAuth: []
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
 *                   example: "User Status Updated Successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f6c2b7e6f6f7b2b8e7b9c3"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.put("/updateUserStatus/:userId", varifyToken, updateUserStatus);

/**
 * @swagger
 * /getCount:
 *   get:
 *     summary: Get User Count Statistics
 *     description: Retrieves the total number of users, active users, and inactive users.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user count statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get Count Successfully"
 *                 totalUser:
 *                   type: integer
 *                   example: 100
 *                 activeUserCount:
 *                   type: integer
 *                   example: 75
 *                 inactiveUserCount:
 *                   type: integer
 *                   example: 25
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Invalid token
 *       500:
 *         description: Server error
 */

router.get("/getCount", varifyToken, dashboradCount);
/**
 * @swagger
 * /changePassword:
 *   put:
 *     summary: Change user password
 *     description: Allows an authenticated user to change their password.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "oldPass123"
 *               newPassword:
 *                 type: string
 *                 example: "newPass456"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Incorrect old password or invalid new password
 *       401:
 *         description: Unauthorized. Please log in.
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.put("/changePassword", varifyToken, changePassword);

//Project API
/**
 * @swagger
 * /createProject:
 *   post:
 *     summary: Create a new project
 *     description: Allows an authenticated user to create a new project.
 *     tags:
 *       - Project
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My New Project"
 *               description:
 *                 type: string
 *                 example: "This is a test project description"
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Server error
 */

router.post("/createProject", varifyToken, createProject);
/**
 * @swagger
 * /updateProject/{id}:
 *   put:
 *     summary: Update an existing project
 *     description: Allows an authenticated user to update a project by its ID.
 *     tags:
 *       - Project
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Project Name"
 *               description:
 *                 type: string
 *                 example: "Updated project description"
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */

router.put("/updateProject/:id", varifyToken, updateProject);
router.get("/getProject", varifyToken, getProject);
router.delete("/deleteProject/:id", varifyToken, deleteProject);
router.get("/getProjectById/:id", varifyToken, getProjectById);

//Todo Route
router.post("/createTode", createTode);
router.get("/getTodos", getTodo);
router.put("/updateTodos/:id", updateTodos);
router.delete("/deleteTodo/:id", deleteTodo);
router.get("/getTodoById/:id", getTodoById);

//Image Upload
// router.post("/uploadImage", uploadImage);

module.exports = router;
