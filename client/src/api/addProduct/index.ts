import axios from "axios";

export const addProduct = async (data:FormData) =>{
    try{
        await axios({
            method:"POST",
            url : "http://localhost:5000/products",
            data
        })
    }catch(error){
        throw new Error(`${error}`)
    } 
}

