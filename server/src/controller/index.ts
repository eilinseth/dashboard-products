import { Request,Response } from "express";
import { pool } from "../db";
import type { Products , Categories} from "../types";
import { ResultSetHeader, RowDataPacket } from "mysql2"; 
import { Role } from "../types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const getProducts = async(req:Request,res:Response):Promise<void> => {
    try{
        const {stock,category,minPrice,maxPrice} = req.query
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
        const rawPage = Number(req.query.page)
        let page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage
        const limit = 10
        const offset = (page - 1) * limit
        let query = "SELECT p.id,p.name,p.price,p.stock,p.description,c.name as category,p.image_url,p.created_at FROM products p JOIN categories c ON c.id = p.id_category"

        const category_id = Number(category)
        const values = []
        const conditions = []
        const inputSortBy = String(req.query.sortBy)
        const inputSortType = String(req.query.sortType)
        const searchItem = req.query.searchItem 
        console.log(page)
        
        if(typeof searchItem === "string"){
            const searchItemTrimmed = searchItem.trim()
            if(searchItemTrimmed){
                conditions.push("p.name LIKE ?")
                values.push(`%${searchItemTrimmed}%`)
            }
        }
        if(category_id && minNumberPrice && maxNumberPrice){    
            conditions.push( "(price BETWEEN ? AND ? ) AND p.id_category = ?")
            values.push(minNumberPrice,maxNumberPrice,category_id)
        }
        if(minNumberPrice && category_id){
            conditions.push( "price >= ? AND p.id_category = ?")
            values.push(minNumberPrice,category_id)
        }
        if(maxNumberPrice && category_id){
            conditions.push( "price <= ? AND p.id_category = ?")
            values.push(maxNumberPrice,category_id)
        } 
        if(category_id){
            conditions.push( "p.id_category =?")
            values.push(category_id)
        }
        if(stock === "low") {
            conditions.push( "stock <=?")
            values.push(10)
        }
        if(minNumberPrice !== null){
            conditions.push( "price >= ?")
            values.push(minNumberPrice)
        }
        if(maxNumberPrice !== null){
            conditions.push( "price <= ?")
            values.push(maxNumberPrice)
        }
        if(conditions.length > 0){
            query += " WHERE " + conditions.join(" AND ")
        }
        if(typeof inputSortBy === "string"){
            const sortBy = ['name','price','stock','created_at'].includes(inputSortBy) ? inputSortBy : 'created_at'
            const sortType = inputSortType === 'asc' ? 'asc' : 'desc'
            if(sortBy){
                query += (` ORDER BY p.${sortBy} ${sortType}`)
            }

        }
        if(page){
            query += " limit ? offset ?"
            values.push(limit,offset)
        }
        console.log(offset)
        console.log(query)
        const [total] = await pool.query("SELECT count(*) as total from products")
        console.log(total[0].total)
        const totalData = total[0].total
        const [rows] = await pool.query(query,values)
        const data = rows as Products[]
        let totalPage = Math.ceil(total[0].total / limit)
        if( page > totalPage && totalPage > 0) page = totalPage 

        res.json({
            status:200,
            message:"OK",
            data,
            total : totalData,
            limit,
            page
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

        const {name,price,stock,category} = req.body
        const priceNumber = Number(price)
        const stockNumber = Number(stock)
        const categoryNumber = Number(category)
        const description = typeof req.body.description === "string" ? req.body.description.trim() || "" : ""
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
        
        const [result] = await pool.query<ResultSetHeader>("INSERT INTO products (name,price,stock,description,id_category,image_url,created_at) values(?,?,?,?,?,?,?)",[name,priceNumber,stockNumber,description,categoryNumber,image_url,created_at])
    
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
        const rawDescription = req.body.description ?? product.description
        const description = typeof rawDescription === "string" ? rawDescription.trim() : ""

        const priceNumber = Number(price)
        const stockNumber = Number(stock)
        const categoryNumber = Number(category)
        const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : product.image_url
        

        if(!name?.trim() || priceNumber <= 0 || Number.isNaN(priceNumber) || stockNumber <0 || Number.isNaN(stockNumber)  || categoryNumber <= 0 || Number.isNaN(categoryNumber) ){
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

const register = async(req:Request,res:Response):Promise<void> => {
    try{
        const {name:rawName,email:rawEmail,password} = req.body
        const name = rawName?.trim()
        const email = rawEmail?.trim()
        if(!name || !email || !password?.trim() || password.length < 8 || !email.includes("@")){
            res.status(400).json({message:"Bad Request"})
            return
        }
        const created_at = new Date()
        const updated_at = new Date()
        const role : Role = Role.User
        const hashedPassword = await bcrypt.hash(password,10) 
        const [duplicateEmail] = await pool.query<RowDataPacket[]>("SELECT id FROM users WHERE email = ?",[email])
        if(duplicateEmail.length > 0){
            res.status(409).json({message:"Email already exists"})
            return
        }
        
        const result = await pool.query<ResultSetHeader>("INSERT INTO users (name,email,password,role,created_at,updated_at) VALUES (?,?,?,?,?,?)",[name,email,hashedPassword,role,created_at,updated_at])

        res.status(201).json({
            message:"User Registered",
            id:result[0].insertId
        })
        
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({message:error.message})
            return
        }
        res.status(500).json({message:"Internal Server Error"})
    }
}

const login = async (req:Request,res:Response):Promise<void> => {
    try{
        const {email:rawEmail,password} = req.body
        const email = rawEmail?.trim()
        if(!email || !password?.trim()){
            res.status(400).json({message:"Bad Request"})
            return
        }
        const [rows] = await pool.query<RowDataPacket[]>("SELECT id,name,email,password,role FROM users WHERE email = ?",[email])
        if(rows.length === 0){
            res.status(401).json({message:"Invalid email or password"})
            return
        }
        const user = rows[0]
        const hashedPassword = user.password
        const isPasswordValid = await bcrypt.compare(password,hashedPassword)
        if(!isPasswordValid){
            res.status(401).json({message:"Invalid email or password"})
            return
        }
        const secret = process.env.JWT_SECRET
        const expiresIn = process.env.JWT_EXPIRES_IN || "30m"
        if(!secret || !expiresIn){
            res.status(500).json({message:"JWT secret or expiresIn not configured"})
            return
        }
        const token = jwt.sign({id:user.id,username:user.name,email:user.email,role:user.role},secret as string,{expiresIn: "2h" }) 
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge: 30 * 60 * 1000
        })
        res.status(200).json({
            message:"Login successful",
            user : {
                id:user.id,
                role:user.role
            }
        })
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({message:error.message})
            return
        }
        res.status(500).json({message:"Internal Server Error"})
    }
}

const logout = (req:Request,res:Response):void => {
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
    res.status(200).json({message:"Logout successful"})
}

const getMe = (req:Request,res:Response) => {
    res.json({user:req.user})
}

const updateUsername = async (req:Request,res:Response):Promise<void> => {
    try{
        const {newUsername} = req.body
        const userName = newUsername.trim()
        if(!userName || userName.length < 3){
            res.status(400).json({message:"Invalid Username"})
            return
        }

        const userId = req.user.id

        const [result] = await pool.query<ResultSetHeader>("UPDATE users SET name = ? WHERE id = ?",[userName,userId])
        if(result.affectedRows === 0){
            res.status(404).json({message:"User not found"})
            return
        }
        res.json({message:"Username Updated"})

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({message:error.message})
            return
        }
        res.status(500).json({message:"Internal Server Error"})
        return
    }
}

export {getProducts,getProduct,addProduct,updateProduct,deleteProduct,getCategories,register,login,getMe,updateUsername,logout}