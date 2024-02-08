import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,onAuthStateChanged, signInWithPopup, signOut    } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'


const firebaseConfig = {
    apiKey: "AIzaSyBCHMGPvvTRIIBBSjKwuFP3rhKtqgLiGAk",
    authDomain: "stack-overflow-7757c.firebaseapp.com",
    projectId: "stack-overflow-7757c",
    storageBucket: "stack-overflow-7757c.appspot.com",
    messagingSenderId: "3524755883",
    appId: "1:3524755883:web:d0c1f40ddffdbbbd2892ee",
    measurementId: "G-TJHPQB5DC9"
};
  


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider 


export
{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    provider,
    signInWithPopup,
    signOut
}