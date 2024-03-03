const mongoose = require("mongoose");
const connectDB = (connectionUrl) => {
  mongoose
    .connect(connectionUrl)
    .then(() => {
      console.log("connected to database....");
    })
    .catch((err) => {
      console.log("failed to connect");
      setTimeout(() => {
        console.log("Trying to reconnect....");
        connectDB(connectionUrl);
      }, 5000);
    });
};
module.exports = connectDB;
