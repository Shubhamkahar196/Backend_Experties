// require('dotenv').config({path:'./env'})  // old 
import dotenv from 'dotenv';

// import mongoose from 'mongoose';
// import { DB_NAME } from './constrant.js';
import connectDB from './db/index.js';

dotenv.config({  // new 
    path: './env'
})


connectDB()


/*
import express from 'express'
const app = express();
// connect database 
( async () =>{
    try{
     await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error", ()=>{
        console.log("ERROR : ",error);
        throw error
     })

     app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
     })
    }catch(error){
        console.log("ERROR : ",error);
        throw err
    }
})
    */