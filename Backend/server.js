import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { DB_Connect } from './config/db.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true}))   

app.use(cookieParser())

import { User } from './Models/userSchema.js'

const frontendOrigin = process.env.Frontend_Url


app.use(cors({origin: frontendOrigin}))

app.post('/userdata',async(req,res,next)=>{
   try {
    let {username,email,password,age} = req.body
    const salt = await bcryptjs.genSalt(10)
    const hashpassword = await bcryptjs.hash(password,salt)
  
    const newUser = new User({username,
        email,
        password:hashpassword,
        age})
  
    let token = jwt.sign({email},'secretkey') // now this is token and we will send this token as a cookie in the frontend
    res.cookie('token',token)
    const user =  await newUser.save()
    res.json({sucess:true,message:"hello this is token"})
}
   catch (error) {
    console.log(error.message,'error')
    
   }
    
})
app.post('/login',(req,res)=>{
    let {username,password} = req.body
    console.log('request body',req.body)
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
