import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { softDeleteUser } from '../controllers/userController';

const router = Router();

router.delete('/:id', authenticateToken, softDeleteUser); 

export default router;
