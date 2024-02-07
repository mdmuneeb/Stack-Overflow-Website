import { auth, signInWithEmailAndPassword } from "../firebase.js";





const Loader = document.getElementById("Loader");
const main = document.getElementById("main");
const registerBtn = document.getElementById("registerButton");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginButton"); 
Loader.style.display = "None";




const loader = () =>
{
    main.style.display = "none";
    Loader.style.display = "flex";
    setTimeout(() =>
    {
        window.location = "/register/register.html";
    }, 2000);
}


const Login = (event) =>
{
    event.preventDefault();
    if (email.value !== "" && password.value !== "")
    {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            window.location.href = "/main/main.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error", errorMessage);
        });
    }
    else
    {
        alert("Enter the required paramters");
    }
}

registerBtn.addEventListener("click", loader);
loginBtn.addEventListener("click", Login);