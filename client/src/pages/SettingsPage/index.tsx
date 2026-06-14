import {User} from "lucide-react"
import {ChevronRight} from "lucide-react"
import {Lock} from "lucide-react"
import {AlertCircle} from "lucide-react"
import {LogOut} from "lucide-react"

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
            <div className="mt-5 flex flex-col  ">
                <div className="text-lg font-semibold mb-1">Account</div>
                <div className="flex bg-slate-700 gap-2 w-full items-center px-4 py-2 border-b-slate-500 border-slate-400 border cursor-pointer">
                    <div className="flex items-center justify-center border-2 w-22 h-10 border-slate-500">
                        <User className={"stroke-[#E5E7EB] size-5"}/>
                    </div>
                    <div className="text-base font-semibold text-white flex  px-2 cursor-pointer flex-col w-80">
                        <div className="font-semibold">Username</div>
                        <div className="text-sm text-[#9CA3AF] ">admin</div>
                    </div>
                    <div className="flex items-center justify-end w-full pr-2">
                        <ChevronRight className="size-5 cursor-pointer"/>
                    </div>
                </div>
                <div className="flex bg-slate-700 gap-2 w-full items-center px-4 py-2 border-b-slate-300  border-slate-400 border cursor-pointer">
                    <div className="flex items-center justify-center border-2 w-22 h-10 border-slate-500">
                        <Lock className={"stroke-[#E5E7EB] size-5"}/>
                    </div>
                    <div className="text-base font-semibold text-white flex  px-2 cursor-pointer flex-col w-80">
                        <div className="font-semibold">Password</div>
                        <div className="text-sm text-[#9CA3AF] ">Update Password</div>
                    </div>
                    <div className="flex items-center justify-end w-full pr-2">
                        <ChevronRight className="size-5 cursor-pointer"/>
                    </div>
                </div>
            </div> 
            <div className="mt-5 flex flex-col">
                <div className="text-lg font-semibold mb-1">App</div>
                <div className="flex bg-slate-700 gap-2 w-full items-center px-4 py-2 border-slate-400 border cursor-pointer">
                    <div className="flex items-center justify-center border-2 w-22 h-10 border-slate-500">
                        <AlertCircle className={"stroke-[#E5E7EB] size-5"}/>
                    </div>
                    <div className="text-base font-semibold text-white flex  px-2 cursor-pointer flex-col w-80">
                        <div className="font-semibold">About</div>
                        <div className="text-sm text-[#9CA3AF] ">Dashboard APP V.1.0.0</div>
                    </div>
                    <div className="flex items-center justify-end w-full pr-2">
                        <ChevronRight className="size-5 cursor-pointer"/>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex flex-col">
                <div className="text-lg font-semibold mb-1">Session</div>
                <div className="flex bg-slate-700 gap-2 w-full items-center px-4 py-2 border-slate-400 border cursor-pointer">
                    <div className="flex items-center justify-center border-2 w-22 h-10 border-slate-500">
                        <LogOut className={"stroke-[#E5E7EB] size-5"}/>
                    </div>
                    <div className="text-base font-semibold text-white flex  px-2 cursor-pointer flex-col w-80">
                        <div className="font-semibold">Logout</div>
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