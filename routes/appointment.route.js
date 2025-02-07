import express from 'express';
import { createAppointment } from '../controller/appointment.controller.js';
const router = express.Router();

router.post('/create', createAppointment);

export default router;