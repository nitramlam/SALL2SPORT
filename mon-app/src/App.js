import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';  // Import de la page d'accueil
import UserProfilePage from './components/UserProfilePage';  // Import de la page utilisateur

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Route pour la page d'accueil */}
          <Route path="/user/:userId" element={<UserProfilePage />} />  {/* Route pour la page utilisateur avec userId */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;