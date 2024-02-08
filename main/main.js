import { auth, onAuthStateChanged } from "../firebase.js";


const loginBtn = document.getElementById("loginButton");
const writeBlog = document.getElementById("CreateBlog"); 








onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
        loginBtn.textContent = user.email;
        
        
    } else {
        loginBtn.textContent = "Login";
        loginBtn.addEventListener("click", ()=>{window.location.href = "/login/login.html"});
    }
  });

writeBlog.addEventListener("click", () => {window.location.href = "/CreateBlog/Blog.html"})










