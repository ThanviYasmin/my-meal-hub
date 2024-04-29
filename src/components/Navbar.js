import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
      </div>
      <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <li className="nav-item">
          <Link to="/home" className="nav-link" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/menu" className="nav-link" onClick={toggleMenu}>
            Menu
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/favorites" className="nav-link" onClick={toggleMenu}>
            My Favorites
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/randommealgenerator" className="nav-link" onClick={toggleMenu}>
            Meal Generator
          </Link>
        </li>
        <br></br>
        <li className="nav-item">
          <Link to="/aboutme" className="nav-link" onClick={toggleMenu}>
            About Me
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
