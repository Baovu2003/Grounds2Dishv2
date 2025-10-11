const ProductCategory = require("../model/product-category.model");

// [GET] /api/product-categories
module.exports.getAllCategories = async (req, res) => {
  try {
    console.log("heheheheh");
    const categories = await ProductCategory.find({ deleted: false });
    console.log("categories", categories);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAllCategoriesAdmin = async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [POST] /api/product-categories/create
// module.exports.createCategory = async (req, res) => {
//   try {
//     const newCategory = new ProductCategory({
//       title: req.body.title,
//     });
//     await newCategory.save();
//     res.json(newCategory);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
module.exports.createCategory = async (req, res) => {
  try {
    const newCategory = new ProductCategory({
      title: req.body.title,
      description: req.body.description || "", // thêm description
      thumbnail: req.file
        ? `${req.file.filename}`
        : null, // lưu path ảnh
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
    const updateData = {
      title: req.body.title,
      description: req.body.description, // thêm description
    };

    if (req.file) {
      updateData.thumbnail = `${
        req.file.filename
      }`;
    }

    const category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      updateData,
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

// [PATCH] /api/product-categories/restore/:id (soft delete)
module.exports.restoreCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category restore", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
