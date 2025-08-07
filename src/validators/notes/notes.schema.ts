import { z } from "zod";

export const createNoteSchema = z.object({
    title: z
        .string()
        .min(3, "Note title should be at least 3 characters long!")
        .trim(),
    content: z
        .string()
        .min(3, "Note content should be at least 3 characters long!"),
});

export type CreateNoteDataType = z.infer<typeof createNoteSchema>;
