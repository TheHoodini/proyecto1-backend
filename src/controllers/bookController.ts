import { Request, Response } from 'express';
import Book from '../models/book';

// Crear 
export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, genre, publishedDate, publisher } = req.body;

        const book = new Book({ title, author, genre, publishedDate, publisher });
        await book.save();

        res.status(201).json({ message: 'Libro creado exitosamente', book });
    } catch (error) {
        console.error("Error al crear libro:", error);
        res.status(500).json({ message: 'Error al crear el libro' });
    }
};

// Leer 
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { genre, author, publisher, available, startDate, endDate } = req.query;

        // filtos
        const filters: any = {};
        if (genre) filters.genre = genre;
        if (author) filters.author = author;
        if (publisher) filters.publisher = publisher;
        if (available) filters.available = available === 'true';
        if (startDate || endDate) {
            filters.publishedDate = {};
            if (startDate) filters.publishedDate.$gte = new Date(startDate as string);
            if (endDate) filters.publishedDate.$lte = new Date(endDate as string);
        }

        const books = await Book.find(filters);
        res.json(books);
    } catch (error) {
        console.error("Error al obtener libros con filtros:", error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
};

// Leer por ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: 'Libro no encontrado' });
            return;
        }
        res.json(book);
    } catch (error) {
        console.error("Error al obtener el libro:", error);
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
};

// Actualizar por ID
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            res.status(404).json({ message: 'Libro no encontrado' });
            return;
        }
        res.json({ message: 'Libro actualizado exitosamente', book });
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
};

// Eliminar (soft delete) por ID
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { available: false });
        if (!book) {
            res.status(404).json({ message: 'Libro no encontrado' });
            return;
        }
        res.json({ message: 'Libro eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar el libro:", error);
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
};
