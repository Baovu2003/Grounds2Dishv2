const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controller/product-category.controller");

router.get("/", getAllCategories);
router.post("/create", createCategory);
router.patch("/edit/:id", editCategory);
router.patch("/delete/:id", deleteCategory);

module.exports = router;
