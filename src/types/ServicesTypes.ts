import { NoteResponseType } from "./NoteTypes.js";
import { CreateNoteDataType } from "../validators/notes/note.schema.js";

import { MealResponseType } from "./MealTypes.js";
import { CreateMealDataType } from "../validators/meals/meal.schema.js";

export interface NoteServicesTypes {
    getAll(): Promise<NoteResponseType[]>;
    create(data: CreateNoteDataType): Promise<NoteResponseType>;
    edit(noteId: string, data: CreateNoteDataType): Promise<NoteResponseType>;
    remove(noteId: string): Promise<void>;
    getById(noteId: string): Promise<NoteResponseType>;
}

export interface MealServicesTypes {
    getTop(): Promise<MealResponseType[]>;
    incrementCount(data: CreateMealDataType): Promise<void>;
}
