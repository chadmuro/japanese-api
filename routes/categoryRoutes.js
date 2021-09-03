const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const Category = require('../models/category');

// GET ALL
router.get('/', categoryController.category_get_all);

// GET ONE
router.get('/:id', getCategory, categoryController.category_get);

// CREATE ONE
router.post('/', categoryController.category_post);

// Middleware
async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    console.log(category);
    if (category === null) {
      return res.status(404).json({ message: 'Cannot find category' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.category = category;
  next();
}

module.exports = router;
