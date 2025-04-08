const { createClub, listClub, deleteClub, reviveClub, editClub } = require('../controller/clubController');
const upload = require("../middleware/multer");
const router = require('express').Router();

router.post('/createclub', upload.single("file"), createClub);
router.post('/editclub', editClub);
router.get('/listclub', listClub);
router.post('/deleteclub', deleteClub);
router.post('/reviveclub', reviveClub);

module.exports = router;