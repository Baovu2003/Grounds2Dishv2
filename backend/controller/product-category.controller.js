const ProductCategory = require("../model/product-category.model");

// [GET] /api/product-categories
module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find({ deleted: false });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [POST] /api/product-categories/create
module.exports.createCategory = async (req, res) => {
  try {
    const newCategory = new ProductCategory({
      title: req.body.title,
    });
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/product-categories/edit/:id
module.exports.editCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/product-categories/delete/:id (soft delete)
module.exports.deleteCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
