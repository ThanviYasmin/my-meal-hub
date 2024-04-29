import React, { useState, useEffect } from 'react';
import './favorites.css'; /* meals.css */

const FavoritesPage = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    // Retrieve favorite meals from local storage or other persistent storage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
    setFavoriteMeals(storedFavorites);
  }, []);

  // Function to remove a meal from favorites
  const removeFromFavorites = (mealId) => {
    const updatedFavorites = favoriteMeals.filter((meal) => meal.idMeal !== mealId);
    setFavoriteMeals(updatedFavorites);

    // Update local storage with updated list of favorite meals
    localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2 id="heading">My Favorite Meals</h2>
      <ul className="meals-list">
        {favoriteMeals.map((meal) => (
          <li key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strMeal}</p>
            <button id = "button" onClick={() => removeFromFavorites(meal.idMeal)}>Remove from Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
