const express = require("express");
const {
  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controller/auth.controller.js");
const { authenticate } = require("../middlewares/auth.js");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Forgot password routes
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
// auth.routes.js
router.get("/verify-token", authenticate, (req, res) => {
  res.json({ message: "Token hợp lệ", user: req.user });
});

module.exports = router;
