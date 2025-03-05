import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';

const UserProfilePage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState(null);
  const [programs, setPrograms] = useState(null); // Ajouter l'état pour stocker les programmes

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = ref(database, 'users/' + userId);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserName(snapshot.val().name);
          setPrograms(snapshot.val().programs); // Récupérer les programmes
        } else {
          console.log('Aucun utilisateur trouvé');
        }
      } catch (error) {
        console.error('Erreur de récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {userName ? (
        <div>
          <h1>Bonjour, {userName}!</h1>
          <h2>Programmes de {userName}</h2>
          {programs ? (
            <div>
              <ul>
                {/* Affichage des programmes comme liens cliquables */}
                {Object.keys(programs).map((programKey) => (
                  <li key={programKey}>
                    <Link to={`/user/${userId}/program/${programKey}`}>
                      {programs[programKey].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Chargement des programmes...</p>
          )}
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default UserProfilePage;