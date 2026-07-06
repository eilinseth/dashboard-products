import axios from "axios";

export const changeUsername = async (newUsername: string) => {
        await axios({
            method: "PATCH",
            url: "http://localhost:5000/user/username",
            data: { newUsername },
            withCredentials: true
        });
};