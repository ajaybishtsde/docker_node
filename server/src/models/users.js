const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: { type: String, require: true, trim: true },
  age: { type: Number, require: true },
  email: { type: String, require: true, trim: true },
  password: { type: String, require: true, trim: true },
  phone: { type: Number, require: true },
  isAdult: { type: Boolean, require: true },
  address: { type: String },
});
const User = new mongoose.model("user", userSchema);
module.exports = User;
