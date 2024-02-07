import { auth, createUserWithEmailAndPassword } from "../firebase.js";







const Loader = document.getElementById("Loader");
const main = document.getElementById("main");
const loginBtn = document.getElementById("loginButton");
const registerBtn = document.getElementById("registerButton")
const email = document.getElementById("email");
const password = document.getElementById("password");

Loader.style.display = "None";




const loader = () =>
{
    main.style.display = "none";
    Loader.style.display = "flex";
    setTimeout(() =>
    {
        window.location = "/login/login.html";
    }, 2000);
}




const register = (event) =>
{
    event.preventDefault();
    if (email.value !== "" && password.value !== "" )
    {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);
          window.location.href = "/login/login.html"
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error",errorMessage);
        });  
    }
    else
    {
        alert("Plz fill the required paramters");
    }
}



loginBtn.addEventListener("click", loader);
registerBtn.addEventListener("click", register);