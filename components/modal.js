import { useState, useEffect, useRef } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signOut } from "firebase/auth";
import { db, auth } from "./firebase"
import { getDocs, collection, query, where, doc, setDoc, documentId } from "firebase/firestore";
import router from "next/router"
import { XIcon } from "@heroicons/react/outline"

export default function Modal({ open, close }){
  
  if(!open) return;
  
  const [ isLoggedIn, setLoggedIn ] = useState(false)
  const [ seller, setSeller ] = useState(null)
  const [ user, setUser ] = useState({})
  
  async function getUser(){
    let q = query(collection(db,"users"), where("id", "==", auth.currentUser.uid));
    let docSnap = await getDocs(q);
    docSnap.forEach(client =>{
      setSeller(client.data().type === "seller")
    })
  }
  
 const checkAuth = ()=>{
   onAuthStateChanged(auth, (client) => {
      if (client) {
    //  console.log(client)
      let username = client.displayName;
      let pfp = client.photoURL;
      let email = client.email;
      getUser();
      setUser(client);
      setLoggedIn(true)
      } else {
        setUser({})
        setLoggedIn(false)
     //   console.log("user is logged out")
        }
    })
 }
  
  useEffect(()=>{
    checkAuth();
  }, [])
  
  
  
  async function googleAuth(){
   
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then(result =>{
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const client = result.user;
      setUser(client);
      setDoc(doc(db, "users", client.uid), { 
        id: client.uid,
        pfp: client.photoURL,
        username: client.displayName,
        email: client.email,
        type: "buyer"
      }, { merge: true })
      .then(res => console.log(res))
      .catch(err => console.log(err));
      checkAuth();
    }).catch(error =>{
      console.log(error);
    })
  }
  
  const logout = ()=>{
    signOut(auth).then(() => {
      setUser({})
      checkAuth();
   //   console.log("Signout Successful")
    })
    .catch((error) => {
      console.log(error)
    });
  }

  return(
     <div className=" fixed top-0 left-0 right-0 bottom-0 backdrop-brightness-50 z-50 flex justify-center items-center">
  
  <div className="z-10 flex flex-col justify-start items-center bg-white w-72 h-96 rounded-md">
    <div className="flex flex-row justify-between items-center w-full">
    <span />
    <span className="material-symbols-outlined" onClick={close}>close</span>
    </div>
    {isLoggedIn ? <>
    <img className="h-20 w-20 rounded-full" src={user.photoURL}/>
    <span id="username-span" className="font-bold text-lg mt-2">{user.displayName}</span> </> : <span />
    }
    <button className="flex flex-row justify-center items-center  text-white text-center font-bold bg-black h-10 w-60 mt-2 rounded-lg border-gray-700 border hover:scale-105 transition-all ease-in-out duration-150"><span className="material-symbols-outlined">settings</span> Settings</button>
    <button className="flex flex-row justify-center items-center text-white text-center font-bold bg-black h-10 w-60 mt-2 rounded-lg border-gray-700 border hover:scale-105 transition-all ease-in-out duration-150">
      <span className="material-symbols-outlined">article</span> Privacy & Policy</button>
    <button className="flex flex-row justify-center items-center text-white text-center font-bold bg-black h-10 w-60 mt-2 rounded-lg border-gray-700 border hover:scale-105 transition-all ease-in-out duration-150">
      <span className="material-symbols-outlined">support_agent</span> Help & Support</button>
      
      {isLoggedIn ? <>
    <button className="flex  flex-row justify-center items-center text-white text-center font-bold bg-black h-10 w-60 mt-2 rounded-lg border-gray-700 border hover:scale-105 transition-all ease-in-out duration-150" onClick={logout}>
      <span className="material-symbols-outlined">logout</span> Logout </button> </>
      : <>
      <button className="flex  flex-row justify-center items-center text-white text-center font-bold bg-black h-10 w-60 mt-2 rounded-lg border-gray-700 border hover:scale-105 transition-all ease-in-out duration-150" onClick={googleAuth}>
      <span className="material-symbols-outlined">logout</span> Sign In using Google </button>
      </>
      }
      {loggedIn ?
      {!seller ?
      <button onClick={()=> router.push("/bio")} className="flex flex-row justify-center items-center text-white text-center font-bold bg-black h-10 w-60 mt-2 rounded-lg border-gray-700 border hover:scale-105 transition-all ease-in-out duration-150">
      <span  className="material-symbols-outlined">support_agent</span> Become a seller </button>
      :
      <button onClick={()=> router.push("/seller?id=1")} className="flex flex-row justify-center items-center text-white text-center font-bold bg-black h-10 w-60 mt-2 rounded-lg border-gray-700 border hover:scale-105 transition-all ease-in-out duration-150">
      <span  className="material-symbols-outlined">support_agent</span> Seller's dashboard </button>
      } :
      <span />
      }
  </div>  
  
</div>
)
}