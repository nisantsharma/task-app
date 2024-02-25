import express from 'express';

import { getUserName, loginUser, signupUser } from '../controllers/userControllers.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/getUserName', authenticateToken, getUserName);


export default router;