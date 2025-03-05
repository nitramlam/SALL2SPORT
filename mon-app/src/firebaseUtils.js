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
          { name: "Développé couché", repetitions: 12, weight: 50 },
          { name: "Tractions", repetitions: 10, weight: 0 },
          { name: "Développé militaire", repetitions: 12, weight: 30 },
        ],
      },
      lowerBody: {
        name: "Bas du corps",
        exercises: [
          { name: "Squat", repetitions: 12, weight: 60 },
          { name: "Fentes", repetitions: 12, weight: 20 },
          { name: "Leg curl", repetitions: 12, weight: 25 },
        ],
      },
      cardio: {
        name: "Cardio",
        exercises: [
          { name: "Running", duration: "30 min" },
          { name: "Vélo", duration: "30 min" },
          { name: "Rameur", duration: "20 min" },
        ],
      },
    },
  });
};

export default createUser;