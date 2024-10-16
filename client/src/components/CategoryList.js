import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', { name: newCategory }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  return (
    <div className="category-list">
      <h2>Manage Categories</h2>
      <form onSubmit={addCategory}>
        <input 
          type="text" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)} 
          placeholder="New category name" 
          required 
        />
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map(category => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
