import express, { Router } from 'express'
import { getallmessage, sendmessage, deleteMessage, markMessageAsRead } from '../controller/message.controller.js';
import { isAdminAuthenticated } from '../middleware/auth.js';

const router=express.Router();

router.post('/send',sendmessage)
router.get('/getallmessage',isAdminAuthenticated,getallmessage)
router.delete('/message/:id', isAdminAuthenticated, deleteMessage)
router.patch('/message/:id/read', isAdminAuthenticated, markMessageAsRead)

export default router;