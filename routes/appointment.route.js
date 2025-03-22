import express from 'express';
import { createAppointment , getAppointments } from '../controller/appointment.controller.js';
const router = express.Router();

router.post('/createAppointment', createAppointment);
router.get("/getAppointments", getAppointments);

export default router;