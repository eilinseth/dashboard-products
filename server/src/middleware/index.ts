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
        req.user = decoded as {id:number,role:string}
        next()
    }catch(error){
        if(error instanceof jwt.JsonWebTokenError){
            res.status(401).json({message:"Invalid token"})
            return
        }
        res.status(401).json({message:"Unauthorized"})
    }
}

export default auth