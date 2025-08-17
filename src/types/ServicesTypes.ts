import { NoteResponseType } from "./NoteTypes.js";
import { CreateNoteDataType } from "../validators/notes/note.schema.js";

import { UserResponseType } from "./UserTypes.js";
import { CreateUserDataType } from "../validators/notes/user.schema.js";

export interface NoteServicesTypes {
    getAll(): Promise<NoteResponseType[]>;
    create(data: CreateNoteDataType): Promise<NoteResponseType>;
    edit(noteId: string, data: CreateNoteDataType): Promise<NoteResponseType>;
    remove(noteId: string): Promise<void>;
    getById(noteId: string): Promise<NoteResponseType>;
}

export interface AuthServicesTypes {
    register(data: CreateUserDataType): Promise<string>;
    login(data: CreateUserDataType): Promise<string>;
    logout(): Promise<void>;
    getUserById(): Promise<UserResponseType>;
}
