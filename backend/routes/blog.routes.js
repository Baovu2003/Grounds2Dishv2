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
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "contentImages", maxCount: 20 },
  ]),
  createBlog
);

router.get("/", getBlogs);
router.get("/admin", authenticate, requireAdmin, getBlogsByAdmin);
router.get("/:id", getBlogById);

router.patch(
  "/edit/:id",
  authenticate,
  requireAdmin,
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "contentImages", maxCount: 20 },
  ]),
  updateBlog
);

router.patch("/delete/:id", authenticate, requireAdmin, deleteBlog);
router.patch("/restore/:id", authenticate, requireAdmin, restoreBlog);

// simple image upload endpoint returning url for editor
router.post(
  "/upload",
  authenticate,
  requireAdmin,
  upload.single("image"),
  (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file" });
    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json(url);
  }
);

module.exports = router;
