// HomePage.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, get, set } from "firebase/database";
import { database } from "../firebase";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, "users/");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersArray = Object.keys(usersData).map((key) => ({
          id: key,
          name: usersData[key].name || "Nom non défini",
        }));
        setUsers(usersArray);
      } else {
        console.log("No data available");
      }
    };

    fetchData();
  }, []);

  // Fonction pour ajouter un nouvel utilisateur
  const handleAddUser = async (e) => {
    e.preventDefault();
    const newUserRef = ref(database, "users/" + new Date().getTime()); // Utilisation de l'heure comme ID unique
    await set(newUserRef, {
      name: newUser.name,
    });

    // Réinitialiser le formulaire après l'ajout
    setNewUser({
      name: "",
    });

    // Mettre à jour la liste des utilisateurs
    const dbRef = ref(database, "users/");
    const snapshot = await get(dbRef);
    const usersData = snapshot.val();
    const usersArray = Object.keys(usersData).map((key) => ({
      id: key,
      name: usersData[key].name || "Nom non défini",
    }));
    setUsers(usersArray);
  };

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Page d'Accueil</h1>
      
      {/* Formulaire pour ajouter un utilisateur */}
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Nom"
          required
        />
        <button type="submit">Ajouter un utilisateur</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;