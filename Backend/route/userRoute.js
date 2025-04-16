import userController from '../controller/userController.js';
import express, { Router } from 'express';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/listusers', userController.listusers);
router.get('/userDetail/:id', userController.userDetail);
router.post('/setprofile', upload.single("file"), userController.setProfileImage);
router.get('/clubList/:userId', userController.clubList);

export default router;
