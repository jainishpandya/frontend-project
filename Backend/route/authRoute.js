import { Router } from 'express';
import { signup, setPassword, login, mfa } from '../controller/authController.js';

const router = Router();

router.post("/signup", signup);
router.post("/set-password", setPassword);
router.post("/login", login);
router.post("/verify", mfa);

export default router;
