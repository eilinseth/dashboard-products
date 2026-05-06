function LoginPage (){
    return (
        <section className="fixed inset-0 bg-[#111827] py-5 px-4 w-full">
                <div className="text-[#E5E7EB] text-3xl tracking-wider text-center">Login</div>
                <form className="w-[80%] gap-6 flex justify-center mx-auto flex-col items-center" >
                    <div className="flex max-w-lg text-[#E5E7EB] mt-5 flex-col gap-2">
                        <label htmlFor="username" className="font-semibold">Username</label>
                        <input type="text" className="text-slate-100 rounded-lg border-2 px-2 py-1 bg-slate-700 w-90"  placeholder="username ..."/>
                    </div>


                    <div className="flex max-w-lg text-[#E5E7EB] flex-col gap-2 ">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="text-slate-100 rounded-lg border-2 px-2 py-1 bg-slate-700 w-90" placeholder="password ..." />
                    </div>

                    <button type="submit" className="border-0 border-[navy] text-[#E5E7EB] bg-green-600 font-semibold rounded-lg p-1 px-4 mt-4">Submit</button>

                    <div className="text-[#E5E7EB]">Don't have account yet ? <nav className="text-blue-700 cursor-pointer inline">Sign in</nav></div>
                </form>
        </section>
    )
}

export default LoginPage