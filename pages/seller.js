import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar"
import ProductForm from "../components/productForm"

export default function Seller(){
  
  const [ open, setOpen ] = useState(false)
  
  return(
    <main className="bg-white w-screen h-screen">
    <Navbar />
    <ProductForm open={open} close={()=> setOpen(false)} />
      <div className="flex flex-col justify-start p-4">
  <span className="text-md font-extrabold text-left text-gray-700">Sales Report</span>
  <h1 className="text-slate-900 text-5xl text-left font-bold">2,45,778.07 <span className="text-lg font-light text-left text-gray-600">INR</span></h1>
  <span className="text-green-500 text-lg font-bold text-left">17770 (0.72%) today</span>
  <span className="text-gray-500 font-light">13th April, Saturday</span>
  <canvas id="chart" ></canvas>
</div>

<div className="flex flex-row justify-evenly items-center">
<button className="w-44 h-12 rounded-lg bg-blue-500 text-white font-bold hover:scale-105 transition-all ease-in-out duration-150 p-2 ml-4" onClick={()=> setOpen(true)} >Add Product</button>

<button className="w-44 h-12 rounded-lg bg-blue-500 text-white font-bold hover:scale-105 transition-all ease-in-out duration-150 p-2 ml-4">Find Products</button>
</div>
    </main>
    )
}