const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: String,
  product_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  description: String,
  price: Number,
  // đổi thành mảng nhiều ảnh
  thumbnail: {
    type: [String], // mỗi phần tử là một URL hoặc path ảnh
    default: [], // mặc định là mảng rỗng
  },
  // 🆕 Thêm field: thành phần & cách sử dụng
  ingredients: {
    type: [String], // danh sách các thành phần
    default: [],
  },
  usage: {
    type: [String], // danh sách các bước / hướng dẫn sử dụng
    default: [],
  },

  status: String,
  deleted: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
});
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
