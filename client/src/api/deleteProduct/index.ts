import axios from "axios";

export const deleteProduct = async(id:number) =>{
    try{
        await axios.delete(`http://localhost:5000/products/${id}`)
    }catch(error){
        throw new Error(`${error}`)
    }
}