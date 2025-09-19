import app from './app.js';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

//Load enviroment variables
dotenv.config();

//Connect to db
connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});