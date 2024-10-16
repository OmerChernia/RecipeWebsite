import React from 'react';
import axios from 'axios';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, isAdmin }) => {
  const deleteCategory = async (categoryId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) {
      try {
        await axios.delete(`/api/categories/${categoryId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        alert('הקטגוריה נמחקה בהצלחה!');
        // You might want to refresh the categories list here
        // This could be done by calling a function passed as a prop
      } catch (err) {
        console.error('Error deleting category:', err);
        alert('שגיאה במחיקת הקטגוריה');
      }
    }
  };

  return (
    <div className="category-filter">
      <button
        onClick={() => onCategoryChange(null)}
        className={selectedCategory === null ? 'active' : ''}
      >
        All
      </button>
      {categories.map(category => (
        <div key={category._id} className="category-button-group">
          <button
            onClick={() => onCategoryChange(category._id)}
            className={selectedCategory === category._id ? 'active' : ''}
          >
            {category.name}
          </button>
          {isAdmin && selectedCategory === category._id && (
            <button 
              onClick={() => deleteCategory(category._id)}
              className="delete-category-btn"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
