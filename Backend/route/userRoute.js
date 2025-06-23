import userController from '../controller/userController.js';
import express, { Router } from 'express';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/listusers', userController.listusers);
router.post('/userdetail', userController.userDetail);
router.post('/setprofile', upload.single("file"), userController.setProfileImage);
router.get('/clubList/:userId', userController.clubList);
// router.get('/userBookList/:userId', userController.userBookList);
router.post('/listusers/memberDetails', userController.memberDetails);
router.post('/listusers/editMemberDetails', userController.editMemberDetails);

export default router;
