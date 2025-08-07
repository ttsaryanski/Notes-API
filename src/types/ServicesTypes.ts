import { NotesResponseType } from "./NotesTypes.js";
import { CreateNoteDataType } from "../validators/notes/notes.schema.js";

export interface NotesServicesTypes {
    getAll(): Promise<NotesResponseType[]>;
    create(data: CreateNoteDataType): Promise<NotesResponseType>;
}
