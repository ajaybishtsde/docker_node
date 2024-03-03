const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "thisismysecretkeyajaysinghbisht");
    const userId = decodedToken._id;
    if (req.body.userId && req.body.userId !== userId) {
      return res.json({
        status: false,
      });
    } else {
      res.user = userId;
      next();
    }
  } catch {
    return res.json({
      status: false,
      error: "Invalid request!",
    });
  }
};
module.exports = verifyToken;
