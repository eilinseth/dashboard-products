function Header ({navLoc}:{navLoc?:string}) {

    return(
        <> 
            <header className="flex items-center justify-center bg-[#1f2937] text-3xl text-[#E5E7EB] h-14 w-full border-b-2 border-slate-800 shadow-lg">
                {navLoc}
            </header>
        </>
    )
}


export default Header