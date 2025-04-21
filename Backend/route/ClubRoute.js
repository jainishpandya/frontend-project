import clubController from '../controller/clubController.js';
import upload from '../middleware/multer.js';

import express from 'express';
const router = express.Router();


router.post('/createclub', upload.single("file"), clubController.createClub);
router.post('/editclub', clubController.editClub);
router.get('/listclub', clubController.listClub);
router.post('/deleteclub', clubController.deleteClub);
router.post('/reviveclub', clubController.reviveClub);
router.get('/listmember', clubController.memberList);
router.post('/clubdetails', clubController.clubdetails);

export default router;