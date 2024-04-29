import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './RandomMealGenerator.css'; // Import CSS file for styling

const RandomMealGeneratorPage = () => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const generateRandomMeal = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const meal = response.data.meals[0];
      setRandomMeal(meal);
      // Check if the generated meal is already in favorites
      const existingFavorites = localStorage.getItem('favoriteMeals');
      const favoriteMeals = existingFavorites ? JSON.parse(existingFavorites) : [];
      setIsFavorite(favoriteMeals.some((favMeal) => favMeal.idMeal === meal.idMeal));
    } catch (error) {
      console.error('Error generating random meal:', error);
    }
  };

  const toggleFavorite = (meal) => {
    const existingFavorites = localStorage.getItem('favoriteMeals');
    const favoriteMeals = existingFavorites ? JSON.parse(existingFavorites) : [];

    const isMealFavorite = favoriteMeals.some((favMeal) => favMeal.idMeal === meal.idMeal);

    if (isMealFavorite) {
      const updatedFavorites = favoriteMeals.filter((favMeal) => favMeal.idMeal !== meal.idMeal);
      localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...favoriteMeals, meal];
      localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="random-meal-container">
      <h2>Random Meal Generator</h2>
      <p id = "msg"> Click the button below to generate random meal that will blow your mind!!</p>
      <button className="generate-button" onClick={generateRandomMeal}>
        Generate Random Meal
      </button>
      {randomMeal && (
        <div>
          <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} />
          <p>{randomMeal.strMeal}</p>
          <span
            onClick={() => toggleFavorite(randomMeal)}
            style={{ cursor: 'pointer', color: 'red' }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{
                marginRight: '5px',
                color: isFavorite ? 'red' : 'inherit',
              }}
            />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </span>
        </div>
      )}
    </div>
  );
};

export default RandomMealGeneratorPage;
