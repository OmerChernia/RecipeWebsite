import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRecipe = useCallback(async () => {
    try {
      const res = await axios.get(`/api/recipes/${id}`);
      const recipe = res.data;
      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients.join('\n')); // Join array with newlines
      setInstructions(recipe.instructions.join('\n')); // Join array with newlines
      setCookingTime(recipe.cookingTime);
      setServings(recipe.servings);
      setCategory(recipe.category._id);
    } catch (err) {
      console.error('Error fetching recipe:', err);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
    fetchCategories();
  }, [fetchRecipe]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
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
      await axios.put(`/api/recipes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      alert('המתכון עודכן בהצלחה!');
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error(err);
      alert('שגיאה בעדכון המתכון');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק מתכון זה?')) {
      try {
        await axios.delete(`/api/recipes/${id}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        alert('המתכון נמחק בהצלחה!');
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('שגיאה במחיקת המתכון');
      }
    }
  };

  return (
    <div className="edit-recipe-container">
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <h2>עריכת מתכון</h2>
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
        <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
        <button type="submit">עדכן מתכון</button>
      </form>
      <button onClick={handleDelete} className="delete-recipe-btn">מחק מתכון</button>
    </div>
  );
};

export default EditRecipe;
