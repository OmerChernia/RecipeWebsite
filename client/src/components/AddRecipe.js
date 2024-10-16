import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Use the configured API instance
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', JSON.stringify(ingredients.split('\n'))); // Split into array
    formData.append('instructions', JSON.stringify(instructions.split('\n'))); // Split into array
    formData.append('cookingTime', cookingTime);
    formData.append('servings', servings);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      const response = await api.post('/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Recipe added successfully!');
      navigate(`/recipe/${response.data._id}`); // Navigate to the new recipe
    } catch (err) {
      console.error(err);
      alert('Error adding recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>הוסף מתכון חדש</h2>
      <input type="text" placeholder="כותרת" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="תיאור" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <textarea placeholder="מצרכים (אחד בכל שורה)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      <textarea placeholder="הוראות הכנה (אחת בכל שורה)" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      <input type="number" placeholder="זמן בישול (בדקות)" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
      <input type="number" placeholder="כמות הגשות למנה" value={servings} onChange={(e) => setServings(e.target.value)} required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">בחר קטגוריה</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
      <button type="submit">הוסף מתכון</button>
    </form>
  );
};

export default AddRecipe;
