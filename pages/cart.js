import Navbar from "../components/navbar"
import Link from "next/link"
import router from "next/router"

export default function Cart() {
  return (
    <main className="text-black bg-gray-700 w-screen h-screen bg-gray-700">
    <Navbar />

  <div className="flex flex-col items-center w-full h-full">
  {/* cart header */}
  <div className="w-full h-12 text-lg font-bold text-white flex flex-row justify-center items-center p-2">
      <span className="material-symbols-outlined hover:scale-125 transition-all duration-150 ease-out">
        shopping_cart
      </span>
  <span>Cart </span>
  </div>
  
 {/* add to cart and cost bill container */}
  <div className="flex flex-col justify-start items-center h-4/5 w-full md:w-4/5 border-gray-700 border p-2 rounded-lg bg-gray-200 mt-2">
    
 {/* cart container */}
  <div className="flex flex-col items-center h-72 md:h-3/5 w-full overflow-y-scroll">
 {/* cart bar */}
  <div className="flex flex-row justify-between h-18 w-full md:w-3/5 border-gray-700 border bg-white rounded-lg hover:scale-105 transition-all ease-in-out duration-150 shadow-md mb-2">
 {/* left box */}
 
  <div onClick={()=> router.push("/product/hi")} className="flex h-18 w-96">
  <img src="https://plus.unsplash.com/premium_photo-1668418188837-d40b734ed6d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWFyYnVkc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60" className="h-16 w-16 rounded-lg" />
  <div className="flex flex-col justify-center items-center ml-2">
  <span className="text-md font-bold">Airpods pro</span>
  <span className="text-sm font-light">amazon</span>
  </div>
  </div>
  
  
 {/* right box */}
  <div className="flex flex-col items-center w-24 z-20">
  <span className="text-lg font-bold text-black">$1500</span>
  <div className="flex flex-row justify-evenly">
  <span className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
  add_circle
  </span>
  <span className="text-lg font-bold text-black ml-2 mr-2">1</span>
  <span className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
delete
</span>
  </div>
  </div>
  </div>
 {/* cart bar ends here */}
  </div>
 {/* cost bill */}
  <div className="flex flex-col justify-between h-32 w-72 mt-4 border-y border-gray-400 p-2">
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">Subtotal</span>
        <span className="text-lg font-bold">Shipping</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-md font-light">34998</span>
        <span className="text-md font-light">105</span>
      </div>
 
    </div>
  </div>
  <div className="flex flex-row justify-between items-center w-72 p-2 border-b  border-gray-400">
    <span className="text-lg font-bold">Total</span>
    <span className="text-md font-light">35999</span>
  </div>
  
 {/* proceed to checkout */}
  <button className="w-72 h-14 bg-gray-800 border-2 border-gray-900 text-white font-bold text-center text-lg rounded-lg mt-2 mb-2 hover:scale-105 transition-all ease-in-out duration-150">Proceed to Checkout</button> 
  </div>
  
</div>
    </main>
  )
}
