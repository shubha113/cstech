import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

//Register route
router.post('/register', registerUser);
//Login route
router.post('/login', loginUser);
//Get Profile
router.get('/me', isAuthenticated, getUserProfile);
//Logout route
router.post('/logout', logoutUser);

export default router;