const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createAsync = require("../utils/createAsync");
const AppError = require("../utils/appError");
module.exports = {
  signup: createAsync(async (req, res, next) => {
    const { email, phone } = req.body;
    const ifEmailNumberExist = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (ifEmailNumberExist) {
      return next(
        new AppError(
          "User with this email or phone already exist , Please try again with different email or phone",
          404
        )
      );
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const userData = new User(req.body);
      await userData.save();
      return res.json({
        status: true,
        message: "user is registerd",
      });
    }
  }),
  auth: createAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign(
          { _id: user._id },
          "thisismysecretkeyajaysinghbisht",
          { expiresIn: "400h" }
        );
        return res.json({
          status: true,
          data: token,
        });
      }
    }
    return next(new AppError("Email or Password is incorrect", 404));
  }),
  getProfile: createAsync(async (req, res, next) => {
    const user = await User.findOne({ _id: res.user }).select("-password");
    console.log(user);
    if (user) {
      return res.json({
        status: true,
        data: user,
      });
    } else {
      return next(new AppError("Error while fetching user", 404));
    }
  }),
  updateprofile: createAsync(async (req, res, next) => {
    const updateUser = await User.findByIdAndUpdate(
      { _id: res.user },
      req.body
    );
    console.log(updateUser, "us");
    return res.json({
      status: true,
      message: "Profile updated",
    });
  }),
  allUsers: createAsync(async (req, res, next) => {
    const users = await User.find()

      .skip(req.query.page)
      .sort({ firstName: 1 })
      .select("-password -_id");
    if (users) {
      return res.json({
        status: true,
        totalCount: users.length,
        data: users,
      });
    } else {
      return next(new AppError("No users found", 404));
    }
  }),
};
