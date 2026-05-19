import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,    // duplicate email is not allow.
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8   //minimum 8 chars
    },
    age:{
        type:Number, // Store only number
        required:true,
        min:18
    }
})

export const User = mongoose.model('User',userSchema)