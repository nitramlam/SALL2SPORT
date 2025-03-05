import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, get, remove } from "firebase/database"; // On importe `remove` pour supprimer l'utilisateur
import { database } from "../firebase"; // Assure-toi que ce chemin est correct et que tu importes bien `database`
import createUser from "../firebaseUtils"; // Importation de la fonction `createUser` si nécessaire

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
  });

  // Récupérer les utilisateurs de la base de données
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, "users/"); // Utilisation de `ref` et `database`
      const snapshot = await get(dbRef); // Utilisation de `get` pour récupérer les données
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersArray = Object.keys(usersData).map((key) => ({
          id: key,
          name: usersData[key].name || "Nom non défini",
        }));
        setUsers(usersArray);
      } else {
        console.log("No data available");
        setUsers([]); // Assurer que users est un tableau vide si aucune donnée n'est trouvée
      }
    };

    fetchData();
  }, []);

  // Ajouter un nouvel utilisateur
  const handleAddUser = async (e) => {
    e.preventDefault();
    await createUser(newUser.name);

    setNewUser({
      name: "",
    });

    // Mettre à jour la liste des utilisateurs
    const dbRef = ref(database, "users/");
    const snapshot = await get(dbRef);
    const usersData = snapshot.val();
    const usersArray = usersData
      ? Object.keys(usersData).map((key) => ({
          id: key,
          name: usersData[key].name || "Nom non défini",
        }))
      : [];
    setUsers(usersArray);
  };

  // Supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    const userRef = ref(database, "users/" + userId);
    await remove(userRef); // Suppression de l'utilisateur de Firebase

    // Mettre à jour la liste des utilisateurs après suppression
    const dbRef = ref(database, "users/");
    const snapshot = await get(dbRef);
    const usersData = snapshot.val();
    const usersArray = usersData
      ? Object.keys(usersData).map((key) => ({
          id: key,
          name: usersData[key].name || "Nom non défini",
        }))
      : [];
    setUsers(usersArray);
  };

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
      {users.length === 0 ? (
        <p>Aucun utilisateur disponible.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
              <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button> {/* Bouton pour supprimer */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;