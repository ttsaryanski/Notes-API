import express from "express";
import request from "supertest";

import { notesController } from "../../../../src/controllers/notesController.js";

import errorHandler from "../../../../src/middlewares/errorHandler.js";

import { NotesServicesTypes } from "../../../../src/types/ServicesTypes.js";
import { NotesResponseType } from "../../../../src/types/NotesTypes.js";
import { CreateNoteDataType } from "../../../../src/validators/notes/notes.schema.js";

const validId = "64b2f9d4f8a1e4e1c5a9c123";

const mockNotesService: jest.Mocked<NotesServicesTypes> = {
    getAll: jest.fn(),
    create: jest.fn(),
};

const app = express();
app.use(express.json());
app.use("/notes", notesController(mockNotesService));
app.use(errorHandler);

describe("Notes Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("GET /notes - should return all notes", async () => {
        const mockData = [
            {
                title: "New note",
                content: "Note content",
                _id: validId,
                createdAt: new Date(),
            },
        ];
        mockNotesService.getAll.mockResolvedValue(mockData);

        const res = await request(app).get("/notes");

        expect(res.statusCode).toBe(200);
        expect({
            ...res.body[0],
            createdAt: new Date(res.body.createdAt),
        }).toEqual({
            _id: expect.any(String),
            title: "New note",
            content: "Note content",
            createdAt: expect.any(Date),
        });
    });

    test("GET /notes - should return 500 on service error", async () => {
        mockNotesService.getAll.mockRejectedValue(
            new Error("Service failure!")
        );

        const res = await request(app).get("/notes");

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toMatch("Service failure!");
    });

    test("POST /notes - should create a note", async () => {
        const newNote: CreateNoteDataType = {
            title: "New note",
            content: "Note content",
        };
        const createdNote: NotesResponseType = {
            ...newNote,
            _id: validId,
            createdAt: new Date(),
        };
        mockNotesService.create.mockResolvedValue(createdNote);

        const res = await request(app).post("/notes").send(newNote);

        expect(res.statusCode).toBe(201);
        expect({
            ...res.body,
            createdAt: new Date(res.body.createdAt),
        }).toEqual({
            _id: expect.any(String),
            title: "New note",
            content: "Note content",
            createdAt: expect.any(Date),
        });
        expect(mockNotesService.create).toHaveBeenCalledWith(newNote);
    });

    test("POST /notes - should return 400 for invalid data", async () => {
        const invalidNote = {
            title: "A",
            content: " ",
        };

        const res = await request(app).post("/notes").send(invalidNote);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
    });
});
