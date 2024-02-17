import {auth, signOut, setDoc, doc, db, ref, uploadBytes, storage, onAuthStateChanged } from "../firebase.js";



const logoutBtn = document.getElementById("logoutButton");
const Title = document.getElementById("title");
const selectLanguage = document.getElementById("selectLanguage");
const description = document.getElementById("description");
const saveButton = document.getElementById("saveButton");
const imageInput = document.getElementById("imageInput");
let name;


let checking = () =>
{
    onAuthStateChanged(auth, (user) => {
        if (user.emailVerified) {
          const uid = user.uid;
          name = user.displayName;

          console.log(name);
        } else {
          console.log("Email not verified");
        }
      });
}

checking();








const createBlog = async() =>
{
  let typeRadio = document.querySelector("input[name=blogRadio]:checked");
  let statusRadio = document.querySelector("input[name=radio-7]:checked");

  console.log(name);
  console.log(Title.value);
  console.log(selectLanguage.value);
  console.log(typeRadio.value);
  console.log(statusRadio.value);
  console.log(description.value);
  console.log(imageInput.files[0]);
  if(Title.value != "" && selectLanguage.value != "" && typeRadio.value != "" && statusRadio.value != "" && description.value !="" && imageInput.files[0])
  {
    let uploadDate = new Date();
    console.log(`${uploadDate.toLocaleDateString('en-US', { month: 'long' })} ${uploadDate.getDate()}, ${uploadDate.getFullYear()}`);

    if (typeRadio.value === "Blog")
    {
      console.log("Blog is running");
      await setDoc(doc(db, "Bloggs", `${Title.value}`), {
        Title: Title.value,
        Langugae: selectLanguage.value,
        Status: statusRadio.value,
        Descrition: description.value,
        authorName: name,
        date: uploadDate
      });
    }
    else if (typeRadio.value === "Question")
    {
      console.log("Questions is running");
      await setDoc(doc(db, "Questions", `${Title.value}`), {
        Title: Title.value,
        Langugae: selectLanguage.value,
        Status: statusRadio.value,
        Descrition: description.value,
        authorName: name,
        date: uploadDate
      });      
    }



    const storageRef = ref(storage, `users/${Title.value}`);

    uploadBytes(storageRef, imageInput.files[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    
  }


}


saveButton.addEventListener("click", createBlog);



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