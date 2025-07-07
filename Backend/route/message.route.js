import express, { Router } from 'express'
import { sendmessage } from '../controller/message.controller.js';

const router=express.Router();

router.post('/send',sendmessage)

export default router;