import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log("error while connecting to mongodb",err)
});

const app = express();

app.listen(3000, ()=>{
    console.log("Server runing in port 3000")
})