import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar"
import Link from "next/link"
import { useRouter } from "next/router"
import{ onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../components/firebase"
import CheckAuthPopup from "../../components/checkAuthPopup"
import OrderForm from "../../components/orderForm"
import { collection, getDoc, getDocs, doc, addDoc, documentId, where, query, updateDoc, setDoc, deleteDoc, orderBy, getCountFromServer, serverTimestamp } from "firebase/firestore"
import  SendIcon from "@mui/icons-material/Send"
import SearchIcon from "@heroicons/react"
import { Rating } from "@mui/material"

export default function Product(){
  
  const router = useRouter()
  let { id, category } = router.query
  const [ product, setProduct ] = useState({})
  const [ products, setProducts ] = useState([]);
  const [ status, setStatus ] = useState("dispatching your product");
  const [ isOpen, setIsOpen ] = useState(false)
  const [ isLoggedIn, setLoggedIn ] = useState(true)
  const [ review, setReview ] = useState("")
  const [ reviews, setReviews ] = useState([])
  const [ star, setStar ] = useState(0)
  let existingCartItem = false;
  const [ existingOrderedItem, setExistingOrderedItem ] = useState(false)
  
 const checkAuth = ()=>{
   onAuthStateChanged(auth, (client) => {
      if (client) {
      console.log(client)
      setLoggedIn(true)
      firebaseGetProduct(id);
      firebaseFindProducts(category);
      getReviews();
      checkProductOrder();
      } else {
        setLoggedIn(false)
        console.log("user is logged out", isLoggedIn)
      }
    })
 }
  
  
  async function firebaseGetProduct(productId){
    let q = query(collection(db,"products"), where(documentId(), "==", productId));
    let docSnap = await getDocs(q);
    docSnap.forEach(item =>{
      setProduct(item.data())
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
  
  async function addToCart(itemId, itemName, itemPhoto, itemPrice, itemCategory){
    console.log(itemId, itemName, itemPhoto, itemPrice, itemCategory)
    let q = query(collection(db, "cart"),where("user", "==", auth.currentUser.uid), where("product", "==", itemId))
    let existingCartItems = await getDocs(q);
    existingCartItems.forEach(item =>{
      existingCartItem = true
      updateDoc(doc(db, "cart", item?.id), {
      quantity: item.data().quantity + 1,
      total: item.data().total + Number(itemPrice)
    }).then(result =>{
      console.log("cart updated", result)
    })
    })
    if(!existingCartItem){
      console.log("inside if statment checks if the cart item exist so that stops right there ", existingCartItem)
      const docRef = await addDoc(collection(db, 'cart'), {
        product: itemId,
        user: auth.currentUser.uid,
        seller: product.seller,
        name: itemName,
        photo: itemPhoto,
        category: itemCategory,
        quantity: Number(1),
        price: Number(itemPrice),
        total: Number(itemPrice),
      })
      await alert("new product added to cart", docRef.id)
    }
  }
  
  async function order(address,state,pincode,phoneNumber){
    const docSnap = await addDoc(collection(db, 'orders'), {
        product: id,
        user: auth.currentUser.uid,
        seller: product.seller,
        name: product.name,
        photo: product.photo,
        category: product.category,
        quantity: Number(1),
        price: Number(product.price),
        total: Number(product.price),
        address: address,
        state: state,
        pincode: pincode,
        phonenumber: phoneNumber,
        timestamp: serverTimestamp(),
      })
      
    const sellerRef = await getDoc(doc(db, "users", product.seller))
    const customerRef = await getDoc(doc(db, "users", auth.currentUser.email))
    const seller = sellerRef.data()
    const customer = customerRef.data();
    router.push("/orders")
      if(window.Email){
       await window.Email.send({
          SecureToken: "c5ab9116-48a2-4f13-b0c6-dacf50baeba7",
          To: seller.email,
          From: "arnabgogoi83@gmail.com",
          Subject: "This is the subject",
          Body: "And this is the body"
        }).then(message => console.log(message))
        .catch(error => console.log(error))
      }
   // alert("order completed")
    
  }
  
async function addReview(e){
  e.preventDefault();
  const docSnap = await addDoc(collection(db, 'reviews'), {
        product: id,
        user: auth.currentUser.uid,
        seller: product.seller,
        review: review,
        stars: star,
        username: auth.currentUser.displayName,
        pfp: auth.currentUser.photoURL,
        timestamp: serverTimestamp(),
      })
   console.log(docSnap.id)
   setReview("")
   setReviews([])
   getReviews()
}

async function getReviews(){
    let q = query(collection(db, "reviews"), where("product", "==", id), orderBy("timestamp", "desc"));
    let items = await getDocs(q)
    items.forEach((item) => {
      let newReview = { id: item.id, data: item.data() }
      setReviews(allReviews => [...allReviews, newReview ])
     })
  }
async function checkProductOrder(){
    let q = query(collection(db, "orders"), where("user", "==", auth.currentUser.uid), where("product", "==", id))
    let items = await getCountFromServer(q)
    
    if(items.data().count == 0){
      setExistingOrderedItem(false)
    } else {
      setExistingOrderedItem(true)
    }
  }
  
  async function deleteReview(reviewId){
    let q = query(collection(db, "reviews"), where(documentId(), "==", reviewId))
    let reviewSnap = await getDocs(q)
    reviewSnap.forEach(item =>{
        deleteDoc(doc(db, "reviews", item?.id))
        .then(result =>{
          console.log(result)
          setReviews([])
          getReviews()
        })
        .catch(err => console.log(err))
    })
  }
  
  
  useEffect(()=>{
    if(!router.isReady) return;
    setReviews([])
    checkAuth();
  },[id])
  
  const redirectToProduct = (itemId, itemCategory)=>{
    router.push(`/product/${itemId}?category=${itemCategory}`)
  }
  
  return(
    <main className="w-screen h-screen bg-white">
    <Navbar />
    <CheckAuthPopup open={isLoggedIn} close={()=> setLoggedIn(true)} />
   <OrderForm modal={isOpen} name={product.name} price={product.price} close={()=> setIsOpen(false)} order={order} />
    <div className="flex flex-col items-center flex-wrap w-full pb-2">
  <div className="flex flex-row justify-evenly flex-wrap w-full md:mt-12 items-center">
    <div>
  <img src={product.photo} className="object-contain h-96 w-96 mb-2 md:rounded-xl md:hover:scale-105 transition-all ease-in-out duration-150" />
    </div>
    <div>
  <div className="flex flex-row justify-between w-84">
    <div className="flex flex-col">
    <span className="text-left text-xl font-bold text-black">{product.name}</span>
    <span className="text-left text-black font-bold text-lg">₹{product.discount} <span className="font-light line-through">₹{product.price}</span></span>
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
      <button onClick={()=> addToCart(id, product.name, product.photo, product.discount, product.category)} className="text-white text-center font-bold bg-black h-14 w-40 rounded-lg mr-2 mt-4 hover:scale-125 transition-all ease-in-out duration-150">add to cart</button>
      <button onClick={()=> setIsOpen(true)} className="text-black text-center font-bold bg-white h-14 w-40 mt-4 rounded-lg border-gray-700 border hover:scale-125 transition-all ease-in-out duration-150">buy now</button>
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
        <img onClick={()=> redirectToProduct(item.id, item.data.category)} src={item.data.photo} className="object-contain h-36 w-36 mb-2 rounded-lg" />
       <div className="flex flex-col">
         <span onClick={()=> redirectToProduct(item.id)} className="text-left font-bold text-md text-black">{item.data.name}</span>
         <span onClick={()=> redirectToProduct(item.id)} className="text-left text-black text-sm">₹{item.data.discount} <span className="font-light line-through">₹{item.data.price}</span></span>
  
         <button onClick={()=> addToCart(item.id, item.data.name, item.data.photo, item.data.discount, item.data.category)} className="text-white text-center font-bold bg-black h-10 w-32 rounded-lg mr-2 mt-4 hover:scale-105 transition-all ease-in-out duration-150">add to cart</button>
       </div>
    </div>
  )
  })}
    </div>
    
    
    {/* reviews */}
  <div className="flex flex-col  w-4/5 md:ml-10 mb-4 md:mt-6 bg-white">
  <h1 className="font-bold text-xl mt-2 mb-2 bg-white text-black">Reviews</h1>
  </div>
  {!existingOrderedItem ? <div /> :
  <form onSubmit={addReview} className="flex flex-col justify-center  w-4/5">
  <div className="w-4/5 flex justify-center scale-125 mb-4">
  <Rating name="simple-controlled" value={star} onChange={(event, newValue)=> setStar(newValue)} />
  </div>
  <div className="flex justify-evenly w-4/5">
  <input value={review} onChange={(e)=> setReview(e.target.value)} className="bg-gray-50 black w-4/5 pl-10 ml-6 sm:text-sm border-black  focus:border-white  rounded-md h-8" />
  <SendIcon onClick={addReview} />
  </div>
  </form>
  }
 <div className="flex flex-col justify-evenly w-full md:w-4/5  p-4 bg-white">
 {reviews.map((item) =>{
   return(
  <div className="flex flex-col justify-start flex-wrap hover:scale-105 transition-all ease-in-out duration-150 border border-gray-700 p-2 rounded-lg bg-gray-100 mt-2 mb-2">
  <div className="flex flex-row justify-between items-center">
  <div className="flex flex-row justify-start items-center">
  <img src={item.data.pfp} className="rounded-full w-14 h-14" />
  <div className="flex flex-col justify-start">
  <span className="text-left font-bold text-md text-black ml-6">{item.data.username}</span>
  <div className="flex flex-row ml-4">
  <Rating name="read-only" value={item.data.stars} readOnly />
  </div>
  </div>
  </div>
  {item.data.user !== auth.currentUser.uid ? <span /> :
 <span onClick={()=> deleteReview(item.id)} className="material-symbols-outlined hover:scale-125 transition-all ease-in-out duration-150">
delete
</span>}
  </div>
  <p className="ml-20 w-40">{item.data.review}</p>
  </div>
  )
 })}
 
  </div>
  
  </div>
  </main>
    )
}