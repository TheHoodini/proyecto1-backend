import { Router } from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/roleMiddleware';

const router = Router();

router.post('/', authenticateToken, authorizeRole('admin'), createBook);     
router.get('/', getBooks);                                                   
router.get('/:id', getBookById);                                              
router.put('/:id', authenticateToken, authorizeRole('admin'), updateBook);   
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteBook); 

export default router;
