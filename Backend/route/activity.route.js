import express from 'express';
import { getRecentActivities } from '../controller/activity.controller.js';
import { isAdminAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/recent', isAdminAuthenticated, getRecentActivities);

export default router; 