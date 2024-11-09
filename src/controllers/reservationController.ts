import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';  
import Reservation from '../models/reservation';
import Book from '../models/book';

export const createReservation = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { bookId, returnDate } = req.body;
        const userId = req.user?.id;

        const book = await Book.findById(bookId);
        if (!book || !book.available) {
            res.status(400).json({ message: 'El libro no está disponible' });
            return;
        }

        const reservation = new Reservation({
            user: userId,
            book: bookId,
            reservationDate: new Date(),
            returnDate
        });
        await reservation.save();

        book.available = false;
        await book.save();

        res.status(201).json({ message: 'Reserva creada exitosamente', reservation });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ message: 'Error al crear la reserva' });
    }
};

export const getUserReservations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const reservations = await Reservation.find({ user: req.user?.id }).populate('book', 'title author');
        res.json(reservations);
    } catch (error) {
        console.error("Error al obtener el historial de reservas:", error);
        res.status(500).json({ message: 'Error al obtener el historial de reservas' });
    }
};
