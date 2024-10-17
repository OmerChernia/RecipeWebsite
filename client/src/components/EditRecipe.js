import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Use the configured API instance
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]); // Define categories state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    servings: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    // Fetch the recipe data
    api.get(`/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          ingredients: response.data.ingredients.join('\n'), // Convert array to multi-line string
          instructions: response.data.instructions.join('\n'), // Convert array to multi-line string
          cookingTime: response.data.cookingTime,
          servings: response.data.servings,
          category: response.data.category._id || response.data.category, // Handle category
          image: response.data.image,
        });
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
        alert('Failed to fetch recipe data.');
      });

    // Fetch categories
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => {
        console.error('Error fetching categories:', error);
        alert('Failed to fetch categories.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recipeData = new FormData();
      recipeData.append('title', formData.title);
      recipeData.append('description', formData.description);
      recipeData.append('ingredients', JSON.stringify(formData.ingredients.split('\n'))); // Split by newline
      recipeData.append('instructions', JSON.stringify(formData.instructions.split('\n'))); // Split by newline
      recipeData.append('cookingTime', formData.cookingTime);
      recipeData.append('servings', formData.servings);
      recipeData.append('category', formData.category._id || formData.category); // Use _id if it's an object
      if (formData.image instanceof File) {
        recipeData.append('image', formData.image);
      }

      const response = await api.put(`/recipes/${id}`, recipeData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Recipe updated successfully!');
      navigate(`/recipe/${response.data._id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe.');
    }
  };

  // Handler for deleting the recipe
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      try {
        await api.delete(`/recipes/${id}`);
        alert('Recipe deleted successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete recipe.');
      }
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="edit-recipe-container" dir="rtl">
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <h2>עריכת מתכון</h2>
        <input type="text" name="title" placeholder="כותרת" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="תיאור" value={formData.description} onChange={handleChange} required />
        <textarea name="ingredients" placeholder="מצרכים (אחד בכל שורה)" value={formData.ingredients} onChange={handleChange} required />
        <textarea name="instructions" placeholder="הוראות הכנה (אחת בכל שורה)" value={formData.instructions} onChange={handleChange} required />
        <input type="number" name="cookingTime" placeholder="זמן בישול (בדקות)" value={formData.cookingTime} onChange={handleChange} required />
        <input type="number" name="servings" placeholder="כמות הגשות למנה" value={formData.servings} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">בחר קטגוריה</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input type="file" name="image" onChange={handleChange} accept="image/*" />
        <button type="submit">עדכן מתכון</button>
      </form>
      <button onClick={handleDelete} className="delete-button">מחק מתכון</button>
    </div>
  );
};

export default EditRecipe;
