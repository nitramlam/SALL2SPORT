import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';

const ProgramDetailPage = () => {
  const { userId, programKey } = useParams(); // Récupérer l'ID de l'utilisateur et la clé du programme
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const programRef = ref(database, `users/${userId}/programs/${programKey}`);
        const snapshot = await get(programRef);
        if (snapshot.exists()) {
          setProgram(snapshot.val()); // Récupérer les données du programme
        } else {
          console.log('Aucun programme trouvé');
        }
      } catch (error) {
        console.error('Erreur de récupération des données du programme:', error);
      }
    };

    fetchProgramData();
  }, [userId, programKey]);

  return (
    <div>
      {program ? (
        <div>
          <h1>{program.name}</h1>
          <ul>
            {/* Affichage des exercices du programme */}
            {program.exercises.map((exercise, index) => (
              <li key={index}>
                {exercise.name} - {exercise.repetitions ? `${exercise.repetitions} répétitions` : exercise.duration}
                {exercise.weight && ` - Poids: ${exercise.weight} kg`}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement des exercices...</p>
      )}
    </div>
  );
};

export default ProgramDetailPage;