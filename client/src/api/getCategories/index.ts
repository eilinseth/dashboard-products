import axios from "axios"

export const getCategories = async() =>{
        const res = await axios.get("http://localhost:5000/categories")
        return res.data.data
}