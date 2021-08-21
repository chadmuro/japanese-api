const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET ALL
router.get('/', categoryController.category_get_all);

// CREATE ONE
router.post('/', categoryController.category_post);

module.exports = router;
