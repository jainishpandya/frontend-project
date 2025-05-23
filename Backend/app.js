import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB  from './utils/dbConnect.js';



import authRouter from "./route/authRoute.js";
import clubRouter from "./route/ClubRoute.js";
import userRouter from "./route/userRoute.js";
import bookRouter from "./route/bookRoute.js";
import categoryRouter from "./route/categoryRoute.js";
import languageRouter from "./route/languageRoute.js";
import transactionRouter from "./route/transactionRoute.js";

import user from './db/models/user.js';
import club from './db/models/club.js';
import clubuser from './db/models/clubuser.js';
import { initialiseAssociations } from './db/models/associations.js';
import book from './db/models/book.js';
import language from './db/models/language.js';
import category from './db/models/category.js';
import transaction from './db/models/transaction.js';
import location from './db/models/location.js';

initialiseAssociations();

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
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/language', languageRouter)
app.use('/api/v1/transaction', transactionRouter)

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





// Database Relation Area (!!!!!!!!!DO NOT CHANGE!!!!!!!!)

user.hasMany(clubuser);
// user.hasMany(transaction);
club.hasMany(clubuser);
club.hasMany(transaction);
club.hasMany(location);
user.hasMany(book);
club.hasMany(book);
language.hasMany(book);
category.hasMany(book);
book.hasMany(transaction);
