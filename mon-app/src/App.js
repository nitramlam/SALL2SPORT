import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';  // Import de la page d'accueil
import UserProfilePage from './components/UserProfilePage';  // Import de la page utilisateur
import ProgramDetailPage from './components/ProgramDetailPage';  // Import de la page détaillant les exercices d'un programme

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Route pour la page d'accueil */}
          <Route path="/user/:userId" element={<UserProfilePage />} />  {/* Route pour la page utilisateur avec userId */}
          <Route path="/user/:userId/program/:programKey" element={<ProgramDetailPage />} />  {/* Route pour afficher les exercices d'un programme */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;