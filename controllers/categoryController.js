const Category = require('../models/category');

const category_get_all = async (req, res) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const category_get = async (req, res) => {
  res.json(res.category);
};

const category_post = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  category_get_all,
  category_get,
  category_post,
};
