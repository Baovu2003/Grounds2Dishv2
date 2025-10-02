const Blog = require("../model/blog.model");

// Tạo blog
module.exports.createBlog = async (req, res) => {
  try {
    const { title, article } = req.body;
    const bannerImage = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.bannerImage;

    const date = new Date();
    const blog = new Blog({
      title,
      article,
      bannerImage,
      publishedAt: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả blogs (chưa bị xóa)
module.exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ deleted: false }).sort({ _id: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports.getBlogsByAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ _id: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Lấy blog theo id
module.exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, deleted: false });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update blog
module.exports.updateBlog = async (req, res) => {
  try {
    const { title, article, category, author, readTime } = req.body;
    const updateData = {
      title,
      article,
      category,
      author,
      readTime,
    };

    if (req.file) {
      updateData.bannerImage = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete blog
module.exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully (soft delete)", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Khôi phục blog
module.exports.restoreBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog restored successfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
