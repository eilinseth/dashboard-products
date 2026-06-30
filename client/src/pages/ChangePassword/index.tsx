import SettingsForm from "../../components/SettingsForm";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"


function ChangePassword(){
    const passwordSchema = z.object({
        oldPasword: z.string().min(6, "Old password must be at least 6 characters long"),
        newPassword: z.string().min(6, "New password must be at least 6 characters long"),
        confirmNewPassword: z.string().min(6, "Please confirm your new password")
    }).refine((data) => data.newPassword === data.confirmNewPassword,{
        message : "New Password is not match with Confirm Password",
        path : ["confirmNewPassword"]
    })

    type PasswordFormData = z.infer<typeof passwordSchema>

    const {register, handleSubmit, formState: {errors},reset} = useForm<PasswordFormData>({resolver: zodResolver(passwordSchema)})

    function onSubmit(data: PasswordFormData){
        console.log(data)
        reset()
    }

    return (    
    <>
        <SettingsForm title="Change Password">
            <form className="flex flex-col gap-4 w-full mt-7 items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-2 gap-2">
                    <input type="password" placeholder="Old Password" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" {...register("oldPasword")}/>
                    {errors.oldPasword && <p className="text-red-500 text-sm">{errors.oldPasword.message}</p>}
                    <input type="password" placeholder="New Password" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" {...register("newPassword")}/>
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                    <input type="password" placeholder="Confirm New Password" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" {...register("confirmNewPassword")}/>
                    {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>}
                </div>
                <button type="submit" className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md mt-4 w-80">Update Password</button>
            </form>
        </SettingsForm>
    </>
    )
}

export default ChangePassword;