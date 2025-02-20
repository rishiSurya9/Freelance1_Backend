import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import appointment from './routes/appointment.route.js';
import auth from './routes/auth.route.js';
const app =  express();
dotenv.config();
app.use(express.json());

//Connecting to Database
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});
app.use(express.json());
app.use(cookieParser());
//Appointment Router
app.use('/api/appointment',appointment);
app.use('/api/auth',auth);
app.listen(5000, () => { 
    console.log('Server is running on port 5000');    
});
