import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
import Agent from '../models/Agent.js';
import List from '../models/List.js';
import csv from 'csv-parser';
import fs from 'fs';
import * as XLSX from 'xlsx';

// Upload and distribute CSV/Excel file
export const uploadAndDistributeFile = catchAsyncError(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorHandler('Please upload a file', 400));
    }

    const filePath = req.file.path;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    
    let data = [];

    try {
        // Parse CSV file
        if (fileExtension === 'csv') {
            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (row) => {
                        if (row.FirstName && row.Phone && row.Notes) {
                            data.push({
                                firstName: row.FirstName,
                                phone: parseInt(row.Phone),
                                notes: row.Notes
                            });
                        }
                    })
                    .on('end', resolve)
                    .on('error', reject);
            });
        } 
        // Parse Excel file
        else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            data = jsonData.map(row => ({
                firstName: row.FirstName,
                phone: parseInt(row.Phone),
                notes: row.Notes
            })).filter(item => item.firstName && item.phone && item.notes);
        }

        // Delete uploaded file
        fs.unlinkSync(filePath);

        if (data.length === 0) {
            return next(new ErrorHandler('No valid data found in file', 400));
        }

        // Get all agents
        const agents = await Agent.find();
        if (agents.length === 0) {
            return next(new ErrorHandler('No agents found. Please create agents first', 400));
        }

        // Clear existing lists
        await List.deleteMany({});

        // Distribute data among agents
        const itemsPerAgent = Math.floor(data.length / agents.length);
        const remainingItems = data.length % agents.length;
        
        let currentIndex = 0;
        const distributedLists = [];

        for (let i = 0; i < agents.length; i++) {
            const itemCount = itemsPerAgent + (i < remainingItems ? 1 : 0);
            const agentItems = data.slice(currentIndex, currentIndex + itemCount);
            
            if (agentItems.length > 0) {
                const list = await List.create({
                    agentId: agents[i]._id,
                    items: agentItems
                });
                distributedLists.push(list);
            }
            
            currentIndex += itemCount;
        }

        res.status(200).json({
            success: true,
            message: 'File uploaded and distributed successfully',
            totalItems: data.length,
            distributedLists: distributedLists.length
        });

    } catch (error) {
        // Delete uploaded file if error occurs
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return next(new ErrorHandler('Error processing file: ' + error.message, 500));
    }
});

// Get distributed lists for all agents
export const getDistributedLists = catchAsyncError(async (req, res) => {
    const lists = await List.find().populate('agentId', 'name email mobile');

    res.status(200).json({
        success: true,
        lists
    });
});