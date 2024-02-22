import { auth, onAuthStateChanged, doc, db, getDoc, ref, storage, getDownloadURL, setDoc, updateDoc } from "../FIREBASE/firebase.js";



let header = document.getElementById("header");
let description = document.getElementById("description");
let imageURL = document.getElementById("imageURL");
let name = document.getElementById("name");
let Date= document.getElementById("Date");
let comment = document.getElementById("comment");
let commentSubmit = document.getElementById("commentSubmit");
const loginBtn = document.getElementById("loginButton");
const writeBlog = document.getElementById("CreateBlog"); 
let MainComment = document.getElementById("MainComment");
let commentName;
let data;
let image;



let getImage = async(Title) =>
{
  const starsRef = ref(storage, `users/${Title}`);
  return await getDownloadURL(starsRef)
}

let url = new URLSearchParams(window.location.search);
let url2 = new URLSearchParams(window.location.search);
let title = url.get("desc");
let btype = url2.get("type");
console.log(title);
console.log(btype);


const docRef1 = doc(db, "Bloggs", title);
const docSnap1 = await getDoc(docRef1);

// console.log(docSnap1.data());


const docRef2 = doc(db, "Questions", title);
const docSnap2 = await getDoc(docRef2);
// console.log(docSnap2.data());




if (docSnap1.exists()) {
  data = docSnap1.data();
  console.log(docSnap1.id);
  image = await getImage(docSnap1.id);
  console.log(data);
  console.log(image);
} else if (docSnap2.exists()) {
  data = docSnap2.data();
  console.log(data);
  image = await getImage(docSnap2.id);
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



let likeOrNot = async(userName, userComment) =>
{
  const docRef = doc(db, "Comment", `${btype}_${title}`);
  const dataComment = await getDoc(docRef);
  let Comments;
  if(dataComment.exists())
  {
    Comments = dataComment.data().comment
    Comments.forEach((val) =>
    {
      if(val.commentUser === userName && val.commentL === userComment)
      {
        val.liked = !val.liked
      }
    })
  }
  const washingtonRef = doc(db, "Comment", `${btype}_${title}`);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    comment: Comments
  });
  MainComment.innerHTML = ""
  realTimecomments();
}




const creatingCommmentSection = (userName, userComment, liked) =>
{
  let parentDivtag = document.createElement("div");
  let childDivtag1 = document.createElement("div");
  let spanTag = document.createElement("span");
  let imageTag = document.createElement("img");
  let childDivtag2 = document.createElement("div");
  let commentTag = document.createElement("p");
  // let svgTag = document.createElement("svg");

  parentDivtag.classList.add("mb-5")
  childDivtag1.classList.add("flex", "space-x-5");
  commentTag.classList.add("ml-12")
  spanTag.classList.add("font-bold");
  childDivtag2.classList.add("mt-7");
  imageTag.alt= "Single Neutral Circle Alternate icon - Free transparent PNG, SVG. No sign up needed.";
  imageTag.width = "34";
  imageTag.height = "34";
  imageTag.draggable = "false";
  imageTag.src = "https://assets.streamlinehq.com/image/private/w_30,h_30,ar_1/f_auto/v1/icons/natural-close-up-single-user-neutral/single-neutral-circle-alternate-h9vynhmruthdhznrgjqq9n.png/single-neutral-circle-alternate-okzlblv3g09ay7kkqjcuq.png?_a=DAJFJtWIZAAC";


  let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("style", `fill: ${liked?'black' : 'grey'}`);
  svgElement.setAttribute("viewBox", "0 0 1792 1792");
  svgElement.setAttribute("width", "40");
  svgElement.setAttribute("height", "40");
  svgElement.setAttribute("class", "mt-5");
  svgElement.setAttribute("id", "likeButton");
  svgElement.onclick = () =>
  {
    likeOrNot(userName, userComment);
  }


  let pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute("d", "M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z");

  svgElement.appendChild(pathElement);
  // childDivtag1.appendChild(<img alt="Single Neutral Circle Alternate icon - Free transparent PNG, SVG. No sign up needed." width="34" height="34" draggable="false" src="https://assets.streamlinehq.com/image/private/w_30,h_30,ar_1/f_auto/v1/icons/natural-close-up-single-user-neutral/single-neutral-circle-alternate-h9vynhmruthdhznrgjqq9n.png/single-neutral-circle-alternate-okzlblv3g09ay7kkqjcuq.png?_a=DAJFJtWIZAAC"></img>)
  childDivtag1.appendChild(imageTag);
  childDivtag1.appendChild(spanTag);
  childDivtag2.appendChild(commentTag);
  childDivtag2.appendChild(svgElement);
  // childDivtag2.appendChild(<svg style="fill: grey;" class="mt-5" height="40" viewBox="0 0 1792 1792" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z"/></svg>)

  parentDivtag.appendChild(childDivtag1);
  parentDivtag.appendChild(childDivtag2);

  spanTag.textContent = userName;
  commentTag.textContent = userComment;

  MainComment.appendChild(parentDivtag);
}





let realTimecomments = async() =>
{
  const docRef = doc(db, "Comment", `${btype}_${title}`);
  const dataComment = await getDoc(docRef);
  
  if(dataComment.exists())
  {
    let Comments = dataComment.data().comment 
    Comments.forEach(element => {
      console.log(element.commentL);
      console.log(element.commentUser);
      console.log(element.liked);
      creatingCommmentSection(element.commentUser, element.commentL, element.liked);
    });
  
  }
}
realTimecomments()




const addComment = async() =>
{
  console.log(comment.value);
  let obj = 
  {
    commentUser: commentName,
    commentL:comment.value, 
    liked: false
  }
  const docRef = doc(db, "Comment", `${btype}_${title}`);
  let dataComment = await getDoc(docRef);
  if (dataComment.exists())
  {
    let Comment = dataComment.data().comment || [];
    Comment.push(obj);
    console.log(Comment);
    const washingtonRef = doc(db, "Comment", `${btype}_${title}`);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      comment: Comment
    });
  }
  else
  {
    await setDoc(doc(db, "Comment", `${btype}_${title}`), {
      comment:[obj],
    });
    
  }
  MainComment.innerHTML = ""
  realTimecomments();
  comment.value = "";
  
}














onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
        loginBtn.textContent = user.displayName;
        commentName = user.displayName;
        
        if (user !== null) {
          userName.textContent =  "  Name: " + user.displayName
          useremail.textContent = "  Email: " + user.email;
          userverification.textContent = "  Email Verification: " + user.emailVerified;
        }
          


        
    } else {
        loginBtn.textContent = "Login";
        loginBtn.addEventListener("click", ()=>{window.location.href = "../login/login.html"});
    }
  });










commentSubmit.addEventListener("click", addComment);
writeBlog.addEventListener("click", () => {window.location.href = "../CreateBlog/Blog.html"});