// firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDeOXmNFQTZyT4Lh-qsCrld2FeiBQUTgpA",
  authDomain: "salle-c5e02.firebaseapp.com",
  databaseURL: "https://salle-c5e02-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "salle-c5e02",
  storageBucket: "salle-c5e02.firebasestorage.app",
  messagingSenderId: "770935296880",
  appId: "1:770935296880:web:15da9739667af3f85475b5",
  measurementId: "G-TK4HCP2ZBH"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser la base de données
const database = getDatabase(app);

// Exporter les fonctions nécessaires
export { database, ref, set, get };