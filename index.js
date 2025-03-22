import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import appointment from './routes/appointment.route.js';
import auth from './routes/auth.route.js';
const app =  express();
dotenv.config();
app.use(express.json());

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:5173", "https://rentnow-indol.vercel.app"];

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Set custom CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',  "http://localhost:5173"); // Allow specific frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow necessary methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow necessary headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    next();
});

// Set custom CORS headers

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
app.listen(process.env.PORT || 5000, () => { 
    console.log('Server is running on port 5000');    
});
