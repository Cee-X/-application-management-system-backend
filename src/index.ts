import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import applicantRoute from './route/applicant'
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', applicantRoute);

mongoose.connect(process.env.MONGODB_URL as string)

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

const PORT = process.env.PORT || 8000;
// Routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})