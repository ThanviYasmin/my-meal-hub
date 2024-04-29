import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; 

const MenuPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="menu-container">
      <h2>Meal Categories</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.idCategory} className="category-box">
            <Link to={`/meals/${category.strCategory}`} className="category-link">
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <div className="category-name">{category.strCategory}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
