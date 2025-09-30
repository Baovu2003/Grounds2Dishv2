const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controller/order.controller");

// User tạo đơn
router.post("/create", createOrder);

// Admin xem tất cả đơn
router.get("/", getAllOrders);

// Admin đổi trạng thái đơn
router.patch("/status/:id", updateOrderStatus);

module.exports = router;
