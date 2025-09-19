import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    // fetch token from cookie
    const { token } = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    
    // verify the token with the secret that we have in .env
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch the user from the database using the decoded user ID and attach it to the request object
    req.user = await User.findById(decodedData.id);
    next();
});