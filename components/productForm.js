import { useState, useEffect, useRef } from "react"
import { db, auth, storage } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore"

export default function ProductForm({ open, close }){
  if(!open) return;
 
  const cat = useRef()
  const [ file, setFile ] = useState({})
  const [ name, setName ] = useState("")
  const [ price, setPrice ] = useState(null)
  const [ discount, setDiscount ] = useState(null)
  const [ desc, setDesc ] = useState("")
  
  const loadFile = function(event) {
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		setFile(event.target.files[0]);
		console.log(file)
	}
  
  const addProduct = (e)=>{
  e.preventDefault();
  onAuthStateChanged(auth, (user) => {
  if (user) {
  console.log(user)
  
  let category = cat.current.options[cat.current.selectedIndex].text;
  const storageRef = ref(storage,`images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    let seller = auth.currentUser.uid;
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const docRef = addDoc(collection(db, 'products'), {
        name: name,
        photo: downloadURL,
        price: price,
        discount: discount,
        description: desc,
        category: category,
        timestamp: serverTimestamp(),
        seller: seller
      })
      console.log(docRef.id);
      close();
      });
  })
  } else {
    console.log("user is logged out")
  }
})
}
  
  return(
          <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-brightness-50 z-50 flex justify-center items-center">
           <div className="flex flex-col shadow-2xl bg-white h-4/5 md:h-4/5 w-80  rounded-2xl cursor-pointer shadow-indigo-500">
               <div className="flex flex-row justify-between items-center w-full">
               <span />
               <span className="material-symbols-outlined" onClick={close}>close</span>
               </div>
          <form onSubmit={addProduct} className="flex flex-col justify-center items-start px-4">
             
          <h3 className="text-black text-md font-semibold ml-2 mt-2">Product Name</h3>
          <input value={name} onChange={(e)=> setName(e.target.value)} className="text-gray-400 rounded shadow bg-gray-100 appearance-none text-md border border-gray-300 w-5/5 h-8 mx-2 focus:outline-none focus:shadow-outline focus:border-purple-500 leading-tight" />
          <input onChange={loadFile} type="file" className="text-black font-light rounded border-gray-300 border bg-gray-100 w-72 focus:border-purple-500 m-2" />
          <h3 className="text-black text-md font-semibold m-2">Price</h3>
          <input value={price} onChange={(e)=> setPrice(e.target.value)} className="text-gray-400 rounded shadow bg-gray-100 appearance-none text-md border border-gray-300 w-5/5 h-8 mx-2 focus:outline-none focus:shadow-outline focus:border-purple-500 leading-tight"  />
          <h3 className="text-black text-md font-semibold m-2">Discounted Price</h3>
          <input value={discount} onChange={(e)=> setDiscount(e.target.value)} className="text-gray-400 rounded shadow bg-gray-100 appearance-none text-md border border-gray-300 w-5/5 h-8 mx-2 focus:outline-none focus:shadow-outline focus:border-purple-500 leading-tight" />
        <h3 className="text-black text-md font-semibold m-2">Category</h3>
        <select ref={cat} className="text-lg text-black font-semibold rounded border-gray-300 border bg-gray-100 focus:border-purple-500 m-2">
          <option value="1">Electronics </option>
          <option value="2">Clothes</option>
          <option value="3">Tools </option>
        </select>
        <h3 className="text-black text-md font-semibold m-2">Describe</h3>
        <textarea value={desc} onChange={(e)=> setDesc(e.target.value)} className="text-gray-400 rounded-md shadow bg-gray-100 appearance-none text-md border border-gray-300 w-72 h-24 mx-2 focus:outline-none focus:shadow-outline focus:border-purple-500 leading-tight" placeholder="describe your product" />
         <button type="submit"  id="title" className="text-center h-8 w-4/5 my-4 bg-purple-700 text-white font-extrabold text-lg rounded flex justify-center items-center shadow-2xl self-center"> send </button>
          </form>
          </div>
        </div>
    )
}