const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

module.exports = (bucket) => {
  const router = express.Router();

  // Configure multer for in-memory storage
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // Get all recipes
  router.get('/', async (req, res) => {
    try {
      const recipes = await Recipe.find().populate('category');
      res.json(recipes);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
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
      let imageUrl = null;
      if (req.file) {
        const blob = bucket.file(`${Date.now()}_${req.file.originalname}`);
        const blobStream = blob.createWriteStream({
          resumable: false,
          contentType: req.file.mimetype,
        });

        blobStream.on('error', (err) => {
          console.error('GCS Upload Error:', err);
          return res.status(500).send('Server Error');
        });

        blobStream.on('finish', () => {
          imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          // Proceed to save recipe with imageUrl
          const newRecipe = new Recipe({
            ...req.body,
            ingredients: JSON.parse(req.body.ingredients),
            instructions: JSON.parse(req.body.instructions),
            image: imageUrl,
          });

          newRecipe.save()
            .then((recipe) => res.json(recipe))
            .catch((err) => {
              console.error('Error adding recipe:', err);
              res.status(500).send('Server Error');
            });
        });

        blobStream.end(req.file.buffer);
      } else {
        const newRecipe = new Recipe({
          ...req.body,
          ingredients: JSON.parse(req.body.ingredients),
          instructions: JSON.parse(req.body.instructions),
          image: null,
        });
        const recipe = await newRecipe.save();
        res.json(recipe);
      }
    } catch (err) {
      console.error('Error adding recipe:', err);
      res.status(500).send('Server Error');
    }
  });

  // Update recipe (admin only)
  router.put('/:id', [auth, upload.single('image')], async (req, res) => {
    try {
      let imageUrl = null;
      if (req.file) {
        const blob = bucket.file(`${Date.now()}_${req.file.originalname}`);
        const blobStream = blob.createWriteStream({
          resumable: false,
          contentType: req.file.mimetype,
        });

        blobStream.on('error', (err) => {
          console.error('GCS Upload Error:', err);
          return res.status(500).send('Server Error');
        });

        blobStream.on('finish', () => {
          imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          // Proceed to update recipe with imageUrl
          const updateData = {
            ...req.body,
            ingredients: JSON.parse(req.body.ingredients),
            instructions: JSON.parse(req.body.instructions),
          };
          if (imageUrl) {
            updateData.image = imageUrl;
          }

          Recipe.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .then((recipe) => res.json(recipe))
            .catch((err) => {
              console.error('Error updating recipe:', err);
              res.status(500).send('Server Error');
            });
        });

        blobStream.end(req.file.buffer);
      } else {
        const updateData = {
          ...req.body,
          ingredients: JSON.parse(req.body.ingredients),
          instructions: JSON.parse(req.body.instructions),
        };
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(recipe);
      }
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

  return router;
};
