import express from 'express';
import { createAgent, getAllAgents } from '../controllers/agentController.js';
import {isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();

//Create agent route
router.post('/create', createAgent);
//Get all agents
router.get('/all', isAuthenticated, getAllAgents);

export default router;