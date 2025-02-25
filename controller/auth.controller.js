import express from 'express';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const signup = async (req,res) => {
    const {username,email,password} = (req.body);
    const SaltedPass = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:SaltedPass});
    try{
        await newUser.save();
        return res.status(200).json("user created successfully");
    }
    catch(err){
        return res.status(500).json("error occured");
        console.log(err);
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body; 
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" }); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" }); 
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Send response with cookie
        const { password: pass, ...userData } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        }).status(200).json(userData);

    } catch (err) {
        console.error("Login Error:", err); 
        return res.status(500).json({ message: "An error occurred", error: err.message });
    }
};