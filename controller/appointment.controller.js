import express from 'express';
import Appointment from '../model/appointment.model.js'
import jwt from 'jsonwebtoken';
export const createAppointment = async(req,res)=>{
   const appointment = new Appointment(req.body);
   await appointment.save();
   res.status(201).json(appointment);
};
export const getAppointments = async (req, res) => {
   try {
     const appointments = await Appointment.find();
     res.status(200).json(appointments);
   } catch (error) {
     res.status(500).json({ message: "Error retrieving appointments", error });
   }
 };
 
 export const verifyAdmin = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
      return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      if (decoded.role !== "admin") {
          return res.status(403).json({ message: "Access denied. Admins only." });
      }

      req.user = decoded;
      next();
  } catch (error) {
      console.log("Invalid token:", error.message);
      return res.status(403).json({ message: "Invalid token." });
  }
};
