import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path'
import userRoute from './routes/User.route.js'
import cookieParser from 'cookie-parser';
import productRoute from './routes/Product.route.js'
const app = express();
config();

const __dirname = path.resolve();
const PORT = 3000
// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/projects-router/dist')))
app.use(cookieParser());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'projects-router', 'dist', 'index.html'))
});
// routes
app.use('/api/Product', productRoute);
app.use('/api/User', userRoute)


// connections
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after successful connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error.message);
    });
    

    // Error middleware
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal server error';
        return res.status(statusCode).json({
            success: false,
            message,
            statusCode,
        });
    });
    
    
