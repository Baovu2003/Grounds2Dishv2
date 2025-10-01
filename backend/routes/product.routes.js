const express = require("express");
const router = express.Router();
const multer = require("multer");

const storageMulter = require("../helpers/storageMulter");
const {
  getAllProductsByAdmin,
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct,
  restoreProduct,
  toggleProductStatus,
} = require("../controller/product.controller");

const upload = multer({ storage: storageMulter() });

// GET all products
router.get("/", getAllProducts);

// Admin: get all (kể cả deleted)
router.get("/admin", getAllProductsByAdmin);

// Create product
router.post("/create", upload.array("thumbnail", 3), createProduct);
// Update product
router.patch("/edit/:id", upload.array("thumbnail", 3), editProduct);
// Delete product
router.patch("/:id/delete", deleteProduct);

// Restore product
router.patch("/:id/restore", restoreProduct);

// Toggle status active/inactive
router.patch("/:id/toggle-status", toggleProductStatus);
module.exports = router;
