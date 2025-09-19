import express from 'express';
import multer from 'multer';
import path from 'path';
import { getDistributedLists, uploadAndDistributeFile } from '../controllers/listController.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Only CSV, XLSX, and XLS files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

//Upload and distribute file route
router.post('/upload', isAuthenticated, upload.single('file'), uploadAndDistributeFile);
//Get distributes lists
router.get('/distributed', isAuthenticated, getDistributedLists);

export default router;