const User = require("../model/user.model.js");

// Middleware xác thực token
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Access token is required",
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    console.log("token", token);
    // Tìm user trong database
    const user = await User.findOne({ token: token });
    console.log("user", user);
    if (!user || !user.isActive) {
      return res.status(401).json({
        status: "error",
        message: "User not found or inactive",
      });
    }
    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: error.message || "Invalid token",
    });
  }
};

// Middleware kiểm tra role admin
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }
  console.log("req.user.role", req.user.role);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Admin access required",
    });
  }
  console.log("Next", next);

  next();
};

module.exports = {
  authenticate,
  requireAdmin,
};
