import axios from "axios";

type editParams = {
    data:FormData,
    id:number
}

export const editProduct = async({data,id}:editParams) =>{
        await axios({
            method:"PUT",
            url:`http://localhost:5000/products/${id}`,
            data
        })
}