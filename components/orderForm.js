import { useState, useEffect, useRef, useCallback } from "react"
import { db, auth, storage } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore"
import useRazorpay from "react-razorpay";

export default function OrderForm({ modal, close, order }){
  if(!modal) return;
 const Razorpay = useRazorpay();
  const cat = useRef()
  const [ address, setAddress ] = useState("");
  const [ pincode, setPinCode ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState(0);
  let state = useRef();
  
  const handlePayment = async (e,params) => {
   e.preventDefault
  const payment = await createOrder(params); //  Create order on your backend

  const options = {
    key: "rzp_test_RupIFQwNDkYWvg", // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Acme Corp",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: payment.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: "Piyush Garg",
      email: "youremail@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  }

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

  rzp1.open();
};
  
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
          <form onSubmit={handlePayment} className="flex flex-col justify-center items-start px-4">
             
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
        <button onClick={handlePayment} id="title" className="text-center h-8 w-4/5 my-4 bg-purple-700 text-white font-extrabold text-lg rounded flex justify-center items-center shadow-2xl self-center hover:scale-105 transition-all ease-in-out duration-150"> pay now </button>
         <button type="submit" id="title" className="text-center h-8 w-4/5 my-4 bg-purple-700 text-white font-extrabold text-lg rounded flex justify-center items-center shadow-2xl self-center hover:scale-105 transition-all ease-in-out duration-150"> Order Now </button>
          </form>
          </div>
        </div>
    )
}