import {User} from "lucide-react"
import {ChevronRight} from "lucide-react"

const Settings = () =>{
    return (
        <section className="mt-4 px-4 w-full pb-20 text-[#E5E7EB]">
            <div className="flex w-full gap-3 items-center ">
                <div className="flex bg-amber-100 w-14 h-14 rounded-full items-center justify-center">
                    <div className="text-3xl font-semibold text-[#1F2937]">A</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-lg font-semibold">Admin</div>
                    <div className="text-sm text-[#9CA3AF]">
                        admin@example.com
                    </div>
                </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
            <div className="text-lg font-semibold">Account</div>
            <div className="flex bg-slate-700 gap-2 w-full px-2 py-2 border-b-slate-300">
                <div className="flex items-center justify-center border-2 w-14 h-10 border-slate-500">
                    <User className={"stroke-[#E5E7EB] size-5"}/>
                </div>
                <div className="   text-sm font-semibold text-white flex items-center px-2 cursor-pointer flex-col">
                    <div className="font-semibold">Username</div>
                    <div className="text-xs text-[#9CA3AF]">admin</div>
                </div>
                <div className="flex items-center justify-end w-full pr-2">
                    <ChevronRight className="size-5 cursor-pointer"/>
                </div>
            </div>
            </div> 

        </section>
    )
}

export default Settings;