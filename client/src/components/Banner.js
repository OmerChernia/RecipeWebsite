import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-icons">
        <img src="/food.png" alt="Food" className="banner-icon food-icon" />
        <img src="/pickles.png" alt="Pickles" className="banner-icon pickles-icon" />
        <img src="/cooking.png" alt="Cooking" className="banner-icon cooking-icon" />
        <img src="/bottle.png" alt="Bottle" className="banner-icon bottle-icon" />
      </div>
      <div className="banner">
        <Link to="/" className="banner-title">
          <h1>חמוצים עם חמוצים</h1>
        </Link>
        <div className="banner-separator"></div>
        <p>המתכונים הכי טעימים לחמוצים ביתיים</p>
      </div>
    </div>
  );
};

export default Banner;
