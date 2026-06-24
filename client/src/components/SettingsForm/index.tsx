import {ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SettingsForm({title, children}: {title: string, children: React.ReactNode}) {
    const navigate = useNavigate();
    return (    
    <>
        <div className="w-full px-4 text-[#E5E7EB] fixed inset-0 z-50 bg-[#111827] overflow-y-auto pb-10">
            <div className="flex items-center mt-6 gap-3 relative">
                <ArrowLeft className="size-7 cursor-pointer shrink-0" onClick={() => navigate(-1)}/>
                <div className="mx-auto  text-xl font-semibold text-center flex-1 ">{title}</div>
                <div className="size-7"></div>
            </div>
            
            {children}
        </div>
    </>
    )
}
    

export default SettingsForm;