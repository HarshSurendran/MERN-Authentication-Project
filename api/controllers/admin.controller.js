import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from '../utils/error.js';
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const adminLogin = async (req,res,next) => {
    const { email, pass } = req.body;
    console.log("this is email",email,pass);
    try {
        const validAdmin = await Admin.findOne({email});
        console.log(validAdmin,"This is valid admin");

        if(!validAdmin) return next(errorHandler(404, "Admin not found"));

        if( pass === validAdmin.password) return next(errorHandler(401,"Wrong Credentials"));    

        const token = jwt.sign({id:validAdmin._id }, process.env.JWT_SECRET);
        const {password:password, ...rest} = validAdmin._doc
        
        res
        .cookie('admin_access_token', token, { httpOnly:true, expires: new Date(Date.now() + 3600000) })
        .status(200)
        .json(rest)
        
    } catch (error) {
        console.log(error);
        next(error)      
    }
}

export const adminSignout = async (req,res,next) => {
    res.clearCookie('admin_access_token').status(200).json('Signout success.')
};

export const adminSignUp = async (req,res,next) => {
    const {username,email,password} = req.body;
    const newAdmim = new Admin(
        {
            username,
            email,
            password
        }
    );
    try {
        await newAdmim.save();
        res.status(201).json({
            message: "Admin created succesfully"
        });        
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const users = async (req,res) => {
    try {
        const users = await User.find().sort({_id:-1});
        if(users){
            res.status(200).json(users);
        }
    } catch (error) {
        console.log("This is the error while fetching whole users. : ",error)
    }
}

export const deleteUser = async (req,res) => {
    try {
        const deleteduser = await User.deleteOne({ _id: req.params.id });
        console.log(deleteduser);
        res.status(200).json("user deleted");
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (req,res) => {
    try {
        const user = await User.findById({_id: req.params.id});
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

export const editUser = async (req,res,next) => {
    try {
        console.log("This is body in edit user ",req.body);
        if(req.body.password){
            req.body.password = await bcryptjs.hash(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.body.id, {
            $set: {
                username: req.body.userName,
                email: req.body.email,
                password: req.body.password,
            }
        },
        {
            new: true
        });
        const { password, ...rest } = updatedUser._doc;
        console.log("This is updated user",rest);
        res.status(200).json(rest);        
    } catch (error) {
        next(error);
    }
}