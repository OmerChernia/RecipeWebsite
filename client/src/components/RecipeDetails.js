import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipeDetails = ({ isAdmin }) => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-details">
      <div className="recipe-info">
        <h1>{recipe.title}</h1>
        <p>זמן הכנה: {recipe.cookingTime} דקות</p>
        <p>מנות: {recipe.servings}</p>
        <h3>מצרכים:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>הוראות הכנה:</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        {isAdmin && (
          <div>
            <Link to={`/edit-recipe/${recipe._id}`}>
              <button>ערוך מתכון</button>
            </Link>
            {/* Add delete functionality if needed */}
          </div>
        )}
      </div>
      <div className="recipe-image">
        <img src={`http://localhost:5001${recipe.image}`} alt={recipe.title} />
      </div>
    </div>
  );
};

export default RecipeDetails;
