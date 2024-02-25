import express from 'express';

import { authenticateToken } from '../middlewares/authMiddleware.js';
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/taskControllers.js';


const router = express.Router();


router.post('/create', authenticateToken, createTask);
router.put('/update/:taskId', authenticateToken, updateTask);
router.delete('/delete/:taskId', authenticateToken, deleteTask);
router.get('/getTask/:taskId', getTask);
router.get('/getAllTasks', authenticateToken, getAllTasks);


export default router;