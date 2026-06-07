import { PlusCircle } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { List } from "lucide-react";
import { Tag } from "lucide-react";
import { Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
    
    return (
    <nav className=" z-30 fixed -bottom-2 left-0 right-0 flex justify-center pb-4">
      <div className="bg-slate-800/90 backdrop-blur rounded-full px-6 py-3 flex gap-6 items-center shadow-lg">
        <NavLink to="/" className={({isActive}) => isActive ? " shadow-[0_0_5px_#22d3ee,0_0_12px_#22d3ee] bg-cyan-700 cursor-pointer w-16  scale-130 rounded-full h-10 flex justify-center items-center" : "cursor-pointer w-16  rounded-full h-10 flex justify-center items-center"} >
            <div className="flex flex-col  items-center justify-center">
                <LayoutDashboard className={"stroke-white"} />
                <p className="text-white text-[10px]">Dashboard</p>
            </div>
        </NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? " scale-130 shadow-[0_0_5px_#22d3ee,0_0_12px_#22d3ee] bg-cyan-700 cursor-pointer w-16  rounded-full h-10 flex justify-center items-center" : "cursor-pointer w-16  rounded-full h-10 flex justify-center items-center"} >
            <div className="flex flex-col  items-center justify-center">
                <List className={"stroke-white"}/>
                <p className="text-white text-[10px]">Products</p>
            </div>
        </NavLink>
        <NavLink to="/products/new" className={" cursor-pointer w-16 rounded-full h-10 flex justify-center items-center scale-120"}>
                <PlusCircle className={"stroke-white size-9 hover:shadow-[0_0_5px_#22d3ee,0_0_12px_#22d3ee] hover:scale-160 rounded-full"}/>
        </NavLink>
        <NavLink to="/categories" className={({isActive}) => isActive ? "  scale-130 shadow-[0_0_5px_#22d3ee,0_0_12px_#22d3ee] bg-cyan-700 cursor-pointer w-16  rounded-full h-10 flex justify-center items-center" : "cursor-pointer w-16  rounded-full h-10 flex justify-center items-center"} >
            <div className="flex flex-col  items-center justify-center">
                <Tag className={"stroke-white"}/>
                <p className="text-white text-[10px]">Category</p>
            </div>
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? " scale-130 shadow-[0_0_5px_#22d3ee,0_0_12px_#22d3ee] bg-cyan-700 cursor-pointer w-16  rounded-full h-10 flex justify-center items-center" : "cursor-pointer w-16  rounded-full h-10 flex justify-center items-center"}>
            <div className="flex flex-col  items-center justify-center">
                <Settings className={"stroke-white"}/>
                <p className="text-white text-[10px]">Settings</p>
            </div>
        </NavLink>
     
      </div>

    </nav>
  );
}

export default Navbar;
