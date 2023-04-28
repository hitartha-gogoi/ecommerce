import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Modal from "../components/modal"
import SearchIcon from "@mui/icons-material/Search"

export default function Navbar(){
  
  const [ open, setOpen ] = useState(false)
  
  
  
  return(
    <>
    <Modal open={open} close={()=> setOpen(false)} />
    <div className="text-black flex flex-row justify-evenly items-center h-12 w-screen border-black border-2 border-bottom sticky top-0 left-0 bg-white">
    <div className="flex flex-row justify-between items-center w-full h-full">
    <div className="flex flex-row justify-evenly w-40">
    <Link href="/orders">
    <span className="material-symbols-outlined hover:scale-125 transition-all duration-150 ease-out">menu</span>
    </Link>
    <Link href="/">
    <span id="rubik">E-COMMERCE</span>
    </Link>
    </div>
    <div className="flex flex-row justify-evenly w-40">
    <Link href="/search">
    <SearchIcon className="material-symbols-outlined hover:scale-125 transition-all duration-150 ease-out" />
    </Link>
    <Link href="/cart">
    <span className="material-symbols-outlined hover:scale-125 transition-all duration-150 ease-out">shopping_cart</span>
    </Link>
    <span onClick={()=> setOpen(true)} className="material-symbols-outlined hover:scale-125 transition-all duration-150 ease-out">person</span>
    </div>
    </div>
    </div>
    </>
    )
}