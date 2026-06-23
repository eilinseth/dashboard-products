import {ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SettingsForm(){
    const navigate = useNavigate();
    return (    
    <>
        <div className="w-full px-4 text-[#E5E7EB] fixed inset-0 z-50 bg-[#111827] overflow-y-auto pb-10">
            <div className="flex items-center mt-6 gap-3 relative">
                <ArrowLeft className="size-7 cursor-pointer shrink-0" onClick={() => navigate(-1)}/>
                <div className="mx-auto  text-xl font-semibold text-center flex-1 ">Change Username</div>
                <div className="size-7"></div>
            </div>
            
            <form className="flex flex-col gap-4 w-full mt-7 items-center">
                <div className="flex flex-col mt-2 gap-2">
                    <div className="text-lg">Your old username is: Admin</div>
                    <input type="text" placeholder="New Username" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                </div>
                <button type="submit" className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md mt-4 w-80">Update Username</button>
            </form>
        </div>
    </>
    )
}
    

export default SettingsForm;