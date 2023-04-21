import router from "next/link"
import { useState, useEffect, useRef } from "react"

export default function BecomeSellerModal({ modal, close }){
  if(!modal) return;
 
 
  const submitForm = (e)=>{
    e.preventDefault();
    router.push(`/seller?id=1`);
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
            
         <button type="submit" id="title" className="text-center h-8 w-4/5 my-4 bg-purple-700 text-white font-extrabold text-lg rounded flex justify-center items-center shadow-2xl self-center hover:scale-105 transition-all ease-in-out duration-150"> Become a seller </button>
          </form>
          </div>
        </div>
    )
}