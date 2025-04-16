import userController from '../controller/userController.js';
import express, { Router } from 'express';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/listusers', userController.listusers);
router.get('/userDetail/:id', userController.userDetail);
<<<<<<< HEAD
router.post('/setprofile', upload.single("file"), userController.setProfileImage);
=======
router.get('/clubList/', userController.clubList);
>>>>>>> 21a7d9d0fc57bd3a9c3075a3d843a56456b0f19a

export default router;
