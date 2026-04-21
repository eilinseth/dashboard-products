import Header from "./components/Header"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

function App() {

  
  return (
    <div className="relative w-full pb-20">
      <Header/>
      <Navbar/>
      <Outlet />
      
    </div>
  )
}

export default App
