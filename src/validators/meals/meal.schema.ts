import { z } from "zod";

export const createMealSchema = z.object({
    title: z
        .string()
        .min(1, "Meal title must be at least 1 characters long")
        .trim(),
    meal_id: z.number(),
    img_url: z.url("Invalid file URL!"),
});
export type CreateMealDataType = z.infer<typeof createMealSchema>;
