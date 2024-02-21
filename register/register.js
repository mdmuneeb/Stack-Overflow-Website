import { auth, createUserWithEmailAndPassword, sendEmailVerification, uploadBytes, ref, getStorage, getDownloadURL, onAuthStateChanged, updateProfile} from "../FIREBASE/firebase.js";





const storage = getStorage();
const Loader = document.getElementById("Loader");
const main = document.getElementById("main");
const loginBtn = document.getElementById("loginButton");
const registerBtn = document.getElementById("registerButton")
const email = document.getElementById("email");
const password = document.getElementById("password");
const name = document.getElementById("name");
// const imageInput = document.getElementById("imageInput");

Loader.style.display = "None";


const loader = () =>
{
    main.style.display = "none";
    Loader.style.display = "flex";
    setTimeout(() =>
    {
        window.location = "/index.html";
    }, 2000);
}


// const storageRef = ref(storage, `users/${email.value}`);



// getDownloadURL(ref(storage, imageUrl))
// .then((url) => {
//     // updateProfile(auth.currentUser, {
    //     displayName: name.value, photoURL: url
    // }).then(() => {
    //     console.log("Profile Updated!!!");
    // }).catch((error) => {
    //     console.log("Error Profile", error);
    // });
    // console.log(url);
    // })




const register = (event) =>
{
    event.preventDefault();
    console.log(name.value);

    if (email.value !== "" && password.value !== "" )
    {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);





          updateProfile(auth.currentUser, {
            displayName: name.value
          }).then(() => {
            console.log("Profile Updated !!!!");
          }).catch((error) => {
            console.log("Error Update", error);
          });





        //   updateProfile(auth.currentUser, {
        //     displayName: name.value
        //     }).then(() => {
        //         console.log("Profile Updated!!!");
        //     }).catch((error) => {
        //         console.log("Error Profile", error);
        //     });
        //     })

        //   const storageRef = ref(storage, `users/${email.value}`);
            
        //   uploadBytes(storageRef, imageInput.files[0]).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        //     console.log(`users/${email.value}`, imageInput.files[0]);
        
        //     getDownloadURL(ref(storage, `users/${email.value}`))
        //     .then((url) => {
        //         updateProfile(auth.currentUser, {
        //             displayName: name.value, photoURL: url
        //         }).then(() => {
        //             console.log("Profile Updated!!!");
        //         }).catch((error) => {
        //             console.log("Error Profile", error);
        //         });
        //         })

        //   });

          
          



        sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Email is sent plz verify");
          window.location = "https://mail.google.com"
        });
      

          
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

let checking = () =>
{
    onAuthStateChanged(auth, (user) => {
        if (user.emailVerified) {
          const uid = user.uid;
          window.location.href = "/login/index.html"
        } else {
          console.log("Email not verified");
        }
      });
}

checking();  



loginBtn.addEventListener("click", loader);
registerBtn.addEventListener("click", register);