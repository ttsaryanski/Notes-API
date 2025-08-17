import { Note } from "../models/Note.js";

import { NoteResponseType } from "../types/NoteTypes";
import { NoteServicesTypes } from "../types/ServicesTypes";
import { CreateNoteDataType } from "../validators/notes/note.schema";

import { CustomError } from "../utils/errorUtils/customError.js";

export const noteService: NoteServicesTypes = {
    async getAll(): Promise<NoteResponseType[]> {
        const notes = await Note.find().select("-__v").lean();

        return notes.map((note) => ({
            _id: note._id.toString(),
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
        }));
    },

    async create(data: CreateNoteDataType): Promise<NoteResponseType> {
        const newNote = (await Note.create(data)) as NoteResponseType;
        return {
            _id: newNote._id.toString(),
            title: newNote.title,
            content: newNote.content,
            createdAt: newNote.createdAt,
        };
    },

    async edit(
        noteId: string,
        data: CreateNoteDataType
    ): Promise<NoteResponseType> {
        const updatedNote = (await Note.findByIdAndUpdate(noteId, data, {
            runValidators: true,
            new: true,
        })) as NoteResponseType;

        if (!updatedNote) {
            throw new CustomError("Note not found!", 404);
        }
        return {
            _id: updatedNote._id.toString(),
            title: updatedNote.title,
            content: updatedNote.content,
            createdAt: updatedNote.createdAt,
        };
    },

    async remove(noteId: string): Promise<void> {
        const result = await Note.findByIdAndDelete(noteId);

        if (!result) {
            throw new CustomError("Note not found!", 404);
        }
    },

    async getById(noteId: string): Promise<NoteResponseType> {
        const note = (await Note.findById(noteId)) as NoteResponseType;

        if (!note) {
            throw new CustomError("There is no note with this id!", 404);
        }

        return {
            _id: note._id.toString(),
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
        };
    },
};
