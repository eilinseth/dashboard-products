import axios from "axios"

export const updatePassword = async ({oldPassword, newPassword}: {oldPassword: string, newPassword: string}) => {
    try {
        await axios({
            method: "PATCH",
            url: "http://localhost:5000/user/password",
            data: {
                oldPassword,
                newPassword
            },
            withCredentials: true
        });
    } catch (error) {
        console.log("Failed to update password :",error);
        throw error;
    }
};