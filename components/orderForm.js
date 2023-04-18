import { useState, useEffect, useRef } from "react"
import { db, auth, storage } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore"

export default function OrderForm({ modal, close, order }){
  if(!modal) return;
 
  const cat = useRef()
  const [ address, setAddress ] = useState("");
  const [ pincode, setPinCode ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState(0);
  let state = useRef();
  
  const submitForm = (e)=>{
    e.preventDefault();
    order(address,state.current.options[state.current.selectedIndex].text,pincode,phoneNumber)
    close();
  } 
  
  return(
          <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-brightness-50 z-50 flex justify-center items-center ">
           <div className="flex flex-col shadow-2xl bg-white h-4/5 md:h-4/5 w-80  rounded-2xl cursor-pointer shadow-indigo-500">
               <div className="flex flex-row justify-between items-center w-full">
               <span />
               <span className="material-symbols-outlined" onClick={close}>close</span>
               </div>
          <form onSubmit={submitForm} className="flex flex-col justify-center items-start px-4">
             
          <h3 className="text-black text-md font-semibold ml-2 mt-2">Your Address</h3>
          <input value={address} onChange={(e)=> setAddress(e.target.value)} className="text-gray-400 rounded shadow bg-gray-100 appearance-none text-md border border-gray-300 w-5/5 h-8 mx-2 focus:outline-none focus:shadow-outline focus:border-purple-500 leading-tight" />
          <h3 className="text-black text-md font-semibold m-2">Pin Code</h3>
          <input value={pincode} onChange={(e)=> setPinCode(e.target.value)} className="text-gray-400 rounded shadow bg-gray-100 appearance-none text-md border border-gray-300 w-5/5 h-8 mx-2 focus:outline-none focus:shadow-outline focus:border-purple-500 leading-tight"  />
          <h3 className="text-black text-md font-semibold m-2">Phone Number</h3>
          <input value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} className="text-gray-400 rounded shadow bg-gray-100 appearance-none text-md border border-gray-300 w-5/5 h-8 mx-2 focus:outline-none focus:shadow-outline focus:border-purple-500 leading-tight" />
        <h3 className="text-black text-md font-semibold m-2">State</h3>
        <select ref={state} className="text-lg text-black font-semibold rounded border-gray-300 border bg-gray-100 focus:border-purple-500 m-2">
          <option value="1">Assam </option>
          <option value="2">Maharashtra</option>
          <option value="3">Rajasthan </option>
        </select>
         <button type="submit" id="title" className="text-center h-8 w-4/5 my-4 bg-purple-700 text-white font-extrabold text-lg rounded flex justify-center items-center shadow-2xl self-center"> Order Now </button>
          </form>
          </div>
        </div>
    )
}