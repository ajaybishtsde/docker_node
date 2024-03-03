const user = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken");

const userRoutes = require("express").Router();
userRoutes.post("/", user.signup);
userRoutes.post("/auth", user.auth);
userRoutes.get("/me", verifyToken, user.getProfile);
userRoutes.put("/", verifyToken, user.updateprofile);
userRoutes.get("/", verifyToken, user.allUsers);
module.exports = userRoutes;
