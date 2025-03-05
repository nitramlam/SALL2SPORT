import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';  // Import de la page d'accueil
import UserProfilePage from './components/UserProfilePage';  // Import de la page utilisateur
import UpperBodyPage from './components/UpperBodyPage';  // Import de la page haut du corps
import LowerBodyPage from './components/LowerBodyPage';  // Import de la page bas du corps
import CardioPage from './components/CardioPage';  // Import de la page cardio

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Route pour la page d'accueil */}
          <Route path="/user/:userId" element={<UserProfilePage />} />  {/* Route pour la page utilisateur avec userId */}
          <Route path="/user/:userId/upperBody" element={<UpperBodyPage />} />  {/* Route pour le programme Haut du corps */}
          <Route path="/user/:userId/lowerBody" element={<LowerBodyPage />} />  {/* Route pour le programme Bas du corps */}
          <Route path="/user/:userId/cardio" element={<CardioPage />} />  {/* Route pour le programme Cardio */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;