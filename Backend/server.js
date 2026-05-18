import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { DB_Connect } from './config/db.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:true}))   
app.use(cookieParser())

const frontendOrigin = process.env.Frontend_Url
app.use(cors({origin: frontendOrigin}))
app.post('/userdata',(req,res,next)=>{
    let {username,email,password,age} = req.body
    console.log(req.body,
        'my req.body'
    )
})


const startServer = async () =>{
   await DB_Connect()
    app.listen(4000,()=>{
        console.log("Server is running on part 4000")
    })
   
}
startServer().catch((error)=>{
console.log("Server Startup is failed",error.message)
process.exit(1)
})
