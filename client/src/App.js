import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Banner from './components/Banner'; // Import the new Banner component
import CategoryFilter from './components/CategoryFilter'; // Import this
import RecipeList from './components/RecipeList';
import Login from './components/Login';
import AddRecipe from './components/AddRecipe';
import AddCategory from './components/AddCategory';
import RecipeDetails from './components/RecipeDetails';
import EditRecipe from './components/EditRecipe';
import './App.css';
import FloatingButtons from './components/FloatingButtons';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to false initially
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState([]); // Add this state
  const [selectedCategory, setSelectedCategory] = useState(null); // Add this state

  useEffect(() => {
    checkAuthStatus();
    // Fetch categories when the component mounts
    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/auth/me', {
        headers: { 'x-auth-token': token }
      })
        .then(res => {
          setIsAuthenticated(true);
          setIsAdmin(res.data.isAdmin);
        })
        .catch(err => {
          console.error(err);
          setIsAuthenticated(false);
          setIsAdmin(false);
          localStorage.removeItem('token');
        });
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    console.log('User logged out');
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    checkAuthStatus();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    // Check if the user is an admin when the component mounts
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to create an API endpoint to verify if the user is an admin
      axios.get('/api/users/me', { headers: { 'x-auth-token': token } })
        .then(response => {
          setIsAdmin(response.data.isAdmin);
        })
        .catch(error => {
          console.error('Error checking admin status:', error);
        });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="fixed-header">
          <Banner />
          <div className="banner-category-separator"></div>
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            isAdmin={isAdmin}
          />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<RecipeList categories={categories} selectedCategory={selectedCategory} />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />} />
            <Route path="/add-recipe" element={isAuthenticated && isAdmin ? <AddRecipe /> : <Navigate to="/login" />} />
            <Route path="/add-category" element={isAuthenticated && isAdmin ? <AddCategory /> : <Navigate to="/login" />} />
            <Route path="/recipe/:id" element={<RecipeDetails isAdmin={isAdmin} />} />
            <Route path="/edit-recipe/:id" element={isAuthenticated && isAdmin ? <EditRecipe /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <FloatingButtons 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
        />
      </div>
    </Router>
  );
}

export default App;
