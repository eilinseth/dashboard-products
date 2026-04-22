import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import router from "./routes"
import fs from "fs"

if(!fs.existsSync('uploads')){
    fs.mkdirSync('uploads')
}
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(router)

app.listen(port, () =>{
    console.log("App is Running on port",port)
})
