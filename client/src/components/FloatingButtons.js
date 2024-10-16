import React from 'react';
import { Link } from 'react-router-dom';

const FloatingButtons = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="floating-buttons">
      {isAuthenticated ? (
        <>
          <button onClick={onLogout} className="floating-button logout-button">התנתקות</button>
          <Link to="/add-recipe" className="floating-button add-recipe-button">הוסף מתכון</Link>
          <Link to="/add-category" className="floating-button add-category-button">הוסף קטגוריה</Link>
        </>
      ) : (
        <Link to="/login" className="floating-button login-button">התחברות</Link>
      )}
    </div>
  );
};

export default FloatingButtons;
