import axios from "axios";

type editParams = {
    data:FormData,
    id:number
}

export const editProduct = async({data,id}:editParams) =>{
    try{
        await axios({
            method:"PUT",
            url:`http://localhost:5000/products/${id}`,
            data
        })
    }catch(error){
        throw new Error(`${error}`)
    }
}