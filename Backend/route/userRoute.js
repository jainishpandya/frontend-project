import userController from '../controller/userController.js';
import express from 'express';

const router = express.Router();

router.get('/listusers', userController.listusers);
router.get('/userDetail/:id', userController.userDetail);
router.get('/clubList', userController.clubList);

export default router;
