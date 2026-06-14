import { PlusCircle } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { List } from "lucide-react";
import { Tag } from "lucide-react";
import { Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import { useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const getNavLabel = (path:string) => {
        if(path === "/") return "Dashboard";
        if(path.startsWith("/products")) return "Products";
        if(path.startsWith("/categories")) return "Categories";
        if(path.startsWith("/settings")) return "Settings";
        return "Dashboard";
    }

    const navLoc = getNavLabel(location.pathname);

    return (
    <>
    <Header navLoc={navLoc}/>
    <nav className="z-30 fixed bottom-0 left-0 right-0 flex justify-center" 
     style={{paddingBottom: 'max(12px, env(safe-area-inset-bottom))'}}>
    <div className="bg-slate-800/90 backdrop-blur rounded-xl px-5 py-2 flex gap-6 items-center shadow-lg">
        <NavLink to="/" className={({isActive}) => isActive ? " shadow-[0_0_3px_#22d3ee,0_0_6px_#22d3ee] bg-cyan-900 cursor-pointer w-11  scale-110 rounded-2xl h-10 flex justify-center items-center" : "cursor-pointer w-11  rounded-2xl h-10 flex justify-center items-center"} >
            <div className="flex flex-col  items-center justify-center" >
                <LayoutDashboard className={"stroke-white"}/>
            </div>
        </NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? " scale-110 shadow-[0_0_3px_#22d3ee,0_0_6px_#22d3ee] bg-cyan-900 cursor-pointer w-11  rounded-2xl h-10 flex justify-center items-center" : "cursor-pointer w-11  rounded-2xl h-10 flex justify-center items-center"} >
            <div className="flex flex-col  items-center justify-center" >
                <List className={"stroke-white"}/>
            </div>
        </NavLink>
        <NavLink to="/products/new" className={" cursor-pointer w-11 rounded-2xl h-10 flex justify-center items-center scale-120"}>
                <PlusCircle className={"stroke-white size-9 hover:shadow-[0_0_5px_#22d3ee,0_0_12px_#22d3ee] hover:scale-110 rounded-2xl"}/>
        </NavLink>
        <NavLink to="/categories" className={({isActive}) => isActive ? "  scale-110 shadow-[0_0_3px_#22d3ee,0_0_6px_#22d3ee] bg-cyan-900 cursor-pointer w-11  rounded-2xl h-10 flex justify-center items-center" : "cursor-pointer w-11  rounded-2xl h-10 flex justify-center items-center"} >
            <div className="flex flex-col  items-center justify-center" >
                <Tag className={"stroke-white"}/>
            </div>
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? " scale-110 shadow-[0_0_3px_#22d3ee,0_0_6px_#22d3ee] bg-cyan-900 cursor-pointer w-11  rounded-2xl h-10 flex justify-center items-center" : "cursor-pointer w-11  rounded-2xl h-10 flex justify-center items-center"}>
            <div className="flex flex-col  items-center justify-center" >
                <Settings className={"stroke-white"}/>
            </div>
        </NavLink>
    </div>

    </nav>
    </>
);
}

export default Navbar;
