import SettingsForm from "../../components/SettingsForm";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation} from "@tanstack/react-query";
import {updatePassword} from "../../api/updatePassword";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function ChangePassword(){
    const navigate = useNavigate();
    const passwordSchema = z.object({
        oldPassword: z.string().min(6, "Old password must be at least 6 characters long"),
        newPassword: z.string().min(6, "New password must be at least 6 characters long"),
        confirmNewPassword: z.string().min(6, "Please confirm your new password")
    }).refine((data) => data.newPassword === data.confirmNewPassword,{
        message : "New Password is not match with Confirm Password",
        path : ["confirmNewPassword"]
    })

    type PasswordFormData = z.infer<typeof passwordSchema>

    const {register, handleSubmit, formState: {errors},reset} = useForm<PasswordFormData>({resolver: zodResolver(passwordSchema)})

    const mutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success("Password Updated Successfully");
            navigate(-1);
        },
        onError: (error) => {
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Failed to update password";
                toast.error(message);
            }else{
                toast.error("Something went wrong");
            }
        }
    });
    function onSubmit(data: PasswordFormData){
        console.log(data)
        const {oldPassword,newPassword} = data;
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);
        mutation.mutate({oldPassword, newPassword});
        reset()
    }


    return (    
    <>
        <SettingsForm title="Change Password">
            <form className="flex flex-col gap-4 w-full mt-7 items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-2 gap-2">
                    <input type="password" placeholder="Old Password" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" {...register("oldPassword")}/>
                    {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
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