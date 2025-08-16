import { Router, Request, Response } from "express";

import { NotesServicesTypes } from "../types/ServicesTypes.js";

import { asyncErrorHandler } from "../utils/errorUtils/asyncErrorHandler.js";
import { CustomError } from "../utils/errorUtils/customError.js";

import { createNoteSchema } from "../validators/notes/notes.schema.js";
import { mongooseIdSchema } from "../validators/mongooseId.schema.js";

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
            const resultData = createNoteSchema.safeParse(req.body);

            if (!resultData.success) {
                throw new CustomError(resultData.error.issues[0].message, 400);
            }

            const note = await notesService.create(resultData.data);
            res.status(201).json(note);
        })
    );

    router.put(
        "/:noteId",
        asyncErrorHandler(async (req, res) => {
            const resultId = mongooseIdSchema.safeParse(req.params.noteId);
            console.log(resultId.data);

            if (!resultId.success) {
                throw new CustomError(resultId.error.issues[0].message, 400);
            }

            const resultData = createNoteSchema.safeParse(req.body);
            if (!resultData.success) {
                throw new CustomError(resultData.error.issues[0].message, 400);
            }

            const note = await notesService.edit(
                resultId.data,
                resultData.data
            );

            res.status(200).json(note);
        })
    );

    router.delete(
        "/:noteId",
        asyncErrorHandler(async (req, res) => {
            const resultId = mongooseIdSchema.safeParse(req.params.noteId);
            if (!resultId.success) {
                throw new CustomError(resultId.error.issues[0].message, 400);
            }

            await notesService.remove(resultId.data);

            res.status(204).end();
        })
    );

    router.get(
        "/:noteId",
        asyncErrorHandler(async (req, res) => {
            const resultId = mongooseIdSchema.safeParse(req.params.noteId);
            if (!resultId.success) {
                throw new CustomError(resultId.error.issues[0].message, 400);
            }

            const note = await notesService.getById(resultId.data);

            res.status(200).send(note);
        })
    );

    return router;
}
