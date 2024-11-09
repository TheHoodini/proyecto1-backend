import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    publishedDate: Date;
    publisher: string;
    available: boolean;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    available: { type: Boolean, default: true }
});

export default mongoose.model<IBook>('Book', BookSchema);
