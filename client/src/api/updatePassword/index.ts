import axios from "axios"

export const updatePassword = async ({oldPassword, newPassword}: {oldPassword: string, newPassword: string}) => {
        await axios({
            method: "PATCH",
            url: "http://localhost:5000/user/password",
            data: {
                oldPassword,
                newPassword
            },
            withCredentials: true
        });
};