import  express,{ Router } from 'express';
import bookController from '../controller/bookController.js';

const router = express.Router();
router.get('/bookDetails/:clubId', bookController.bookDetails);
router.post('/addbook', bookController.AddBooks);
router.get('/myBooks/:clubId', bookController.myBooks);

export default router;