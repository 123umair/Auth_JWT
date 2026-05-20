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


app.use(cors({origin: frontendOrigin,
    credentials:true
}))

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
    res.cookie('token',token, 
      {  httpOnly:true, // React ka JavaScript is cookie ko read nahi kar sakega (XSS protection)
        secure:false, //Agar localhost (development) hai to false, production (HTTPS) par true karein
        sameSite:'lax' //// Cross-site requests ke liye safe option
   })
    const user =  await newUser.save()
    res.json({sucess:true,message:"hello this is token"})
}
   catch (error) {
    console.log(error.message,'error')
    
   }
    
})
app.post('/login',async(req,res)=>{
   
    const user = await User.findOne({email:req.body.email})
    console.log('user',user)
    if(!user)
    {
        res.json({success:false,message:"error user is not found"})
        return
    }
    res.json({sucess:true,user})
    
   
})
app.post('/logout',(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
    res.json({success:true,message:'user successfully logedout'})
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
