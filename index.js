import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import appointment from './routes/appointment.route.js';
import auth from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Properly configured CORS (allows all origins)
app.use(cors({
    origin: "*", // Allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies if needed
}));

// Remove redundant manual CORS headers (handled by cors middleware above)

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Routes
app.use('/api/appointment', appointment);
app.use('/api/auth', auth);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
