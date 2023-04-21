import Navbar from "../components/navbar"
import BecomeSellerModal from "../components/becomeSellerModal"
import Link from "next/link";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FaDiscord } from 'react-icons/fa';
import { AiFillGithub } from "react-icons/ai"
import { BsMedium, BsStackOverflow } from "react-icons/bs"

export default function Bio() {
  
  const [ open, setOpen ] = useState(false)
  
  return (
    <main className="bg-white h-screen w-screen">
   <Navbar />
   <BecomeSellerModal modal={open} close={()=> setOpen(false)} />
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-white mt-72 pt-96 md:mt-2">
      
      
      {/* top screen */}
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-white mt-96 mb-10">
      <h1 className="flex justify-center items-center text-black text-6xl font-bold w-3/5">Order, Manage, Sell at Ease</h1>
      <span className="text-black text-xl font-light mt-6 mb-6 w-3/5">We are building a highly professional ecommerce store for local vendorsand small businesses, making it easy to manage your orders, easy for customers to shop by sitting at their home</span>
      <div className="flex justify-evenly items-center w-4/5 ">
      <button onClick={()=> setOpen(true)} className="text-white text-center font-bold bg-black h-14 w-40 rounded-lg mr-2 mt-4 border-blue-400 border shadow-2xl shadow-blue-400 hover:scale-125 transition-all ease-in-out duration-150">start selling</button> 
      <button className="m-4 text-black text-center font-medium bg-white h-14 w-40 mt-4 rounded-lg border-fuchsia-500 border shadow-2xl shadow-fuchsia-500 hover:scale-125 transition-all ease-in-out duration-150"></button>
      </div>
      </div>
      
      
      {/* info boxes */}
      <div className="flex flex-row justify-evenly items-center flex-wrap w-screen mt-10 mb-20 ml-10 mr-10">
      <div className="flex flex-col justify-center items-center shadow-2xl transparent h-60 w-96 py-10 mx-8 px-6 rounded-xl cursor-pointer hover:scale-110 transition-all duration-150 ease-out shadow-gray-500 m-6">
      <p id="title" className="text-left text-lg font-light px-4 py-4 text-gray-500">
      <span className="font-bold text-xl"> Easy Integration </span><br />
    Hi there, Are you looking for an outstanding Landing Page in React JS or Next JS? Or A full blown messaging web app? I'm an amateur in fullstack web 
    </p>
      </div>
      <div className="flex flex-col justify-center items-center shadow-2xl transparent h-60 w-96 py-10 mx-8 px-6 rounded-xl cursor-pointer hover:scale-110 transition-all duration-150 ease-out shadow-gray-500 m-6">
      <p id="title" className="text-left text-lg font-light px-4 py-4 text-gray-500">
      <span className="font-bold text-xl"> Easy Integration </span><br />
    Hi there, Are you looking for an outstanding Landing Page in React JS or Next JS? Or A full blown messaging web app? I'm an amateur in fullstack web 
    </p>
      </div>
      <div className="flex flex-col justify-center items-center shadow-2xl transparent h-60 w-96 py-10 mx-8 px-6 rounded-xl cursor-pointer hover:scale-110 transition-all duration-150 ease-out shadow-gray-500 m-6">
      <p id="title" className="text-left text-lg font-light px-4 py-4 text-gray-500">
      <span className="font-bold text-xl"> Easy Integration </span><br />
    Hi there, Are you looking for an outstanding Landing Page in React JS or Next JS? Or A full blown messaging web app? I'm an amateur in fullstack web 
    </p>
      </div>
      <div className="flex flex-col justify-center items-center shadow-2xl transparent h-60 w-96 py-10 mx-8 px-6 rounded-xl cursor-pointer hover:scale-110 transition-all duration-150 ease-out shadow-gray-500 m-6">
      <p id="title" className="text-left text-lg font-light px-4 py-4 text-gray-500">
      <span className="font-bold text-xl"> Easy Integration </span><br />
    Hi there, Are you looking for an outstanding Landing Page in React JS or Next JS? Or A full blown messaging web app? I'm an amateur in fullstack web 
    </p>
      </div>
      </div>
      
      
      {/* footer */}
      <div className="flex flex-col justify-center items-center h-40 w-screen bg-black space-y-2 text-white">
    
    <div className="flex flex-row justify-center items-center flex-wrap space-x-4 my-8">
    <Link href="https://www.instagram.com/_.catalyst__/">
    <InstagramIcon /></Link>
    <TwitterIcon />
    <Link href="https://discord.gg/rZKX6au97V"><FaDiscord /></Link>
    <BsMedium />
    <img src="https://www.metartworks.com/assets/img/opensea.png" className="inline h-4 w-4" />
    </div>
    <span className="font-light text-gray-400">© all copyrights reserved, 2022</span>
    </div>
    
    
      </div>
    </main>
  )
}
