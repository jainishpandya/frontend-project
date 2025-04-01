import dotenv from "dotenv";
import nodemailer from "nodemailer";
import process from "process";

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Fixed variable name
        pass: process.env.EMAIL_PASSWORD,
    }
});

export const mailOptions = (email_receiver, subject, text, html) => {
    return {
        from: process.env.EMAIL_USER,
        to: email_receiver,
        subject: subject,
        text: text,
        html: html
    };
};
