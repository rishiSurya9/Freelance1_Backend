import express from 'express';
import { createAppointment , verifyAdmin, getAppointments } from '../controller/appointment.controller.js';
const router = express.Router();

router.post('/createAppointment', createAppointment);
router.get("/getAppointments",verifyAdmin, getAppointments);

export default router;