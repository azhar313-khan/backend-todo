const jwt = require("jsonwebtoken");
console.log(process.env.JWT_SECRET, "test");
exports.varifyToken = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ error: "Access denied,token missing" });
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  console.log(token, "test");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ error: "Token expired, please login again" });
    }
    res.status(403).json({ error: "invalid_token", err });
  }
};
