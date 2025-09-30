const mongoose = require("mongoose");
const productCategorySchema = new mongoose.Schema({
  title: String,
  deleted: {
    type: Boolean,
    default: false,
  },
});
// Tham số thứ 3 trongt phần này là tên của collection trong database product-management
const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema,
  "products-category"
);
module.exports = ProductCategory;
