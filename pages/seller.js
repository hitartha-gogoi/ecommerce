import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar"
import ProductForm from "../components/productForm"
import { Line } from 'react-chartjs-2';
import { useRouter } from "next/router"
import CheckAuthPopup from "../components/checkAuthPopup"
import { onAuthStateChanged } from "firebase/auth";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};

export default function Seller(){
  
  const router = useRouter()
  let { id } = router.query
  const [ open, setOpen ] = useState(false)
  const [ isLoggedIn, setLoggedIn ] = useState(true)
  
  const checkAuth = ()=>{
   onAuthStateChanged(auth, (client) => {
      if (client) {
      console.log(client)
      setLoggedIn(true)
      //getOrders()
      } else {
        setLoggedIn(false)
        console.log("user is logged out", isLoggedIn)
      }
    })
 }
  
  useEffect(()=>{
    checkAuth();
  },[])
  
  let labels = ["Jan","Feb","Mar","Apr", "May","June","July"]
 const data = {
  labels,
  datasets: [
    {
      label: 'loss',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'sales',
      data: [70, 49, 70, 78, 57, 60, 79],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  
  return(
    <main className="bg-white w-screen h-screen">
    <Navbar />
    <CheckAuthPopup open={isLoggedIn} close={()=> setLoggedIn(true)} />
    <ProductForm open={open} close={()=> setOpen(false)} />
    <div className="flex flex-row justify-between flex-wrap">
    <div className="flex flex-col justify-start p-4">
  <span className="text-md font-extrabold text-left text-gray-700">Sales Report</span>
  <h1 className="text-slate-900 text-5xl text-left font-bold">2,45,778.07 <span className="text-lg font-light text-left text-gray-600">INR</span></h1>
  <span className="text-green-500 text-lg font-bold text-left">17770 (0.72%) today</span>
  <span className="text-gray-500 font-light">13th April, Saturday</span>
  </div>
  <div className="flex flex-row justify-evenly flex-wrap">
  <button className="w-44 h-12 m-4 rounded-lg bg-blue-500 text-white font-bold hover:scale-105 transition-all ease-in-out duration-150 p-2 ml-4" onClick={()=> setOpen(true)} >Add Product</button>
  </div>
  </div>
    <Line options={options} data={data} />

<div className="flex flex-col items-center w-screen items-center">
<div className="flex justify-center items-center self-center w-4/5 h-16 rounded-md bg-black">
<span className="font-bold text-white text-xl"> Dashboard </span>
</div>
<div className="flex flex-row justify-start items-center flex-wrap w-4/5 h-28">
<button className="w-28 h-12 bg-blue-500 text-black font-bold hover:scale-105 border border-black bg-white transition-all ease-in-out duration-150 p-2">Products</button>
<button className="w-28 h-12 bg-blue-500 text-black font-bold hover:scale-105 border border-black bg-white transition-all ease-in-out duration-150 p-2">orders</button>
<button className="w-28 h-12 bg-blue-500 text-black font-bold hover:scale-105 border border-black bg-white transition-all ease-in-out duration-150 p-2">orders</button>
<button className="w-28 h-12 bg-blue-500 text-black font-bold hover:scale-105 border border-black bg-white transition-all ease-in-out duration-150 p-2">orders</button>
<button className="w-28 h-12 bg-blue-500 text-black font-bold hover:scale-105 border border-black bg-white transition-all ease-in-out duration-150 p-2">orders</button>
<button className="w-28 h-12 bg-blue-500 text-black font-bold hover:scale-105 border border-black bg-white transition-all ease-in-out duration-150 p-2">orders</button>
<button className="w-28 h-12 bg-blue-500 text-black font-bold hover:scale-105 border border-black bg-white transition-all ease-in-out duration-150 p-2">orders</button>
</div>
</div>

    </main>
    )
}