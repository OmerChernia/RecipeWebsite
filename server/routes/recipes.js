const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
  }
});

const upload = multer({ storage: storage });

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('category');
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('category');
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new recipe (admin only)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      ingredients: JSON.parse(req.body.ingredients),
      instructions: JSON.parse(req.body.instructions),
      image: req.file ? `/uploads/${req.file.filename}` : null
    });
    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    console.error('Error adding recipe:', err);
    res.status(500).send('Server Error');
  }
});

// Update recipe (admin only)
router.put('/:id', [auth, upload.single('image')], async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      ingredients: JSON.parse(req.body.ingredients),
      instructions: JSON.parse(req.body.instructions)
    };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(recipe);
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(500).send('Server Error');
  }
});

// Delete recipe (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    await recipe.remove();
    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
