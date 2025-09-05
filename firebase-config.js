import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Configuração do Firebase - substitua pelos seus dados
const firebaseConfig = {    
  apiKey: "AIzaSyA8r3dqTIHm6HeHlrBBoCtz-boNNsxgCog",
  authDomain: "quadralivre-3eb9a.firebaseapp.com",
  projectId: "quadralivre-3eb9a",
  storageBucket: "quadralivre-3eb9a.firebasestorage.app",
  messagingSenderId: "469319251737",
  appId: "1:469319251737:web:2534fd75745337d2363788"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
