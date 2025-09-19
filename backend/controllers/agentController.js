import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Agent from "../models/Agent.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createAgent = catchAsyncError(async(req, res, next) =>{
    const {name, email, mobile, password} = req.body;
    if(!name || !email || !mobile || !password){
        return next(new ErrorHandler("Please enter all the fields", 400));
    }

    const existingAgent = await Agent.findOne({email}).select("-password");
    if(existingAgent){
        return next(new ErrorHandler("Agent already exists with this email", 400))
    }

    const user = await Agent.create({
        name,
        email,
        mobile,
        password,

    })

    res.status(201).json({
        success: true,
        message: 'Agent created successfully',
        user
    });
});

//Get all the agents
export const getAllAgents = catchAsyncError(async (req, res) => {
    const agents = await Agent.find().select('-password');

    res.status(200).json({
        success: true,
        agents
    });
});