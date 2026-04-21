import axios from "axios"
import type { product } from "../../types"

type ProductParams = {
    stock?:string
    q?:string
    category? : string

}

export const getProducts = async(params?:ProductParams):Promise<product[]> =>{
    try{
        const res = await axios.get("http://localhost:5000/products",{params})
        return res.data.data
    }catch(e){
        throw new Error(`${e}`)
    }
}

