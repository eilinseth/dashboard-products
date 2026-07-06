import axios from "axios";

export const getProduct = async (id:number) => {
        const res = await axios.get(`http://localhost:5000/products/${id}`)
        return res.data.data
}