import express from 'express'
import { deleteappointment, getallappointment, postappointment, updateappointment } from '../controller/appointment.controller.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js';

const router=express.Router();

router.post('/appointment',isPatientAuthenticated,postappointment)
router.get('/getallappointment',isAdminAuthenticated,getallappointment);
router.put('/updateappointmnet/:id',isAdminAuthenticated,updateappointment)

router.delete('/deleteappointment/:id',isAdminAuthenticated,deleteappointment);

export default router;