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

router.get("/", getAllCategories);
router.get("/admin", getAllCategoriesAdmin);
router.post("/create", createCategory);
router.patch("/edit/:id", editCategory);
router.patch("/delete/:id", deleteCategory);
router.patch("/restore/:id", restoreCategory);

module.exports = router;
