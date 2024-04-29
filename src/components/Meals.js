import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Meals.css'; // Import meals.css stylesheet

const MealsPage = () => {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);

  // Fetch meals by category from the API
  useEffect(() => {
    const fetchMealsByCategory = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        setMeals(response.data.meals);
      } catch (error) {
        console.error('Error fetching meals by category:', error);
      }
    };

    fetchMealsByCategory();
  }, [category]);

  // Function to toggle a meal's favorite status
  const toggleFavorite = (meal) => {
    const existingFavorites = localStorage.getItem('favoriteMeals');
    const favoriteMeals = existingFavorites ? JSON.parse(existingFavorites) : [];

    const isFavorite = favoriteMeals.some((favMeal) => favMeal.idMeal === meal.idMeal);

    if (isFavorite) {
      const updatedFavorites = favoriteMeals.filter((favMeal) => favMeal.idMeal !== meal.idMeal);
      localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favoriteMeals, meal];
      localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
    }

    // Refresh meals list to reflect favorite status change
    setMeals((prevMeals) =>
      prevMeals.map((m) => (m.idMeal === meal.idMeal ? { ...m, isFavorite: !isFavorite } : m))
    );
  };

  // Function to check if a meal is in the favorites list
  const isFavorite = (mealId) => {
    const existingFavorites = localStorage.getItem('favoriteMeals');
    const favoriteMeals = existingFavorites ? JSON.parse(existingFavorites) : [];
    return favoriteMeals.some((favMeal) => favMeal.idMeal === mealId);
  };

  return (
    <div>
      <center><h2 id = "heading">Meals in {category}</h2></center>
      <ul className="meals-list">
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strMeal}</p>
            <span
              onClick={() => toggleFavorite(meal)}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{
                  marginRight: '5px',
                  color: isFavorite(meal.idMeal) ? 'red' : 'inherit',
                }}
              />
              {isFavorite(meal.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealsPage;
