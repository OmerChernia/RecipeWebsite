import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <header>
      <nav>
        <Link to="/">דף הבית</Link>
        {isAuthenticated && isAdmin && (
          <>
            <button onClick={() => navigate('/add-recipe')}>הוסף מתכון</button>
            <button onClick={() => navigate('/add-category')}>הוסף קטגוריה</button>
          </>
        )}
        {!isAuthenticated ? (
          <Link to="/login">התחברות</Link>
        ) : (
          <button onClick={handleLogout}>התנתקות</button>
        )}
      </nav>
    </header>
  );
};

export default Header;