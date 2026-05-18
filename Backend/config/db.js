import mongoose from 'mongoose'
 
export const DB_Connect= async()=>{
 try {
    if(!process.env.MONGO_URI)
    {
        throw new Error("Mongo URI is not working")
    }
  await mongoose.connect(process.env.MONGO_URI);}
 catch (error) {
    console.log('MongoDb connection failed',error.message)
    process.exit(1)
    }}

