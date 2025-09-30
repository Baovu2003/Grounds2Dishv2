const express = require("express");
const router = express.Router();
const multer = require("multer");

const storageMulter = require("../helpers/storageMulter");
const {
  getAllProductsByAdmin,
  getAllProducts,
  createProduct,
  editProduct,
} = require("../controller/product.controller");

const upload = multer({ storage: storageMulter() });

// GET all products
router.get("/", getAllProducts);

// Admin: get all (kể cả deleted)
router.get("/admin", getAllProductsByAdmin);

// Create product
router.post("/create", upload.single("thumbnail"), createProduct);

// Update product
router.patch("/edit/:id", upload.single("thumbnail"), editProduct);

module.exports = router;
