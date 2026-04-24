import { Request,Response } from "express";
import { pool } from "../db";
import type { Products , Categories} from "../types";
import { ResultSetHeader } from "mysql2"; 



const getProducts = async(req:Request,res:Response):Promise<void> => {
    try{
        const {stock,category,minPrice,maxPrice,sortBy,sortType} = req.query
        if((minPrice && Number.isNaN(Number(minPrice))) || (maxPrice && Number.isNaN(Number(maxPrice)))){
            console.error("error")
            return 
        }
        const minNumberPrice = minPrice ? Number(minPrice) : null 
        const maxNumberPrice = maxPrice ? Number(maxPrice) : null
        if(minNumberPrice !== null && maxNumberPrice !==null && minNumberPrice > maxNumberPrice){
            console.error("error")
            return
        }

        let query = "SELECT p.id,p.name,p.price,p.stock,p.description,c.name as category,p.image_url,p.created_at FROM products p JOIN categories c ON c.id = p.id_category"

        const category_id = Number(category)
        const values = []
        const conditions = []
        
        console.log(sortBy,sortType)

        if(category_id && minNumberPrice && maxNumberPrice){    
            conditions.push( " (price BETWEEN ? AND ? ) AND p.id_category = ?")
            values.push(minNumberPrice,maxNumberPrice,category_id)
        }
        if(minNumberPrice && category_id){
            conditions.push( " price >= ? AND p.id_category = ?")
            values.push(minNumberPrice,category_id)
        }
        if(maxNumberPrice && category_id){
            conditions.push( " price <= ? AND p.id_category = ?")
            values.push(maxNumberPrice,category_id)
        } 
        if(category_id){
            conditions.push( " p.id_category =?")
            values.push(category_id)
        }
        if(stock === "low") {
            conditions.push( " stock <=?")
            values.push(10)
        }
        if(minNumberPrice !== null){
            conditions.push( " price >= ?")
            values.push(minNumberPrice)
        }
        if(maxNumberPrice !== null){
            conditions.push( " price <= ?")
            values.push(maxNumberPrice)
        }

        if(conditions.length > 0){
            query += " WHERE " +conditions.join(" AND ")
            console.log(query)
        }
        console.log(conditions)
        

        const [rows] = await pool.query(query,values)
        const data = rows as Products[]
        res.json({
            status:200,
            message:"OK",
            data
        })
    }catch(error){
        console.error(error)
        res.status(500).json({error:error.message})
    }
}

const getProduct = async (req:Request,res:Response):Promise<void>  =>{
    try{
        const id = Number(req.params.id)
        if(id <=0 || Number.isNaN(id)){
            res.status(404).json({
                message:"Id not found",
            })
            return
        }

        const [rows] = await pool.query("SELECT p.id,p.name,p.price,p.stock,p.description,p.id_category,c.name as category,p.image_url,p.created_at FROM products p JOIN categories c on c.id = p.id_category WHERE p.id = ?",[id])

        const data = (rows as Products[])[0]
        res.json({
            status:200,
            message:"OK",
            data
        })



    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const addProduct = async(req:Request,res:Response):Promise<void> => {
    try{

        const {name,price,stock,description,category} = req.body
        const priceNumber = Number(price)
        const stockNumber = Number(stock)
        const categoryNumber = Number(category)
        const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null
        console.log(req.file)
        console.log(req.body)
        if(!name?.trim() || priceNumber <= 0 || Number.isNaN(priceNumber) || stockNumber <0 || Number.isNaN(stockNumber) || categoryNumber <=0 || Number.isNaN(categoryNumber) ){
            res.json({
                status:400,
                message:"Incomplete data"
            })
    
            return
        }
        const created_at = new Date()
        
        const [result] = await pool.query<ResultSetHeader>("INSERT INTO products (name,price,stock,description,id_category,image_url,created_at) values(?,?,?,?,?,?,?)",[name,priceNumber,stockNumber,description.trim(),categoryNumber,image_url,created_at])
    
        res.json({
            status:201,
            message:"Added",
            id:result.insertId
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    }

const updateProduct = async(req:Request,res:Response):Promise<void> => {
    try{
        const id = Number(req.params.id)
        if(id<=0 || Number.isNaN(id)){
            res.status(404).json({message:"Id not found"})
            return
        }
        const [rows] = await pool.query("SELECT p.id,p.name,p.price,p.stock,p.description,p.id_category,c.name as category,p.image_url,p.created_at FROM products p JOIN categories c on c.id = p.id_category WHERE p.id = ?",[id])

        const product = rows[0]

        const name = req.body.name ?? product.name
        const price = req.body.price ?? product.price
        const stock = req.body.stock ?? product.stock
        const category = req.body.category ?? product.category
        const description = req.body.description ?? product.description

        const priceNumber = Number(price)
        const stockNumber = Number(stock)
        const categoryNumber = Number(category)
        const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : product.image_url
        

        if(!name?.trim() || priceNumber <= 0 || Number.isNaN(priceNumber) || stockNumber <0 || Number.isNaN(stockNumber) || !description?.trim() || categoryNumber <= 0 || Number.isNaN(categoryNumber) ){
            res.status(400).json({message:"Incomplete data"})
            return
        }

        const [result] = await pool.query<ResultSetHeader>("UPDATE products SET name=?,price=?,stock=?,description=?,id_category=?,image_url=? WHERE id = ?",[name,priceNumber,stockNumber,description,categoryNumber,image_url,id])

        if(result.affectedRows === 0){
            res.status(404).json({message:"Id not found"})
            return
        }

        res.json({
            status:200,
            message : "Updated",
        })
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const deleteProduct = async(req:Request,res:Response):Promise<void> => {
    try{
        const id = Number(req.params.id)
        if(id<= 0 || Number.isNaN(id)){
            res.status(404).json({message:"Id not found"})
            return
        }

        const [result] = await pool.query<ResultSetHeader>("DELETE FROM products WHERE id =?",[id])

        if(result.affectedRows === 0){
            res.status(404).json({message:"Id not found"})
            return
        }
        res.json({
            status:200,
            message:"Deleted",
        })
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getCategories = async (req:Request , res:Response):Promise<void> => {
    try {
        const query = "SELECT c.id , c.name , COUNT(p.id) as ? FROM products p join categories c on c.id = p.id_category group by c.id order by c.name"
        const total = "Total_Item"
        const [rows] = await pool.query(query,total)
        const data = rows as Categories[]

        res.json({
            status : 200,
            message : "OK",
            data
        })

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}


export {getProducts,getProduct,addProduct,updateProduct,deleteProduct,getCategories}