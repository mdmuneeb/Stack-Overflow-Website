import { auth, onAuthStateChanged, getDocs, doc, db, collection, storage, ref, getDownloadURL,getDoc } from "../FIREBASE/firebase.js";


const loginBtn = document.getElementById("loginButton");
const writeBlog = document.getElementById("CreateBlog"); 
let userName = document.getElementById("userName");
let useremail = document.getElementById("useremail");
let userverification = document.getElementById("userverification");
let showData = document.getElementById("showData");
let dataContent;
let imageContect;




let createBox = (title, desc, imageURL, authorName, date, type, titleUrl) =>
{
  let parentDivTag1 = document.createElement("div");
  let parentDivTag2 = document.createElement("div");
  let titleTag = document.createElement("h2");
  let descTag = document.createElement("p");
  let nameDivTag = document.createElement("div");
  let nameDivTagChild = document.createElement("div");
  let nameTag = document.createElement("h2");
  let dateTag = document.createElement("h2");
  let imageDivTag = document.createElement("div");
  let imageTag = document.createElement("img");
  let finalTag = document.createElement("div");
  let finalWalaTag = document.createElement("div");
  let spanTag = document.createElement("p");

  parentDivTag1.classList.add("flex", "justify-between"); 
  parentDivTag2.classList.add("flex-1");
  parentDivTag2.setAttribute("id", "dataHold")
  titleTag.classList.add("card-title", "font-bold");
  titleTag.setAttribute("id", "Htitle")
  descTag.classList.add("mt-5");
  nameDivTag.classList.add("flex", "justify-between", "mt-5", "relative", "h-16");
  nameDivTagChild.classList.add("flex", "absolute", "bottom-0");
  dateTag.classList.add("absolute", "bottom-0", "right-0");
  imageDivTag.classList.add("ml-12", "flex-2");
  finalTag.classList.add("card-body");
  finalTag.setAttribute("id", "allcard");
  imageTag.classList.add("w-60", "h-52", "mr-3");
  finalWalaTag.classList.add("card","w-5/6","bg-base-100", "shadow", "hover:shadow-lg", "cursor-pointer");
  spanTag.style.color = "#007FFF"



  titleTag.textContent = title;
  descTag.textContent = `${desc.slice(0, 350)}`;
  spanTag.textContent = ".....Read More";
  console.log(descTag.textContent);
  nameTag.textContent = authorName;
  dateTag.textContent = date;
  imageTag.src = imageURL;
  let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("fill", "none");
  svgElement.setAttribute("viewBox", "0 0 24 24");
  svgElement.setAttribute("stroke-width", "1.5");
  svgElement.setAttribute("stroke", "currentColor");
  svgElement.setAttribute("class", "w-6 h-6 mr-3");
  finalWalaTag.onclick = () =>
  {
    window.location.href = `./DisplayBlog/display.html?desc=${titleUrl}&type=${type}`;  //
  }

  let pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute("stroke-linecap", "round");
  pathElement.setAttribute("stroke-linejoin", "round");
  pathElement.setAttribute("d", "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z");


  svgElement.appendChild(pathElement);
  nameDivTagChild.appendChild(svgElement);
  nameDivTagChild.appendChild(nameTag);
  nameDivTag.appendChild(nameDivTagChild);
  nameDivTag.appendChild(dateTag);
  imageDivTag.appendChild(imageTag);
  parentDivTag2.appendChild(titleTag);
  descTag.appendChild(spanTag);
  parentDivTag2.appendChild(descTag);
  parentDivTag2.appendChild(nameDivTag);

  parentDivTag1.appendChild(parentDivTag2);
  parentDivTag1.appendChild(imageDivTag);

  finalTag.appendChild(parentDivTag1);
  finalWalaTag.appendChild(finalTag);

  showData.appendChild(finalWalaTag);
}




onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
        loginBtn.textContent = user.displayName
        
        if (user !== null) {
          userName.textContent =  "  Name: " + user.displayName
          useremail.textContent = "  Email: " + user.email;
          userverification.textContent = "  Email Verification: " + user.emailVerified;
        }
          


        
    } else {
      
        loginBtn.textContent = "Login";
        loginBtn.addEventListener("click", ()=>{window.location.href = "./login/index.html"});
    }
  });


  let getImage = async(title) =>
  {
    const starsRef = ref(storage, `users/${title}`);
    return await getDownloadURL(starsRef)
  }





let getDataFromFirestore = async() =>
{
  const querySnapshot1 = await getDocs(collection(db, "Bloggs"));
  querySnapshot1.forEach(async(doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, doc.data().Title);


    
    let image = await getImage(doc.id);
    // console.log(image);

    createBox(doc.data().Title, doc.data().Descrition, image, doc.data().authorName, doc.data().date, "Bloggs", doc.id);
  });
  const querySnapshot2 = await getDocs(collection(db, "Questions"));
  querySnapshot2.forEach( async(doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, doc.data().Descrition);


    let image = await getImage(doc.id);
    // console.log(image);
    createBox(doc.data().Title, doc.data().Descrition, image, doc.data().authorName, doc.data().date, "Questions", doc.id);

  });
}


getDataFromFirestore();


let searchBox = async() =>
{
  const searchInput = document.getElementById("searchInput").value.toUpperCase();
  // console.log(searchInput);
  // console.log(showData.value);
  let allcard = document.querySelectorAll("#allcard");

  allcard.forEach((val) =>
  {
    // let dataHold = val.querySelector("#dataHold");
    let headTag = val.querySelector("#Htitle").textContent.toUpperCase();
    // console.log(headTag);
    if(headTag.indexOf(searchInput) >-1)
    {
      val.style.display = ""
    }
    else
    {
      val.style.display = "none";
    }
  })

  // let headTag = allcard.getElementsTagName("h2")
  // console.log(headTag);

  // let headTag = dataHold.getElementsByTagName("h2");


  // if (searchInput !== "") {
    
  //   const docRef1 = doc(db, "Bloggs", searchInput);
  //   const docSnap1 = await getDoc(docRef1);

    // console.log(docSnap1.data());
    

  //   const docRef2 = doc(db, "Questions", searchInput);
  //   const docSnap2 = await getDoc(docRef2);
  // console.log(docSnap2.data());




  //   if (docSnap1.exists()) {
  //     dataContent = docSnap1.data();
  //     imageContect = await getImage(dataContent.Title);
      // console.log(dataContent);
      // console.log(imageContect);
  //   } else if (docSnap2.exists()) {
  //     dataContent = docSnap2.data();
  //     imageContect = await getImage(dataContent.Title);
      // console.log(dataContent);
      // console.log(imageContect);
  //   } else {
      // console.log("Document not found in either collection.");
  //   }

  
  //   if(dataContent)
  //   {
  //     showData.innerHTML =""
  //     createBox(dataContent.Title, dataContent.Descrition, imageContect, dataContent.authorName, dataContent.date)
  //   }
  // }
  // if (searchInput === "")
  // {
  //   await getDataFromFirestore();
  // }

  


  // // const filteredData1 = querySnapshot1.filter(doc => doc.data().Title.toLowerCase().startsWith(searchInput));
  // // const filteredData2 = querySnapshot2.filter(doc => doc.data().Descrition.toLowerCase().startsWith(searchInput));
  // showData.value = ""; // Clear previous results

  // // filteredData1.forEach(async (doc) => {
  // //     let image = await getImage(doc.data().Title);
  // //     createBox(doc.data().Title, doc.data().Descrition, image, doc.data().authorName, doc.data().date);
  // // });

  // // filteredData2.forEach(async (doc) => {
  // //     let image = await getImage(doc.data().Title);
  // //     createBox(doc.data().Title, doc.data().Descrition, image, doc.data().authorName, doc.data().date);
  // // });


}






writeBlog.addEventListener("click", () => {window.location.href = "./CreateBlog/Blog.html"})
searchInput.addEventListener("input", searchBox);










