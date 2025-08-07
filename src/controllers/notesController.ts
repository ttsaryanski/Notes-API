import { Router, Request, Response } from "express";

import { NotesServicesTypes } from "../types/ServicesTypes.js";

import { asyncErrorHandler } from "../utils/errorUtils/asyncErrorHandler.js";
import { CustomError } from "../utils/errorUtils/customError.js";

import { createNoteSchema } from "../validators/notes/notes.schema.js";

export function notesController(notesService: NotesServicesTypes) {
    const router = Router();

    router.get(
        "/",
        asyncErrorHandler(async (req: Request, res: Response) => {
            const notes = await notesService.getAll();
            res.status(200).json(notes);
        })
    );

    router.post(
        "/",
        asyncErrorHandler(async (req: Request, res: Response) => {
            const result = createNoteSchema.safeParse(req.body);
            if (!result.success) {
                throw new CustomError(result.error.issues[0].message, 400);
            }

            const note = await notesService.create(result.data);
            res.status(201).json(note);
        })
    );

    return router;
}
