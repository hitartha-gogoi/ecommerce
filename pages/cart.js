import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar"
import Link from "next/link"
import router from "next/router"
import { useRouter } from "next/router"
import { db, auth } from "../components/firebase"
import OrderForm from "../components/orderForm"
import CheckAuthPopup from "../components/checkAuthPopup"
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs, doc, documentId, where, query, updateDoc, setDoc, deleteDoc, addDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore"

export default function Cart() {

  let product;
  const deliveryCharge = 0;
  let existingCartItem = false;
  const [ subtotal, setSubTotal ] = useState(0)
  const [ cart, setCart ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false)
  const [ status, setStatus ] = useState("dispatching your product");
  const [ isLoggedIn, setLoggedIn ] = useState(true)
  
 const checkAuth = ()=>{
   onAuthStateChanged(auth, (client) => {
      if (client) {
      console.log(client)
      setLoggedIn(true)
      getCart()
      } else {
        setLoggedIn(false)
        console.log("user is logged out", isLoggedIn)
      }
    })
 }
 
  useEffect(()=>{
    checkAuth();
  },[])
  
  async function getCart(){
    let q = query(collection(db, "cart"), where("user", "==", auth.currentUser.uid))
    let items = await getDocs(q)
    items.forEach((item) => {
      existingCartItem = true;
      let newCart = { id: item.id, data: item.data() }
      setCart(cart => [...cart, newCart ])
      setSubTotal(total => total + newCart.data.total)
     })
  }
  
  async function addToCart(itemId, itemName, itemPhoto, itemPrice, itemCategory){
    console.log(itemId, itemName, itemPhoto, itemPrice, itemCategory)
    let q = query(collection(db, "cart"),where("user", "==", auth.currentUser.uid), where("product", "==", itemId))
    let existingCartItems = await getDocs(q);
    existingCartItems.forEach(item =>{
      existingCartItem = true;
      updateDoc(doc(db, "cart", item?.id), {
      quantity: item.data().quantity + 1,
      total: item.data().total + Number(itemPrice)
    }).then(result =>{
      console.log("cart updated", result)
      setCart([])
      setSubTotal(0);
      getCart();
    })
    })
  }
  
  async function removeFromCart(itemId, itemName, itemPhoto, itemPrice, itemCategory){
    console.log(itemId, itemName, itemPhoto, itemPrice, itemCategory)
    let q = query(collection(db, "cart"),where("user", "==", auth.currentUser.uid), where("product", "==", itemId))
    let existingCartItems = await getDocs(q);
    existingCartItems.forEach(item =>{
      if(item.data().quantity === 1){
        existingCartItem = false;
      } else {
        existingCartItem = true;
      updateDoc(doc(db, "cart", item?.id), {
      quantity: item.data().quantity - 1,
      total: item.data().total - Number(itemPrice)
    }).then(result =>{
      console.log("cart updated", result)
      setCart([])
      setSubTotal(0)
      getCart()
    })
      }
    })
    if(!existingCartItem){
      let existingCartItems = await getDocs(q);
      existingCartItems.forEach(item =>{
        deleteDoc(doc(db, "cart", item?.id))
        .then(result =>{
          setCart([]);
          setSubTotal(0)
          getCart([]);
        })
        .catch(err => console.log(err))
    })
  }
  }
  
  
  async function order(address,state,pincode,phoneNumber){
    cart.forEach(item =>{
    addDoc(collection(db, 'orders'), {
        product: item.data.product,
        user: auth.currentUser.uid,
        seller: item.data.seller,
        name: item.data.name,
        photo: item.data.photo,
        category: item.data.category,
        quantity: Number(item.data.quantity),
        price: Number(item.data.price),
        total: Number(item.data.total),
        address: address,
        state: state,
        pincode: pincode,
        phonenumber: phoneNumber,
        timestamp: serverTimestamp(),
      })
      .then(result =>{
        deleteDoc(doc(db, "cart", item?.id))
        .then(res =>  console.log("order created", result.id, result));
    }).catch(err => console.log(err));
    })
    
   // const sellerRef = await getDoc(doc(db, "users", product.seller))
    const customerRef = await getDoc(doc(db, "users", auth.currentUser.email))
  //  const seller = sellerRef.data()
    const customer = customerRef.data();
      if(window.Email){
       await window.Email.send({
          SecureToken: "c5ab9116-48a2-4f13-b0c6-dacf50baeba7",
          To: customer.email,
          From: "arnabgogoi83@gmail.com",
          Subject: "Ecommerce Purchase",
          Body: "Thank you for shopping at Ecommerce"
        }).then(message => console.log(message))
        .catch(error => console.log(error))
      }
   // alert("order completed")
    router.push("/orders")
  }
  
  
  return (
    <main className="text-black bg-gray-700 w-screen h-screen bg-gray-700">
    <Navbar />
   <CheckAuthPopup open={isLoggedIn} close={()=> setLoggedIn(true)} />
    <OrderForm name="cart" price={subtotal} modal={isOpen} close={()=> setIsOpen(false)} order={order} />
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
 {cart.map(item =>{
    return(
  <div className="flex flex-row justify-between h-18 w-full md:w-3/5 border-gray-700 border bg-white rounded-lg hover:scale-105 transition-all ease-in-out duration-150 shadow-md mb-2">
 {/* left box */}
 
  <div onClick={()=> router.push(`/product/${item.data.product}?category=${item.data.category}`)} className="flex h-18 w-96">
  <img src={item.data.photo} className="object-contain h-16 w-16 rounded-lg" />
  <div className="flex flex-col justify-center items-center ml-2">
  <span className="text-md font-bold">{item.data.name}</span>
  <span className="text-sm font-light"></span>
  </div>
  </div>
  
  
 {/* right box */}
  <div className="flex flex-col items-center w-24 z-20">
  <span className="text-lg font-bold text-black">₹{item.data.total}</span>
  <div className="flex flex-row justify-evenly">
  <span onClick={()=> addToCart(item.data.product, item.data.name, item.data.photo, item.data.price, item.data.category)} className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
  add_circle
  </span>
  <span className="text-lg font-bold text-black ml-2 mr-2">{item.data.quantity}</span>
  <span onClick={()=> removeFromCart(item.data.product, item.data.name, item.data.photo, item.data.price, item.data.category)} className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
delete
</span>
  </div>
  </div>
  </div>
  )
 })}
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
        <span className="text-md font-light">₹{subtotal}</span>
        <span className="text-md font-light">₹{deliveryCharge}</span>
      </div>
 
    </div>
  </div>
  <div className="flex flex-row justify-between items-center w-72 p-2 border-b  border-gray-400">
    <span className="text-lg font-bold">Total</span>
    <span className="text-md font-light">₹{subtotal}</span>
  </div>
  
 {/* proceed to checkout */}
 
 {subtotal === 0 ? <button onClick={()=> router.push("/")} className="w-72 h-14 bg-gray-800 border-2 border-gray-900 text-white font-bold text-center text-lg rounded-lg mt-2 mb-2 hover:scale-105 transition-all ease-in-out duration-150">Explore Products </button> :
  <button onClick={()=> setIsOpen(true)} className="w-72 h-14 bg-gray-800 border-2 border-gray-900 text-white font-bold text-center text-lg rounded-lg mt-2 mb-2 hover:scale-105 transition-all ease-in-out duration-150">Proceed to Checkout </button>
 }
  </div>
  
</div>
    </main>
  )
}
