import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';


export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can update only your account!'))
    }
    try {
        console.log(req.body);
        if(req.body.password){
            req.body.password = await bcryptjs.hash(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        },
        {
            new: true
        });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);        
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req,res,next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, "You can delete only your account."));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token').status(200).json('User has been deleted.')
        
    } catch (error) {
        next(error);
    }
}

export const checkUser = async (req,res,next) => {
    const { id } = req.user;
    try {
        console.log(id,"This is test user data");
        const validUser = await User.findById(id);
        if (validUser) {
            console.log(validUser);
            res.status(200).json({ status : true, message: "user valid"});
        } else {
            res.status(404).json({ status : false, message: "User not found" });
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status : false, message: "Server error", error });
    }
}