import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import reservationRoutes from './routes/reservationRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Autenticación
app.use('/auth', authRoutes);

// Libros
app.use('/books', bookRoutes);

// Test
app.get('/', (req, res) => {
    res.send('API de Biblioteca funcionando');
});

// Reservas
app.use('/reservations', reservationRoutes);

// Usuarios
app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
