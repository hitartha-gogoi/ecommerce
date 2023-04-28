import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar"
import Link from "next/link"
import router, { useRouter } from "next/router"
import{ onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../components/firebase"
import CheckAuthPopup from "../components/checkAuthPopup"
import { collection, getDoc, getDocs, doc, addDoc, documentId, where, query, updateDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { AiOutlineSend } from "react-icons/fa"
import  SendIcon from "@mui/icons-material/Send"
import SearchIcon from "@mui/icons-material/Search"

export default function Search(){
  
  const router = useRouter()
  
  const [ products, setProducts ] = useState([]);
  const [ isLoggedIn, setLoggedIn ] = useState(false)
  const [ searchTerm, setSearchTerm ] = useState("")
  
  
  const checkAuth = ()=>{
   onAuthStateChanged(auth, (client) => {
      if (client) {
      console.log(client)
      setLoggedIn(true)
      //firebaseFindProducts()
      } else {
        setLoggedIn(false)
        console.log("user is logged out", isLoggedIn)
      }
    })
 }
  
  async function searchProducts(e){
    e.preventDefault();
    let q = query(collection(db, "products"), where("seller", "==", auth.currentUser.uid))
    let items = await getDocs(q)
    items.forEach((item) => {
      let product = { id: item.id, data: item.data() }
      setProducts(products => [...products, product ])
     });
  }
  
  useEffect(()=>{
    checkAuth();
  },[])
  
  return(
    <main className="flex flex-col justify-start w-screen h-screen">
    <Navbar />
    <CheckAuthPopup open={isLoggedIn} close={()=> setLoggedIn(true)} />
    
    <div className="flex flex-col w-screen h-screen">
    
    {/* seach box */}
  <form onSubmit={searchProducts} className="flex justify-evenly items-center w-full mt-6 mb-6">
  <input className="bg-gray-50 black w-4/5 pl-10 sm:text-sm border-black  focus:border-white  rounded-md h-8" />
  <SearchIcon onClick={searchProducts} />
  </form>
  
  {/* results box container */}
    <div className="flex flex-col w-full h-full">
    {/* result box */}
    {products.map((item) =>{
      return(
    <div onClick={()=> router.push(`/product/${item.id}?category=${item.data.category}`)} className="flex flex-row h-40 border w-full md:w-full lg:w-full">
    
    <img src={item.data.photo} className="object-contain h-4/5 w-40 md:ml-40 md:mr-20 md:rounded-xl md:hover:scale-105 transition-all ease-in-out duration-150" />
    
    <div className="flex flex-col justify-start p-4">
    <div className="flex flex-col">
    <span className="text-left text-xl font-bold text-black whitespace-pre-line">{item.data.name}</span>
    <span className="text-left text-black font-bold text-lg">₹{item.data.discount} <span className="font-light line-through">₹{item.data.price}</span></span>
    </div>
      <p className="text-black text-sm font-light flex flex-col w-4/5 md:w-96 lg:w-96 h-18 overflow-y-scroll break-words"> {item.data.description} </p>
  {/*
  <div className="flex flex-row">
      <span className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
        share
      </span>
    </div>*/}
    </div>
    
    </div>
    )
    })} 
    </div> 
    </div>
    </main>
    )
}