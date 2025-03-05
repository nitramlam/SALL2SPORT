// UserProfilePage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database"; // Assure-toi d'importer ces éléments
import { database } from "../firebase"; // Assure-toi que le chemin est correct

const UserProfilePage = () => {
  const { username } = useParams(); // Obtient le paramètre de l'URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Cette fonction récupère les données spécifiques à un utilisateur depuis Firebase
    const fetchUserData = async () => {
      const dbRef = ref(database, `users/${username}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("No data available");
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div>
      <h1>Profile de {username}</h1>
      {userData ? (
        <div>
          <p>Nom: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Affiche d'autres informations de l'utilisateur */}
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default UserProfilePage;