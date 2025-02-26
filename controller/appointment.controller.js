import express from 'express';
import Appointment from '../model/appointment.model.js'
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
  const accessToken = req.cookies?.access_token;

  if (!accessToken || accessToken !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next(); // Proceed if authenticated
};