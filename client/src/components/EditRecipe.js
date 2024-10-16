import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Use the configured Axios instance
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]); // Define categories state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    servings: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    // Fetch the recipe data
    api.get(`/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          ingredients: JSON.stringify(response.data.ingredients),
          instructions: JSON.stringify(response.data.instructions),
          cookingTime: response.data.cookingTime,
          servings: response.data.servings,
          category: response.data.category,
          image: response.data.image,
        });
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
        alert('Failed to fetch recipe data.');
      });

    // Fetch categories
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => {
        console.error('Error fetching categories:', error);
        alert('Failed to fetch categories.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        ingredients: JSON.parse(formData.ingredients),
        instructions: JSON.parse(formData.instructions),
      };
      const response = await api.put(`/recipes/${id}`, updatedData);
      alert('Recipe updated successfully!');
      navigate(`/recipe/${response.data._id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe.');
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients (JSON format)"
        value={formData.ingredients}
        onChange={handleChange}
        required
      />
      <textarea
        name="instructions"
        placeholder="Instructions (JSON format)"
        value={formData.instructions}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="cookingTime"
        placeholder="Cooking Time (minutes)"
        value={formData.cookingTime}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="servings"
        placeholder="Servings"
        value={formData.servings}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipe;
