import  express,{ Router } from 'express';
import bookController from '../controller/bookController.js';

const router = express.Router();
router.get('/bookDetails/:clubId', bookController.bookDetails);
router.post('/addbook', bookController.AddBooks);
router.put('/updateBook/:bookId', bookController.EditBook);
router.get('/myBooks', bookController.myBooks);
router.get('/dashboardData', bookController.dashboardData);

export default router;