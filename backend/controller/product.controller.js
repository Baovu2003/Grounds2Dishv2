const Product = require("../model/product.model");

// [GET] /api/products
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ deleted: false }).populate(
      "product_category_id",
      "title"
    ); // populate category
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [GET] /api/products/admin
module.exports.getAllProductsByAdmin = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "product_category_id",
      "title"
    ); // populate category
    console.log("products", products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [POST] /api/products/create
module.exports.createProduct = async (req, res) => {
  try {
    // build URL cho thumbnail nếu có file upload
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const newProduct = new Product({
      ...req.body,
      thumbnail: imageUrl,
    });

    await newProduct.save();
    // populate để trả về category chi tiết
    await newProduct.populate("product_category_id", "title");

    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/products/edit/:id
module.exports.editProduct = async (req, res) => {
  try {
    // Nếu có upload file mới thì build URL, còn không thì giữ nguyên thumbnail cũ
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.thumbnail;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        thumbnail: imageUrl,
      },
      { new: true }
    ).populate("product_category_id", "title");

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
