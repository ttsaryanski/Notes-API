import { Router, Request, Response } from "express";

import { asyncErrorHandler } from "../utils/errorUtils/asyncErrorHandler.js";
import { CustomError } from "../utils/errorUtils/customError.js";

import { MealServicesTypes } from "../types/ServicesTypes.js";
import { createMealSchema } from "../validators/meals/meal.schema.js";

export function mealControllers(mealServices: MealServicesTypes) {
    const router = Router();

    router.get(
        "/top",
        asyncErrorHandler(async (req: Request, res: Response) => {
            const meals = await mealServices.getTop();
            res.status(200).json(meals);
        })
    );

    router.post(
        "/increment",
        asyncErrorHandler(async (req: Request, res: Response) => {
            const resultData = createMealSchema.safeParse(req.body);

            if (!resultData.success) {
                throw new CustomError(resultData.error.issues[0].message, 400);
            }

            await mealServices.incrementCount(resultData.data);
            res.status(204).end();
        })
    );

    return router;
}
