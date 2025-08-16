import { NotesResponseType } from "./NotesTypes.js";
import { CreateNoteDataType } from "../validators/notes/notes.schema.js";

export interface NotesServicesTypes {
    getAll(): Promise<NotesResponseType[]>;
    create(data: CreateNoteDataType): Promise<NotesResponseType>;
    edit(noteId: string, data: CreateNoteDataType): Promise<NotesResponseType>;
    remove(noteId: string): Promise<void>;
    getById(noteId: string): Promise<NotesResponseType>;
}
