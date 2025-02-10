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
    }
}