import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form";

type Props = {
    title : string
    status? : string
}


const RegistForm: React.FC<Props> = ({title,status}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const formSubmit = (data: any) => {
        console.log(data)
        reset()
    }

    return (
        <section className="fixed inset-0 bg-[#111827] py-5 px-4 w-full">
                <div className="text-[#E5E7EB] text-3xl tracking-wider text-center">{title}</div>
                <form className="w-[80%] gap-6 flex justify-center mx-auto flex-col items-center" onSubmit={handleSubmit(formSubmit)}>
                    {status === "register" && (
                        <div className="flex max-w-lg text-[#E5E7EB] mt-5 flex-col gap-2">
                            <label htmlFor="name" className="font-semibold">Name</label>
                            <input {...register("name",
                                { required: "name is required",
                                minLength: { value: 4, message: "name must be at least 4 characters" } })} type="text" className="text-slate-100 rounded-lg border-2 px-2 py-1 bg-slate-700 w-90"  placeholder="name ..."/>
                            {errors.name && <p className="text-red-500 text-sm font-semibold mt-1">{errors.name.message as string}</p>}
                    </div>)}

                    <div className="flex max-w-lg text-[#E5E7EB] flex-col gap-2">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input {...register("email",
                                { required: "email is required",
                                })} type="text" className="text-slate-100 rounded-lg border-2 px-2 py-1 bg-slate-700 w-90"  placeholder="email ..."/>
                            {errors.email && <p className="text-red-500 text-sm font-semibold mt-1">{errors.email.message as string}</p>}
                    </div>


                    <div className="flex max-w-lg text-[#E5E7EB] flex-col gap-2 ">
                        <label htmlFor="password">Password</label>
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} type="password" className="text-slate-100 rounded-lg border-2 px-2 py-1 bg-slate-700 w-90" placeholder="password ..." />
                        {errors.password && <p className="text-red-500 text-sm font-semibold mt-1">{errors.password.message as string}</p>}
                    </div>

                    <button type="submit" className="border-0 border-[navy] text-[#E5E7EB] bg-green-600 font-semibold rounded-lg p-1 px-4 mt-4 cursor-pointer">Submit</button>

                </form>
                    {status === "login" ? (
                    <div className="text-[#E5E7EB] text-center mt-5">Don't have account yet ? <nav className="text-blue-700 cursor-pointer inline" onClick={() => navigate("/register")}>Sign in</nav></div>
                    ) : (
                    <div className="text-[#E5E7EB] text-center mt-5">Already have an account ? <nav className="text-blue-700 cursor-pointer inline" onClick={() => navigate("/login")}>Login</nav></div>
                    )}
        </section>
    )
}

export default RegistForm