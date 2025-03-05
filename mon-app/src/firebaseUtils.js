// createUser.js

import { ref, set } from "firebase/database";
import { database } from "./firebase";

// Fonction pour ajouter un utilisateur et ses programmes
const createUser = async (userName) => {
  const userId = new Date().getTime().toString(); // Utiliser un timestamp comme ID unique
  const newUserRef = ref(database, "users/" + userId);

  // Créer un nouvel utilisateur avec son nom et ses programmes par défaut
  await set(newUserRef, {
    name: userName,
    programs: {
      upperBody: {
        name: "Haut du corps",
        exercises: [
          { name: "Développé couché", repetitions: null, weight: null, goalWeight: null, duration: null },
          { name: "Tractions", repetitions: null, weight: null, goalWeight: null, duration: null },
          { name: "Développé militaire", repetitions: null, weight: null, goalWeight: null, duration: null },
        ],
      },
      lowerBody: {
        name: "Bas du corps",
        exercises: [
          { name: "Squat", repetitions: null, weight: null, goalWeight: null, duration: null },
          { name: "Fentes", repetitions: null, weight: null, goalWeight: null, duration: null },
          { name: "Leg curl", repetitions: null, weight: null, goalWeight: null, duration: null },
        ],
      },
      cardio: {
        name: "Cardio",
        exercises: [
          { name: "Running", repetitions: null, weight: null, goalWeight: null, duration: null },
          { name: "Vélo", repetitions: null, weight: null, goalWeight: null, duration: null },
          { name: "Rameur", repetitions: null, weight: null, goalWeight: null, duration: null },
        ],
      },
    },
  });
};

export default createUser;