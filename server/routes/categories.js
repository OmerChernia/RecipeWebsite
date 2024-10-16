const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Categories found:', categories);  // Add this line
    res.json(categories);
  } catch (err) {
    console.error('Error in GET /api/categories:', err);  // Modify this line
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Add new category (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a category
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    await category.remove();
    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a category
router.put('/:id', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    category.name = name;
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add update and delete routes here

module.exports = router;
