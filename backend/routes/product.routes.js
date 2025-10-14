const express = require("express");
const router = express.Router();

const {
  getAllProductsByAdmin,
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct,
  restoreProduct,
  toggleProductStatus,
  getProductById,
} = require("../controller/product.controller");

const { authenticate, requireAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

// Public: GET all products
router.get("/", getAllProducts);

// Admin: get all (kể cả deleted)
router.get("/admin", authenticate, requireAdmin, getAllProductsByAdmin);

// GET chi tiết product theo id (public)
router.get("/:id", getProductById);

// Admin: Create product
router.post(
  "/create",
  authenticate,
  requireAdmin,
  upload.array("thumbnail", 3),
  createProduct
);

// Admin: Update product
router.patch(
  "/edit/:id",
  authenticate,
  requireAdmin,
  upload.array("thumbnail", 3),
  editProduct
);

// Admin: Delete product
router.patch("/:id/delete", authenticate, requireAdmin, deleteProduct);

// Admin: Restore product
router.patch("/:id/restore", authenticate, requireAdmin, restoreProduct);

// Admin: Toggle status active/inactive
router.patch(
  "/:id/toggle-status",
  authenticate,
  requireAdmin,
  toggleProductStatus
);

module.exports = router;
