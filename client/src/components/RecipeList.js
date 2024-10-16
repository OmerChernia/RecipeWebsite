import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const RecipeList = ({ selectedCategory }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);

  const fetchRecipes = async () => {
    try {
      console.log('Fetching recipes from:', `${API_BASE_URL}/recipes`);
      const res = await api.get('/recipes');
      console.log('Recipes fetched:', res.data);
      setRecipes(res.data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    }
  };

  const filteredRecipes = selectedCategory === null 
    ? recipes 
    : recipes.filter(recipe => recipe.category && recipe.category._id === selectedCategory);

  return (
    <div className="recipe-list">
      <div className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id} className="recipe-card">
            {recipe.image && (
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
            )}
            <div className="content">
              <h2>{recipe.title}</h2>
              <p className="cooking-time">{recipe.cookingTime} דקות</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
