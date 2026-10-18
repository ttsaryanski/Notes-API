import { Meal } from "../models/Meal.js";

import { MealServicesTypes } from "../types/ServicesTypes.js";
import { CreateMealDataType } from "../validators/meals/meal.schema.js";
import { MealResponseType } from "../types/MealTypes.js";

export const mealServices: MealServicesTypes = {
    async getTop(): Promise<MealResponseType[]> {
        const meals = await Meal.find()
            .sort({ count: -1, title: 1 })
            .select("-__v")
            .limit(6)
            .lean();

        return meals.map((meal) => ({
            _id: meal._id.toString(),
            title: meal.title,
            meal_id: meal.meal_id,
            img_url: meal.img_url,
            count: meal.count,
            createdAt: meal.createdAt,
            updatedAt: meal.updatedAt,
        }));
    },

    async incrementCount(data: CreateMealDataType): Promise<void> {
        const mealId = Number(data.meal_id);

        await Meal.findOneAndUpdate(
            { meal_id: mealId },
            {
                $set: {
                    title: data.title,
                    img_url: data.img_url,
                },
                $inc: { count: 1 },
            },
            {
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        );
    },
};
