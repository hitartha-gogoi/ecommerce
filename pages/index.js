import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Inter } from 'next/font/google'
import Navbar from "../components/navbar"
import { db, auth } from "../components/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where, limit } from "firebase/firestore"

export default function Home(){
  
  const [ open, setOpen ] = useState(false)
  const [ products, setProducts ] = useState([])
  const [ books, setBooks ] = useState([])
  const [ earbuds, setEarbuds ] = useState([])
  const [ laptops, setLaptops ] = useState([])
  
  async function firebaseFindProducts(category){
    
    let q = query(collection(db, "products"), where("category", "==", category), limit(4))
    let items = await getDocs(q)
    
    switch(category){
      case "Electronics":
        items.forEach((item) => {
          let product = { id: item.id, data: item.data() }
          setProducts(products => [...products, product ])
          })
     break;
      
      case "Books":
        items.forEach((item) => {
          let product = { id: item.id, data: item.data() }
          setBooks(products => [...products, product ])
        })
      break;
      
      case "Earbuds":
       items.forEach((item) => {
         let product = { id: item.id, data: item.data() }
         setEarbuds(products => [...products, product ])
       });
      break;
      
      case "Laptops":
        items.forEach((item) => {
          let product = { id: item.id, data: item.data() }
          setLaptops(products => [...products, product ])
        })
        break;
    }
  }
  
useEffect(()=>{
    firebaseFindProducts("Electronics");
    firebaseFindProducts("Books");
    firebaseFindProducts("Earbuds");
    firebaseFindProducts("Laptops");
},[])
  
  return (
    <main className="bg-white w-screen h-screen text-black">
     <Navbar />
      {/* banner */}
      <div className="flex justify-center items-center w-full">
      <div className="flex flex-row justify-evenly items-stretch ml-2 mr-2 mt-2 bg-[url('https://plus.unsplash.com/premium_photo-1668418188837-d40b734ed6d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWFyYnVkc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60')] bg-cover bg-center bg-no-repeat h-44 w-84 md:w-4/5 rounded-lg self-center">
      <div className="flex flex-col self-end justify-left">
      <span className="text-left font-bold">Now Airpods are even more cheaper at 90% discount</span>
      <span className="text-left font-light text-xs">Now Airpods are even more cheaper at 90% discount </span>
      </div>
      </div>
      </div>
      {/* boxes container */}
      <div className="flex flex-row flex-wrap justify-center items-center">
      {/* box container */}
      <div className="flex flex-col justify-evenly p-2 m-6 bg-gray-200 h-84 w-84 md:w-96 rounded-xl">
      <span className="text-left text-xl font-bold">Electronics</span>
      <div className="flex flex-row justify-evenly items-center flex-wrap p-2">
      {/* smaller box */}
      {products.map(item =>{
      return(
      <Link href={`/product/${item.id}?category=${item.data.category}`}>
      <div className="flex flex-col justify-evenly items-center m-2 hover:scale-125 transition-all duration-150 ease-out">
      <img className="bg-white object-contain h-28 w-28 rounded-lg border border-black" src={item.data.photo} />
      <span id="rubik" className="text-lg font-bold">{item.data.name}</span>
      <span className="text-sm font-bold text-left">${item.data.price}<span className="line-through text-sm font-light">${item.data.discount}</span></span>
      </div>
      </Link>
      )
      })} 
      </div>
      </div>
      
     {/* box container */}
      <div className="flex flex-col justify-evenly p-2 m-4 bg-gray-200 h-84 w-84 md:w-96 rounded-xl">
      <span className="text-left text-xl font-bold">Books</span>
      <div className="flex flex-row justify-evenly items-center flex-wrap p-2">
      {/* smaller box */}
      {books.map(item =>{
      return(
      <Link href={`/product/${item.id}?category=${item.data.category}`}>
      <div  className="flex flex-col justify-evenly items-center m-2 w-32 hover:scale-125 transition-all duration-150 ease-out">
      <img className="bg-white object-contain h-28 w-28 rounded-lg border border-black" src={item.data.photo} />
      <span id="rubik" className=" text-lg font-bold">{item.data.name}</span>
      <span className="text-sm font-bold text-left">${item.data.price}<span className="line-through text-sm font-light">${item.data.discount}</span></span>
      </div>
      </Link>
      )
      })} 
      </div>
      </div>
      {/* smaller box */}
      {/* box container */}
      <div className="flex flex-col justify-evenly m-6 bg-gray-200 h-84 w-84 md:w-96 rounded-xl">
      <span className="text-left text-xl font-bold">Earbuds</span>
      <div className="flex flex-row justify-evenly items-center flex-wrap p-2">
      {earbuds.map(item =>{
      return(
      <Link href={`/product/${item.id}?category=${item.data.category}`}>
      <div  className="flex flex-col justify-evenly items-center m-2 w-32 hover:scale-125 transition-all duration-150 ease-out">
      <img className="bg-white object-contain h-28 w-28 rounded-lg border border-black" src={item.data.photo} />
      <span id="rubik" className="text-lg font-bold">{item.data.name}</span>
      <span className="text-sm font-bold text-left">${item.data.price}<span className="line-through text-sm font-light">${item.data.discount}</span></span>
      </div>
      </Link>
      )
      })} 
      </div>
      </div>
      {/* box container */}
      <div className="flex flex-col justify-evenly m-6 bg-gray-200 h-84 w-84 md:w-96 rounded-xl">
      <span className="text-left text-xl font-bold">Laptops</span>
      <div className="flex flex-row justify-evenly items-center flex-wrap p-2">
      {/* smaller box */}
      {laptops.map(item =>{
      return(
      <Link href={`/product/${item.id}?category=${item.data.category}`}>
      <div  className="flex flex-col justify-evenly items-center w-32 m-2 hover:scale-125 transition-all duration-150 ease-out">
      <img className="bg-white object-contain h-28 w-28 rounded-lg border border-black" src={item.data.photo} />
      <span id="rubik" className="text-lg font-bold">{item.data.name}</span>
      <span className="text-sm font-bold text-left">${item.data.price}<span className="line-through text-sm font-light">${item.data.discount}</span></span>
      </div>
      </Link>
      )
      })}
      </div>
      </div>
       </div>
      </main>
  )
}