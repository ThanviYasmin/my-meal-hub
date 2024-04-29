import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Menu from './components/Menu';
import Meals from './components/Meals';
import Favorites from './components/Favorites';
import RandomMealGenerator from './components/RandomMealGenerator';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/meals/:category" element={<Meals />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/randommealGenerator" element={<RandomMealGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
