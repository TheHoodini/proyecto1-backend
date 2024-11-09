import mongoose, { Document, Schema } from 'mongoose';

interface IReservation extends Document {
    user: mongoose.Types.ObjectId;
    book: mongoose.Types.ObjectId;
    reservationDate: Date;
    returnDate: Date;
}

const ReservationSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
    reservationDate: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true }
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
