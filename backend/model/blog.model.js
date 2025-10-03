const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  article: String,
  bannerImage: String,
  contentImages: [String],
  publishedAt: String,
  deleted: { type: Boolean, default: false },
});

const Blog = mongoose.model("Blog", blogSchema, "blogs");
module.exports = Blog;
