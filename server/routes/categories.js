const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth'); // Middleware to protect routes
const Recipe = require('../models/Recipe'); // Mongoose model for Recipe

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public (Change to Private if needed)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public (Change to Private if needed)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error('Error fetching category:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/categories
// @desc    Create a new category (Admin Only)
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category already exists
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: 'Category already exists' });
    }

    category = new Category({ name });
    await category.save();
    res.json(category);
  } catch (err) {
    console.error('Error adding category:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category (Admin Only)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the new name already exists
    let existingCategory = await Category.findOne({ name });
    if (existingCategory && existingCategory._id.toString() !== req.params.id) {
      return res.status(400).json({ msg: 'Category name already in use' });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    console.error('Error updating category:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category (Admin Only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }

    // Check if any recipes are associated with this category
    const associatedRecipes = await Recipe.find({ category: req.params.id });
    if (associatedRecipes.length > 0) {
      return res.status(400).json({ msg: 'Cannot delete category with associated recipes' });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.send('Category deleted successfully');
  } catch (err) {
    console.error('Error deleting category:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
