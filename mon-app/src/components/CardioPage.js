import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get, update, remove } from 'firebase/database';
import { database } from '../firebase';

const CardioPage = () => {
  const { userId } = useParams();  // Récupérer l'ID de l'utilisateur depuis l'URL
  const [userName, setUserName] = useState(null);  // Variable d'état pour stocker le nom de l'utilisateur
  const [exercises, setExercises] = useState(null);  // Variable d'état pour stocker les exercices du programme cardio

  // Effectuer la récupération des données lorsque l'ID de l'utilisateur change
  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const userRef = ref(database, 'users/' + userId);  // Référence à l'utilisateur dans Firebase
        const snapshot = await get(userRef);  // Récupérer les données de l'utilisateur
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserName(userData.name);  // Stocker le nom de l'utilisateur
          setExercises(userData.programs.cardio.exercises); // Stocker les exercices du cardio
        }
      } catch (error) {
        console.error('Erreur de récupération des données:', error);
      }
    };

    fetchProgramData();
  }, [userId]);  // Déclenche la récupération des données lorsque l'ID de l'utilisateur change

  const handleChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);

    // Mettre à jour les données dans Firebase
    const userRef = ref(database, 'users/' + userId);
    update(userRef, {
      ['programs/cardio/exercises/' + index + '/' + field]: value,
    });
  };

  const handleIncrement = (index, field) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = updatedExercises[index][field] ? updatedExercises[index][field] + 1 : 1;
    setExercises(updatedExercises);

    // Mettre à jour les données dans Firebase
    const userRef = ref(database, 'users/' + userId);
    update(userRef, {
      ['programs/cardio/exercises/' + index + '/' + field]: updatedExercises[index][field],
    });
  };

  const handleDecrement = (index, field) => {
    const updatedExercises = [...exercises];
    if (updatedExercises[index][field] > 0) {
      updatedExercises[index][field] -= 1;
      setExercises(updatedExercises);

      // Mettre à jour les données dans Firebase
      const userRef = ref(database, 'users/' + userId);
      update(userRef, {
        ['programs/cardio/exercises/' + index + '/' + field]: updatedExercises[index][field],
      });
    }
  };

  // Fonction pour ajouter un nouvel exercice
  const addExercise = () => {
    const newExercise = {
      name: '',
      repetitions: 0,
      weight: 0,
      goalWeight: 0,
      duration: 0,
    };
    const updatedExercises = [...exercises, newExercise];
    setExercises(updatedExercises);

    // Mettre à jour Firebase avec le nouvel exercice
    const userRef = ref(database, 'users/' + userId);
    update(userRef, {
      'programs/cardio/exercises': updatedExercises,
    });
  };

  // Fonction pour supprimer un exercice
  const removeExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);

    // Mettre à jour Firebase après suppression de l'exercice
    const userRef = ref(database, 'users/' + userId);
    update(userRef, {
      'programs/cardio/exercises': updatedExercises,
    });
  };

  return (
    <div>
      {userName ? <h1>Bonjour, {userName}!</h1> : <p>Chargement...</p>}
      {exercises ? (
        <div>
          <h2>Exercices Cardio :</h2>
          <table>
            <thead>
              <tr>
                <th>Nom de l'exercice</th>
                <th>Répétitions</th>
                <th>Poids (kg)</th>
                <th>Objectif Poids (kg)</th>
                <th>Durée (sec)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={exercise.name || ''}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      placeholder="Nom de l'exercice"
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDecrement(index, 'repetitions')}>-</button>
                    <input
                      type="number"
                      value={exercise.repetitions || ''}
                      onChange={(e) => handleChange(index, 'repetitions', e.target.value)}
                      placeholder="Non spécifié"
                    />
                    <button onClick={() => handleIncrement(index, 'repetitions')}>+</button>
                  </td>
                  <td>
                    <button onClick={() => handleDecrement(index, 'weight')}>-</button>
                    <input
                      type="number"
                      value={exercise.weight || ''}
                      onChange={(e) => handleChange(index, 'weight', e.target.value)}
                      placeholder="Non spécifié"
                    />
                    <button onClick={() => handleIncrement(index, 'weight')}>+</button>
                  </td>
                  <td>
                    <button onClick={() => handleDecrement(index, 'goalWeight')}>-</button>
                    <input
                      type="number"
                      value={exercise.goalWeight || ''}
                      onChange={(e) => handleChange(index, 'goalWeight', e.target.value)}
                      placeholder="Non spécifié"
                    />
                    <button onClick={() => handleIncrement(index, 'goalWeight')}>+</button>
                  </td>
                  <td>
                    <button onClick={() => handleDecrement(index, 'duration')}>-</button>
                    <input
                      type="number"
                      value={exercise.duration || ''}
                      onChange={(e) => handleChange(index, 'duration', e.target.value)}
                      placeholder="Non spécifié"
                    />
                    <button onClick={() => handleIncrement(index, 'duration')}>+</button>
                  </td>
                  <td>
                    <button onClick={() => removeExercise(index)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addExercise}>Ajouter un exercice</button>
        </div>
      ) : (
        <p>Chargement des exercices...</p>
      )}
    </div>
  );
};

export default CardioPage;