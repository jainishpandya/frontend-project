import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB  from './utils/dbConnect.js';
import authRouter from "./route/authRoute.js";
import clubRouter from "./route/ClubRoute.js";
import userRouter from "./route/userRoute.js";

const app = express();

app.use(express.json());
app.use(cors());



app.get('/' , (req, res) => {
    res.status(200).json({
        status: "success",
        message: "REST APIs are working",
    });
});

// all routes will be here

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/club', clubRouter)
app.use('/api/v1/user', userRouter)

// Error handler

app.use('*', (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Route not found"
    })
})

const port = process.env.PORT || 3000;

(async () => {
    await connectToDB(); // Check DB before starting server
  
    app.listen(port, () => {
      console.log(` Server running on http://localhost:${port}`);
    });
  })();