const Product = require("../model/product.model");

// [GET] /api/products
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ deleted: false });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [GET] /api/products/admin
module.exports.getAllProductsByAdmin = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [POST] /api/products/create
module.exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      thumbnail: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/products/edit/:id
module.exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        thumbnail: req.file
          ? `/uploads/${req.file.filename}`
          : req.body.thumbnail,
      },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
