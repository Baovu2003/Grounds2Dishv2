const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} = require("../controller/order.controller");

// User tạo đơn
router.post("/create", createOrder);

// Admin xem tất cả đơn
router.get("/", getAllOrders);

// Admin đổi trạng thái đơn
router.patch("/status/:id", updateOrderStatus);
router.patch("/payments/:id", updatePaymentStatus);

module.exports = router;
