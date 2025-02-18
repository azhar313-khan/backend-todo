const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./connectDB/connectDB");
const PORT = process.env.PORT || 5000;
const router = require("./routes/routes");
const cors = require("cors");

// Connect to MongoDB
connectDB();
dotenv.config();

//Middleware
app.use(cors());
app.use(express.json());
//routes
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
