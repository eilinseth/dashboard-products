import jwt from "jsonwebtoken"
import { Request,Response,NextFunction } from "express"

const auth = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.cookies.token
    if (!token){
        res.status(401).json({message:"Unauthorized"})
        return
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET!)
        console.log(decoded)
        req.user = decoded as {id:number,username:string,email:string,role:string}
        next()
    }catch(error){
        if(error instanceof jwt.JsonWebTokenError){
            res.status(401).json({message:"Invalid token"})
            return
        }
        res.status(401).json({message:"Unauthorized"})
        return
    }
}

export default auth