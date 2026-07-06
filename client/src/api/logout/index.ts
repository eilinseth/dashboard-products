import axios from "axios";

export const logout = async () => {
        await axios({
            method: "POST",
            url: "http://localhost:5000/logout",
            withCredentials: true
        });
};