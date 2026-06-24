import axios from "axios";

export const logout = async () => {
    try {
        await axios({
            method: "POST",
            url: "http://localhost:5000/logout",
            withCredentials: true
        });
    } catch (error) {
        console.error(error);
    }
};