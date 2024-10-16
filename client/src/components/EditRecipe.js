import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api'; // Use the configured API instance

const EditRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setIngredients(res.data.ingredients.join('\n'));
        setInstructions(res.data.instructions.join('\n'));
        setCookingTime(res.data.cookingTime);
        setServings(res.data.servings);
        setCategory(res.data.category._id);
      } catch (err) {
        console.error('Error fetching recipe:', err);
      }
    };
    fetchRecipe();
  }, [id]);

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
      await api.put(`/recipes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Recipe updated successfully!');
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error(err);
      alert('Error updating recipe');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await api.delete(`/recipes/${id}`);
        alert('Recipe deleted successfully!');
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Error deleting recipe');
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
