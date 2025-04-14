import userController from '../controller/userController.js';
import express from 'express';

const router = express.Router();

router.get('/listusers', userController.listusers);
router.get('/userDetail/:id', userController.userDetail);

export default router;
