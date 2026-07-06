import axios from "axios";

export const deleteProduct = async(id:number) =>{
        await axios.delete(`http://localhost:5000/products/${id}`)
}