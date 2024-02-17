import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import { getFirestore, doc, setDoc, getDocs, collection, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,onAuthStateChanged, signInWithPopup, signOut, sendEmailVerification, updateProfile } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'


const firebaseConfig = {
    apiKey: "AIzaSyBQs7Cz7zC6tCkeRe0idQQNLwRK-G5AU_M",
    authDomain: "stack-overflow-fc881.firebaseapp.com",
    projectId: "stack-overflow-fc881",
    storageBucket: "stack-overflow-fc881.appspot.com",
    messagingSenderId: "896999205306",
    appId: "1:896999205306:web:0459254dda55b7f6d09583",
    measurementId: "G-K2FMY20L3K"
  };
  
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider;
const db = getFirestore(app);
const storage = getStorage();


export
{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    provider,
    signInWithPopup,
    signOut,
    sendEmailVerification,
    doc,
    setDoc,
    updateProfile,
    uploadBytes,
    ref,
    getStorage,
    getDownloadURL,
    getFirestore,
    app,
    db,
    storage,
    getDocs,
    collection,
    getDoc

}