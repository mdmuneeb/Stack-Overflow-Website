import { auth, onAuthStateChanged, doc, db, getDoc, ref, storage, getDownloadURL } from "../firebase.js";



let header = document.getElementById("header");
let description = document.getElementById("description");
let imageURL = document.getElementById("imageURL");
let name = document.getElementById("name");
let Date= document.getElementById("Date");
let data;
let image;




let getImage = async(title) =>
{
  const starsRef = ref(storage, `users/${title}`);
  return await getDownloadURL(starsRef)
}

let url = new URLSearchParams(window.location.search);
let title = url.get("desc");
console.log(title);


const docRef1 = doc(db, "Bloggs", title);
const docSnap1 = await getDoc(docRef1);

// console.log(docSnap1.data());


const docRef2 = doc(db, "Questions", title);
const docSnap2 = await getDoc(docRef2);
// console.log(docSnap2.data());


if (docSnap1.exists()) {
  data = docSnap1.data();
  image = await getImage(data.Title);
  console.log(data);
  console.log(image);
} else if (docSnap2.exists()) {
  data = docSnap2.data();
  image = await getImage(data.Title);
  console.log(data);
  console.log(image);
} else {
  console.log("Document not found in either collection.");
}


if (data) {
  header.textContent = data.Title;
  description.textContent = data.Descrition;
  imageURL.src = image;
  name.textContent = data.authorName;
  Date.textContent = data.date;
}
else
{
  console.log(data);
}











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