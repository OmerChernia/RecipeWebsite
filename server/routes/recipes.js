const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

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

        blobStream.on('finish', async () => {
          // Corrected URL
          imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          await updateRecipe();
        });

        blobStream.end(req.file.buffer);
      } else {
        await updateRecipe();
      }

      async function updateRecipe() {
        const updateData = {
          title: req.body.title,
          description: req.body.description,
          ingredients: JSON.parse(req.body.ingredients),
          instructions: JSON.parse(req.body.instructions),
          cookingTime: req.body.cookingTime,
          servings: req.body.servings,
          category: req.body.category,
        };
        if (imageUrl) {
          updateData.image = imageUrl;
        }

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
        return res.status(404).send('Recipe not found');
      }

      // Delete image from GCS if it exists
      if (recipe.image) {
        // Extract the file name from the image URL
        const imagePath = recipe.image.replace(`https://storage.googleapis.com/${bucket.name}/`, '');
        const file = bucket.file(imagePath);

        // Check if the file exists before attempting to delete
        const [exists] = await file.exists();
        if (exists) {
          await file.delete();
          console.log(`Image ${imagePath} deleted from GCS`);
        } else {
          console.warn(`Image ${imagePath} does not exist in GCS`);
        }
      }

      // Delete the recipe from the database
      await Recipe.findByIdAndDelete(req.params.id);
      res.send('Recipe deleted successfully');
    } catch (err) {
      console.error('Error deleting recipe:', err.message);
      res.status(500).send(`Server Error: ${err.message}`);
    }
  });

  return router;
};
