import axios from "axios";

export const changeUsername = async (newUsername: string) => {
    try {
        await axios({
            method: "PATCH",
            url: "http://localhost:5000/user/username",
            data: { newUsername },
            withCredentials: true
        });
    } catch (error) {
        console.error("Error changing username:", error);
        throw error;
    }
};