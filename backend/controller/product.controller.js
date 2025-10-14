const Product = require("../model/product.model");

// [GET] /api/products
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ deleted: false })
      .populate({
        path: "product_category_id",
        select: "title deleted",
        match: { deleted: false }, // chỉ populate nếu category chưa bị xóa
      })
      .lean();
    // Lọc những sản phẩm mà category đã bị xóa (populate trả về null)
    const filteredProducts = products.filter((p) => p.product_category_id !== null);

    res.json(filteredProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [GET] /api/products/admin
module.exports.getAllProductsByAdmin = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("product_category_id", "title")
      .lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// [GET] /api/products/:id
module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: "product_category_id",
        select: "title deleted",
        match: { deleted: false }, // chỉ populate nếu category chưa bị xóa
      })
      .lean();

    if (!product || product.deleted) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// [POST] /api/products/create
module.exports.createProduct = async (req, res) => {
  try {
    // req.files là mảng các file upload - Cloudinary trả về URL ở file.path
    const imageUrls = req.files?.map((file) => file.path) || [];

    const newProduct = new Product({
      ...req.body,
      thumbnail: imageUrls, // thumbnail giờ là mảng
    });

    await newProduct.save();
    await newProduct.populate("product_category_id", "title");

    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/products/edit/:id
module.exports.editProduct = async (req, res) => {
  try {
    // Parse oldThumbnails từ req.body (string JSON hoặc mảng)
    let oldThumbnails = [];
    if (req.body.oldThumbnails) {
      if (typeof req.body.oldThumbnails === "string") {
        oldThumbnails = JSON.parse(req.body.oldThumbnails);
      } else if (Array.isArray(req.body.oldThumbnails)) {
        oldThumbnails = req.body.oldThumbnails;
      }
    }

    // Tạo URL cho các file mới upload - Cloudinary trả về URL ở file.path
    const newThumbnails = req.files?.map((file) => file.path) || [];

    // Gộp ảnh cũ + ảnh mới
    const thumbnails = [...oldThumbnails, ...newThumbnails];

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        thumbnail: thumbnails, // lưu mảng thumbnail
      },
      { new: true }
    ).populate("product_category_id", "title");

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/products/:id/delete
module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    res.json({ message: "Xóa sản phẩm thành công", product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/products/:id/restore
module.exports.restoreProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    res.json({ message: "Khôi phục sản phẩm thành công", product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/products/:id/toggle-status
module.exports.toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

    product.status = product.status === "active" ? "inactive" : "active";
    await product.save();

    res.json({ message: "Cập nhật trạng thái thành công", product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
