const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
  restoreCategory,
  getAllCategoriesAdmin,
} = require("../controller/product-category.controller");
const { authenticate, requireAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
router.get("/", getAllCategories);
router.get("/admin", authenticate, requireAdmin, getAllCategoriesAdmin);
// router.post("/create", authenticate, requireAdmin, createCategory);
router.post(
  "/create",
  authenticate,
  requireAdmin,
  upload.single("thumbnail"),
  createCategory
);

router.patch(
  "/edit/:id",
  authenticate,
  requireAdmin,
  upload.single("thumbnail"),
  editCategory
);

router.patch("/delete/:id", authenticate, requireAdmin, deleteCategory);
router.patch("/restore/:id", authenticate, requireAdmin, restoreCategory);

module.exports = router;
