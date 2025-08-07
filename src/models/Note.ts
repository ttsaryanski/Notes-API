import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
    title: string;
    content: string;
    createdAt: Date;
}

const NoteSchema = new Schema<INote>({
    title: {
        type: String,
        required: [true, "Note title is required!"],
        minLength: [3, "Note title should be at least 3 characters long!"],
    },
    content: {
        type: String,
        required: [true, "Note content is required!"],
        minLength: [3, "Note content should be at least 3 characters long!"],
    },
    createdAt: { type: Date, default: Date.now },
});

export const Note = mongoose.model<INote>("Note", NoteSchema);
