import { Router } from 'express';
import { createReservation, getUserReservations } from '../controllers/reservationController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createReservation);            
router.get('/user', authenticateToken, getUserReservations);       

export default router;
