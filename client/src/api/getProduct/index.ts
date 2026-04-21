import axios from "axios";

export const getProduct = async (id:number) => {
    try{
        const res = await axios.get(`http://localhost:5000/products/${id}`)
        return res.data.data

    }catch(error){
        throw new Error(`${error}`)
    }
}