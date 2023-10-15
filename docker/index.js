const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");
const app = express();
const PORT = process.env.port || "3000";
mongoose
  // below in mongo:27017  mongo is the IP address of mongo container,since this is  service name this will automatically give us IP
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
  )
  .then(() => console.log("connected succesfully to DB"))
  .catch((e) => console.log(e));
app.get("/", (req, res) => {
  res.send("Hello there how are you bro!!!");
});
app.listen(PORT, () => {
  console.log(`app listening at ${PORT}`);
});
