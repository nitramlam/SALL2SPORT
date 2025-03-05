import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';  // Assure-toi que le chemin vers le fichier firebase.js est correct

const UserProfilePage = () => {
  const { userId } = useParams();  // Récupérer l'ID de l'utilisateur depuis l'URL
  const [userName, setUserName] = useState(null);  // Variable d'état pour stocker le nom de l'utilisateur
  const [programs, setPrograms] = useState(null);  // Pour stocker les programmes de l'utilisateur

  // Effectuer la récupération des données lorsque l'ID de l'utilisateur change
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = ref(database, 'users/' + userId);  // Référence à l'utilisateur dans Firebase
        const snapshot = await get(userRef);  // Récupérer les données de l'utilisateur
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserName(userData.name);  // Stocker le nom de l'utilisateur dans l'état
          setPrograms(userData.programs);  // Stocker les programmes dans l'état
        } else {
          console.log('Aucun utilisateur trouvé');
        }
      } catch (error) {
        console.error('Erreur de récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, [userId]);  // Déclenche la récupération des données lorsque l'ID de l'utilisateur change

  return (
    <div>
      {userName ? (
        <h1>Bonjour, {userName}!</h1>  // Afficher le nom de l'utilisateur
      ) : (
        <p>Chargement...</p>  // Afficher "Chargement..." jusqu'à ce que les données soient récupérées
      )}

      {programs ? (
        <div>
          <h2>Programmes de {userName}</h2>
          <p><strong>Haut du corps :</strong></p>
          {programs.upperBody?.exercises.map((exercise, index) => (
            <p key={index}>
              {exercise.name} - {exercise.repetitions} répétitions à {exercise.weight} kg
            </p>
          ))}

          <p><strong>Bas du corps :</strong></p>
          {programs.lowerBody?.exercises.map((exercise, index) => (
            <p key={index}>
              {exercise.name} - {exercise.repetitions} répétitions à {exercise.weight} kg
            </p>
          ))}

          <p><strong>Cardio :</strong></p>
          {programs.cardio?.exercises.map((exercise, index) => (
            <p key={index}>
              {exercise.name} - {exercise.duration}
            </p>
          ))}
        </div>
      ) : (
        <p>Chargement des programmes...</p>  // Afficher "Chargement des programmes..." jusqu'à ce que les programmes soient récupérés
      )}
    </div>
  );
};

export default UserProfilePage;