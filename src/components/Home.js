import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS for home page styling

const Home = () => {
  return (
    <div className="home-container">
      <h2 id = "heading">Welcome to My Meal App!</h2>
      <div className="action-boxes">
        <div className="action-box" id="menu-box">
          <Link to="/menu" className="box-link">
            <h3>Menu</h3>
            <p>Explore our meal categories</p>
          </Link>
        </div>
        <div className="action-box" id="favorites-box">
          <Link to="/favorites" className="box-link">
            <h3>My Favorites</h3>
            <p>View and manage your favorite meals</p>
          </Link>
        </div>
      </div>
      <div className="action-box" id="random-box">
        <Link to="/randommealgenerator" className="box-link">
          <h3>Random Meal Generator</h3>
          <p>Get a random meal suggestion</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
