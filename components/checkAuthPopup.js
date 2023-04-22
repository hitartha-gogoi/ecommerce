import { useState, useEffect, useRef } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signOut } from "firebase/auth";
import { db, auth } from "./firebase"
import { getDocs, collection, query, where, doc, setDoc } from "firebase/firestore";
import router from "next/router"
import { XIcon } from "@heroicons/react/outline"

export default function CheckAuthPopup({ open, close }){
  
  if(open) return;
  
  async function googleAuth(){
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then(result =>{
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const client = result.user;
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
      close();
    }).catch(error =>{
      console.log(error);
    })
  }
  
  return(
     <div className=" fixed top-0 left-0 right-0 bottom-0 backdrop-brightness-50 z-50 flex justify-center items-center">
  <div className="z-10 flex flex-col justify-start items-center bg-white w-72 h-96 rounded-md">
      <button className="flex  flex-row justify-center items-center text-white text-center font-bold bg-black h-10 w-60 mt-2 rounded-lg border-gray-700 border hover:scale-105 transition-all ease-in-out duration-150" onClick={googleAuth}>
      <span className="material-symbols-outlined">logout</span> Sign In using Google </button>
  </div>
</div>
)
}