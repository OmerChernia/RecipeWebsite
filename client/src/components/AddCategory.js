import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', { name }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      alert('Category added successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
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
