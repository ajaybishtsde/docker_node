const express = require("express");
const mongoose = require("mongoose");
const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./src/config/config");
const connectDB = require("./src/database/connectDB");
const userRoutes = require("./src/routes/users");
const app = express();
require("dotenv").config();
const port = process.env.PORT || "3001";

//connecting to database
const connectUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
connectDB(connectUrl);

app.use(cors({}));
app.use(bodyParser.json());
app.enable("trust proxy");
app.use("/api/user", userRoutes);
app.use("/api", (req, res) => {
  console.log("hello this is check for nginx");
  return res.json({
    status: true,
    message: "Welcome to server from Docker ",
  });
});

// Unwanted routes handel
app.all("*", (req, res, next) => {
  next(new AppError(`Requested url ${req.originalUrl} is not found`, 401));
});

// Global error handel
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`connected at port ${port}`);
});
// Unhandeld error
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
});
