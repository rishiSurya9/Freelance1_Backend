import express from 'express';
import Appointment from '../model/appointment.model.js'
export const createAppointment = async(req,res)=>{
   const appointment = new Appointment(req.body);
   await appointment.save();
   res.status(201).json(appointment);
};