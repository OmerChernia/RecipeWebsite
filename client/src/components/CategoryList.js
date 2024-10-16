import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      console.log('Categories fetched:', res.data);
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err.response ? err.response.data : err.message);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err.response ? err.response.data : err.message);
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
