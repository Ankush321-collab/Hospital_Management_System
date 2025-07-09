import express, { Router } from 'express'
import { getallmessage, sendmessage } from '../controller/message.controller.js';
import { isAdminAuthenticated } from '../middleware/auth.js';

const router=express.Router();

router.post('/send',sendmessage)
router.get('/getallmessage',isAdminAuthenticated,getallmessage)

export default router;