import { auth, onAuthStateChanged } from "../firebase.js";








const loginBtn = document.getElementById("loginButton");
const writeBlog = document.getElementById("CreateBlog"); 









onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
        loginBtn.textContent = user.displayName;
        
        if (user !== null) {
          userName.textContent =  "  Name: " + user.displayName
          useremail.textContent = "  Email: " + user.email;
          userverification.textContent = "  Email Verification: " + user.emailVerified;
        }
          


        
    } else {
        loginBtn.textContent = "Login";
        loginBtn.addEventListener("click", ()=>{window.location.href = "/login/login.html"});
    }
  });











writeBlog.addEventListener("click", () => {window.location.href = "/CreateBlog/Blog.html"})