import SettingsForm from "../../components/SettingsForm";
import {useMutation} from "@tanstack/react-query";
import {changeUsername} from "../../api/changeUsername";
import toast from "react-hot-toast";
import {useContext} from "react";
import {UserContext} from "../../context";
import {useNavigate} from "react-router-dom";

function ChangeUsername(){
    const {user,setUser} = useContext(UserContext)!;
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: changeUsername,
        onSuccess: () => {
            toast.success("Username Updated ");
            navigate(-1);
        }
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
        mutation.mutate(data.newUsername as string);
        setUser((prevUser) => prevUser ? {...prevUser, username: data.newUsername as string} : prevUser);
    }

    return (    
    <>
        <SettingsForm title="Change Username">
            <form className="flex flex-col gap-4 w-full mt-7 items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col mt-2 gap-2">
                    <div className="text-lg">Your old username is : {user ? user.username : "Admin"}</div>
                    <input type="text" name="newUsername" placeholder="New Username" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                </div>
                <button type="submit" className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md mt-4 w-80">Update Username</button>
            </form>
        </SettingsForm>
    </>
    )
}

export default ChangeUsername;