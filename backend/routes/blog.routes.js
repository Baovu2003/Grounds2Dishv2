const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  restoreBlog,
  getBlogsByAdmin,
} = require("../controller/blog.controller");

const { authenticate, requireAdmin } = require("../middlewares/auth");
const multer = require("multer");
const storageMulter = require("../helpers/storageMulter");

const router = express.Router();
const upload = multer({ storage: storageMulter() });

// API Blog
router.post(
  "/create",
  authenticate,
  requireAdmin,
  upload.single("bannerImage"),
  createBlog
);

router.get("/", getBlogs);
router.get("/admin", authenticate, requireAdmin, getBlogsByAdmin);
router.get("/:id", getBlogById);

router.patch(
  "/edit/:id",
  authenticate,
  requireAdmin,
  upload.single("bannerImage"),
  updateBlog
);

router.patch("/delete/:id", authenticate, requireAdmin, deleteBlog);
router.patch("/restore/:id", authenticate, requireAdmin, restoreBlog);

module.exports = router;
