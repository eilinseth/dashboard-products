import SettingsForm from "../../components/SettingsForm";

function ChangePassword(){

    return (    
    <>
        <SettingsForm title="Change Password">
            <form className="flex flex-col gap-4 w-full mt-7 items-center">
                <div className="flex flex-col mt-2 gap-2">
                    <input type="password" placeholder="Old Password" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                    <input type="password" placeholder="New Password" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                    <input type="password" placeholder="Confirm New Password" className="w-80 bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                </div>
                <button type="submit" className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md mt-4 w-80">Update Password</button>
            </form>
        </SettingsForm>
    </>
    )
}

export default ChangePassword;