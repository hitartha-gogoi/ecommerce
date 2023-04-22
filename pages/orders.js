import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar"
import router from "next/router"
import { useRouter } from "next/router"
import { db, auth } from "../components/firebase"
import CheckAuthPopup from "../components/checkAuthPopup"
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs, doc, documentId, where, query, orderBy } from "firebase/firestore"


export default function Orders() {
  
  const [ orders, setOrders ] = useState([])
  const [ isLoggedIn, setLoggedIn ] = useState(true)
  
  async function getOrders(){
    let q = query(collection(db, "orders"),  orderBy("timestamp","desc"), where("user", "==", auth.currentUser.uid))
    let items = await getDocs(q)
    items.forEach((item) => {
      let newCart = { id: item.id, data: item.data() }
      setOrders(cart => [...cart, newCart ])
     })
  }
  
  const checkAuth = ()=>{
   onAuthStateChanged(auth, (client) => {
      if (client) {
      console.log(client)
      setLoggedIn(true)
      getOrders()
      } else {
        setLoggedIn(false)
        console.log("user is logged out", isLoggedIn)
      }
    })
 }
  
 useEffect(()=>{
   checkAuth();
 },[])
  
  return (
    <main className="text-black bg-gray-700 w-screen h-screen bg-gray-700">
  <Navbar />
  <CheckAuthPopup open={isLoggedIn} close={()=> setLoggedIn(true)} />
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
   {orders.map(item =>{
      return(
  <div className="flex flex-row justify-between h-18 w-full md:3/5 border-gray-700 border bg-white rounded-lg hover:scale-105 transition-all ease-in-out duration-150 shadow-md mb-2">
  {/* left box */}
  <div onClick={()=> router.push(`/product/${item.data.product}?category=${item.data.category}`)} className="flex h-18 w-96">
  <img src={item.data.photo} className="object-contain h-16 w-16 rounded-lg" />
  <div className="flex flex-col justify-center items-center ml-2 ">
  <span className="text-md text-left font-bold">{item.data.name}</span>
  <span className="text-sm text-left font-light">{item.data.status}</span>
  </div>
  </div>
  
  {/* right box */}
  <div className="flex flex-col justify-evenly items-center w-24">
  <span className="text-lg font-bold text-black">${item.data.total}</span>
  <div className="flex flex-row justify-evenly">
  <span className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150 mr-2">
  edit_square
  </span>
  <span className="text-lg font-bold text-black ml-2 mr-2">{item.data.quantity}</span>
  <span className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
download
</span>
  </div>
  </div>
  </div>
  )
   })}
  {/* order bar ends here */}
  
  </div>
  </div>
    </main>
  )
}
