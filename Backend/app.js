import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './route/authRoute.js';
import process from 'process';

// Load environment variables
dotenv.config({ path: `${process.cwd()}/.env` });

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));

// Default route
app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "REST APIs are working",
    });
});

// Routes
app.use('/', authRouter);

// 404 Route Handler
app.use('*', (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Route not found"
    });
});

// Global Error Handler
app.use((err, req, res ) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log("Shutting down server...");
    process.exit(0);
});
