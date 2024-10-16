import React from 'react';
import api from '../services/api'; // Use the configured API instance

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, isAdmin, refreshCategories }) => {
  const deleteCategory = async (categoryId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) {
      try {
        await api.delete(`/categories/${categoryId}`);
        alert('הקטגוריה נמחקה בהצלחה!');
        if (refreshCategories) {
          refreshCategories(); // Refresh the categories list after deletion
        }
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
