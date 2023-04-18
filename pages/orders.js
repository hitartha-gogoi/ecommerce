import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar"
import { useRouter } from "next/router"
import { db, auth } from "../components/firebase"
import { collection, getDoc, getDocs, doc, documentId, where, query } from "firebase/firestore"


export default function Orders() {
  
  const [ orders, setOrders ] = useState([])
  
 useEffect(()=>{
   
 },[])
  
  return (
    <main className="text-black bg-gray-700 w-screen h-screen bg-gray-700">
  <Navbar />
    <div className="flex flex-col items-center w-full h-full">
  {/* cart header */}
  <div className="w-full h-12 text-lg font-bold text-white flex flex-row justify-center items-center p-2">
      <span className="material-symbols-outlined hover:scale-125 transition-all duration-150 ease-out">
        shopping_cart
      </span>
  <span>Orders </span>
  </div>
  
  
  {/* order container */}
  <div className="flex flex-col items-center h-4/5 w-full md:w-3/5 overflow-y-scroll border-gray-700 border p-2 rounded-lg bg-gray-200 mt-2">
  
  {/* cart bar */}
  <div className="flex flex-row justify-between h-18 w-full md:3/5 border-gray-700 border bg-white rounded-lg hover:scale-105 transition-all ease-in-out duration-150 shadow-md mb-2">
  {/* left box */}
  <div className="flex h-18 w-96">
  <img src="https://plus.unsplash.com/premium_photo-1668418188837-d40b734ed6d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWFyYnVkc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60" className="h-16 w-16 rounded-lg" />
  <div className="flex flex-col justify-center items-center ml-2 ">
  <span className="text-md text-left font-bold">Airpods pro</span>
  <span className="text-sm font-light">to be delivered on 24th October</span>
  </div>
  </div>
  
  {/* right box */}
  <div className="flex flex-col justify-evenly items-center w-24">
  <span className="text-lg font-bold text-black">$1500</span>
  <div className="flex flex-row justify-evenly">
  <span className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150 mr-2">
  edit_square
  </span>
  <span className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
download
</span>
  </div>
  </div>
  </div>
  {/* order bar ends here */}
  
  </div>
  </div>
    </main>
  )
}
