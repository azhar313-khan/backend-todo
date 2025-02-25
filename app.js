const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./connectDB/connectDB");
const PORT = process.env.PORT || 5000;
const router = require("./routes/routes");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Connect to MongoDB
connectDB();
dotenv.config();

//Middleware
app.use(cors());
app.use(express.json());
//routes
app.use("/", router);

// Swagger configuration
const swaggerDefinition = {
  openapi: "3.0.0",

  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server url",
    },
    {
      url: "https://backend-todo-1-uz9r.onrender.com",
      description: "Live server url",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
