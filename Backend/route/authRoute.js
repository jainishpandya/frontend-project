import authController from '../controller/authController.js';

import express from 'express';
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/set-password", authController.setPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/login", authController.login);
router.post("/verify", authController.mfa)

export default router