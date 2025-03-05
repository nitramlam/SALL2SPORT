import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';  // Assure-toi que le chemin vers le fichier firebase.js est correct

const UserProfilePage = () => {
  const { userId } = useParams();  // Récupérer l'ID de l'utilisateur depuis l'URL
  const [userName, setUserName] = useState(null);  // Variable d'état pour stocker le nom de l'utilisateur

  // Effectuer la récupération des données lorsque l'ID de l'utilisateur change
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = ref(database, 'users/' + userId);  // Référence à l'utilisateur dans Firebase
        const snapshot = await get(userRef);  // Récupérer les données de l'utilisateur
        if (snapshot.exists()) {
          setUserName(snapshot.val().name);  // Stocker le nom de l'utilisateur dans l'état
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
        <h1>Bonjour, {userName}!</h1>  
      ) : (
        <p>Chargement...</p> 
      )}
    </div>
  );
};

export default UserProfilePage;