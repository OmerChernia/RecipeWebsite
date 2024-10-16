import React, { useState } from 'react';
import api from '../services/api'; // Use the configured API instance
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name });
      alert('Category added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Error adding category');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-category-form">
      <h2>הוסף קטגוריה חדשה</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="שם הקטגוריה" 
        required 
      />
      <button type="submit">הוסף קטגוריה</button>
    </form>
  );
};

export default AddCategory;
