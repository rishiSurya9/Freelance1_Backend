import express from 'express';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const signup = async (req,res) => {
    const {name,email,password} = (req.body);
    const SaltedPass = bcrypt.hashSync(password,10);
    const newUser = new User({name,email,password:SaltedPass});
    try{
        await newUser.save();
        res.status(200).json("user created successfully");
    }
    catch(err){
        res.status(500).json("error occured");
        console.log(err);
    }
}
export const login = async (req,res) => {
    const {email,password} = (req.body);
    try{
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json("user not found");
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(401).json("invalid credentials");
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password:pass, ...userData} = user._doc;
       res.cookie('access_token',token).status(200).json("login successful");
    }
    catch(err){
        res.status(500).json("error occured");
        console.log(err);
    }
}