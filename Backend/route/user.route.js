import {Signup,login} from '../controller/User.controller.js'
import express, { application, Router } from 'express'

const router=express.Router();

router.post('/signup',Signup);
router.post('/login',login);


export default router;