import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import router from "./routes"
import fs from "fs"
import cookieParser from "cookie-parser"

if(!fs.existsSync('uploads')){
    fs.mkdirSync('uploads')
}
const app = express()
const port = 5000

app.use(cors({
    origin : ["http://localhost:5173", "http://192.168.56.1:5173","http://192.168.4.5:5173"],
    credentials : true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(router)

app.listen(port, () =>{
    console.log("App is Running on port",port)
})
