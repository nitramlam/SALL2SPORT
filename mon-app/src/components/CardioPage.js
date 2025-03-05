// CardioPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get, update } from 'firebase/database';
import { database } from '../firebase';

const CardioPage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState(null);
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const userRef = ref(database, 'users/' + userId);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserName(userData.name);
          setExercises(userData.programs.cardio.exercises);
        }
      } catch (error) {
        console.error('Erreur de récupération des données:', error);
      }
    };
    fetchProgramData();
  }, [userId]);

  const handleChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);

    const userRef = ref(database, 'users/' + userId);
    update(userRef, {
      ['programs/cardio/exercises/' + index + '/' + field]: value,
    });
  };

  const handleIncrement = (index, field) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = updatedExercises[index][field] ? updatedExercises[index][field] + 1 : 1;
    setExercises(updatedExercises);

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

      const userRef = ref(database, 'users/' + userId);
      update(userRef, {
        ['programs/cardio/exercises/' + index + '/' + field]: updatedExercises[index][field],
      });
    }
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Chargement des exercices...</p>
      )}
    </div>
  );
};

export default CardioPage;