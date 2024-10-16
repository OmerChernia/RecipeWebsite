import React, { useState, useEffect } from 'react';
import api from './services/api'; // Ensure correct path
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Banner from './components/Banner';
import CategoryFilter from './components/CategoryFilter';
import RecipeList from './components/RecipeList';
import Login from './components/Login';
import AddRecipe from './components/AddRecipe';
import AddCategory from './components/AddCategory';
import RecipeDetails from './components/RecipeDetails';
import EditRecipe from './components/EditRecipe';
import FloatingButtons from './components/FloatingButtons';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to false initially
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState([]); // Add this state
  const [selectedCategory, setSelectedCategory] = useState(null); // Add this state

  useEffect(() => {
    checkAuthStatus();
    // Fetch categories when the component mounts
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
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

  const refreshCategories = () => {
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  };

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
            refreshCategories={refreshCategories} // Pass the refresh function
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
