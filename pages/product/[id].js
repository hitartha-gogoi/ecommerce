import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar"
import Link from "next/link"
import { useRouter } from "next/router"
import { db, auth } from "../../components/firebase"
import { collection, getDoc, getDocs, doc, documentId, where, query } from "firebase/firestore"

export default function Product(){
  
  const router = useRouter()
  let { id, category } = router.query
  const [ product, setProduct ] = useState({})
  const [ products, setProducts ] = useState([])
  
  async function firebaseGetProduct(productId){
    let q = query(collection(db,"products"), where(documentId(), "==", productId));
    let product = await getDocs(q);
    console.log(product);
    product.forEach(item =>{
      console.log(item, item.data());
      setProduct(item.data());
    })
  }
  
  async function firebaseFindProducts(category){
    let q = query(collection(db, "products"), where("category", "==", category))
    let items = await getDocs(q)
    items.forEach((item) => {
      let product = { id: item.id, data: item.data() }
      setProducts(products => [...products, product ])
     });
  }
  
  
  useEffect(()=>{
    if(!router.isReady) return;
    firebaseGetProduct(id);
    firebaseFindProducts(category);
  },[id])
  
  const redirectToProduct = (itemId)=>{
   // setProducts([])
    router.push(`/product/${itemId}`)
  }
  
  return(
    <main className="w-screen h-screen bg-white">
    <Navbar />
    <div className="flex flex-col items-center flex-wrap w-full pb-2">
  <div className="flex flex-row justify-evenly flex-wrap w-full md:mt-12 items-center">
    <div>
  <img src={product.photo} className="object-contain h-96 w-96 mb-2 md:rounded-xl md:hover:scale-105 transition-all ease-in-out duration-150" />
    </div>
    <div>
  <div className="flex flex-row justify-between w-84">
    <div className="flex flex-col">
    <span className="text-left text-xl font-bold text-black">{product.name}</span>
    <span className="text-left text-black font-bold text-lg">{product.price} <span className="font-light line-through">{product.discount}</span></span>
    </div>
  
  
  <div className="flex flex-row">
      <span className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
        share
      </span>
    </div>
  </div>
  <div className="flex flex-row">
    <span className="material-symbols-outlined">
      star
    </span><span className="material-symbols-outlined">
      star
    </span><span className="material-symbols-outlined">
      star
    </span><span className="material-symbols-outlined">
      star
    </span><span className="material-symbols-outlined">
      star
    </span>
    
  </div>
  <div className="flex flex-row w-84 ml-2">
      <button  className="text-white text-center font-bold bg-black h-14 w-40 rounded-lg mr-2 mt-4 hover:scale-125 transition-all ease-in-out duration-150">add to cart</button>
      <button className="text-black text-center font-bold bg-white h-14 w-40 mt-4 rounded-lg border-gray-700 border hover:scale-125 transition-all ease-in-out duration-150">buy now</button>
  </div>
 
  <p className="bg-white text-left text-black text-sm font-light pt-4 pb-4 mt-4 mb-4 border-y border-gray-700 flex flex-col md:w-72">
    <span className="text-xl font-bold text-black text-left mb-2">Product Description</span>
    {product.description}
  </p>
    </div>
  </div>
  <div className="flex flex-col  w-4/5 md:ml-10 mb-4 md:mt-6 bg-white">
  <h1 className="font-bold text-xl mt-2 mb-2 bg-white text-black">More products</h1>
  </div>
  <div className="flex flex-row justify-evenly w-full md:w-4/5 overflow-x-scroll p-4 bg-white">
  
  {products.map(item =>{
    return(
    <div className="flex flex-col justify-evenly items-center hover:scale-105 transition-all ease-in-out duration-150 border-2 border-gray-700 p-2 rounded-lg bg-gray-100 ml-2 mr-2">
        <img onClick={()=> redirectToProduct(item.id)} src={item.data.photo} className="object-contain h-36 w-36 mb-2 rounded-lg" />
       <div className="flex flex-col">
         <span onClick={()=> redirectToProduct(item.id)} className="text-left font-bold text-md text-black">{item.data.name}</span>
         <span onClick={()=> redirectToProduct(item.id)} className="text-left text-black text-sm">{item.data.discount} <span className="font-light line-through">{item.data.price}</span></span>
  
         <button className="text-white text-center font-bold bg-black h-10 w-32 rounded-lg mr-2 mt-4 hover:scale-105 transition-all ease-in-out duration-150">add to cart</button>
       </div>
    </div>
  )
  })}
  
    </div>
  </div>
  </main>
    )
}