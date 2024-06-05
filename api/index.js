import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRouters from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log("error while connecting to mongodb",err)
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log("Server runing in port 3000")
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRouters);
app.use("/api/admin", adminRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
});