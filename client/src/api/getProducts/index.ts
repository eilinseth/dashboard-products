import axios from "axios"

type ProductParams = {
    stock?:string
    q?:string
    category? : string

}


export const getProducts = async(params?:ProductParams) =>{
    try{
        const res = await axios.get("http://localhost:5000/products",{params})
        return res.data
    }catch(e){
        throw new Error(`${e}`)
    }
}

