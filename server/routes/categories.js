const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const authMiddleware = require('../middleware/auth'); // If categories are protected

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public (Change to Private if needed)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST /api/categories
// @desc    Create a new category (Admin Only)
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ msg: 'Category name is required' });
  }

  try {
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: 'Category already exists' });
    }

    category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;