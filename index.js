import express from 'express';
import mongoose from 'mongoose';
import appointment from './routes/appointment.route.js';
const app =  express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/').then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

app.use('/api/appointment',appointment);
app.listen(3000, () => {
    console.log('Server is running on port 3000');    
});
