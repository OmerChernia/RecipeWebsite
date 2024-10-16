const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [String],
  instructions: [String],
  cookingTime: Number,
  servings: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: String,
  video: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('Recipe', RecipeSchema);
