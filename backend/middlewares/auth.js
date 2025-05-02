const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ message: "Invalid or missing token" });
  }

  next();
};

module.exports = authMiddleware;
