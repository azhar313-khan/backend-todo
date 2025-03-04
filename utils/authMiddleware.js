const jwt = require("jsonwebtoken");
exports.varifyToken = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ error: "Access denied,token missing" });
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id, "decomde");
    req.userId = decoded.id;
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
