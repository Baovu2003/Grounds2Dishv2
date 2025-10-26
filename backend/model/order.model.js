const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },

  // Địa chỉ chi tiết
  address: { type: String, required: true }, // số nhà, tên đường

  // Thêm các cấp hành chính riêng biệt
  province: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },

  note: { type: String },

  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      price: Number,
    },
  ],
  totalPrice: { type: Number, required: false },
  cupDiscount: { type: Number, required: false },
  finalPrice: { type: Number, required: false },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
