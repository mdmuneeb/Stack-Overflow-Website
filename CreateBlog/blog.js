import {auth, signOut } from "../firebase.js";


const logoutBtn = document.getElementById("logoutButton");



const logout = () =>
{
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "/login/login.html";
      }).catch((error) => {
        // An error happened.
        console.log("Error", error);
      });    
} 


logoutBtn.addEventListener("click", logout);