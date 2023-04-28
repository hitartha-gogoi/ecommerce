import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar"
import Link from "next/link"
import { useRouter } from "next/router"
import{ onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../components/firebase"
import CheckAuthPopup from "../components/checkAuthPopup"
import { collection, getDoc, getDocs, doc, addDoc, documentId, where, query, updateDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { AiOutlineSend } from "react-icons/fa"
import SearchIcon from "@heroicons/react"

export default function Search(){
  
  const router = useRouter()
  
  return(
    <main>
    <Navbar />
    
    
    </main>
    )
}