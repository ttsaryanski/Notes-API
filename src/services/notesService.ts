import { Note } from "../models/Note.js";

import { NotesResponseType } from "../types/NotesTypes.js";
import { NotesServicesTypes } from "../types/ServicesTypes.js";
import { CreateNoteDataType } from "../validators/notes/notes.schema.js";

export const notesService: NotesServicesTypes = {
    async getAll(): Promise<NotesResponseType[]> {
        const notes = await Note.find().select("-__v").lean();

        return notes.map((note) => ({
            _id: note._id.toString(),
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
        }));
    },

    async create(data: CreateNoteDataType): Promise<NotesResponseType> {
        const newNote = (await Note.create(data)) as NotesResponseType;
        return {
            _id: newNote._id.toString(),
            title: newNote.title,
            content: newNote.content,
            createdAt: newNote.createdAt,
        };
    },
};
