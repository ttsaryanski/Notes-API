import mongoose, { Schema, Document } from "mongoose";

export interface IMeal extends Document {
    title: string;
    meal_id: number;
    img_url: string;
    count: number;
    createdAt: Date;
    updatedAt: Date;
}

const MealSchema = new Schema<IMeal>({
    title: {
        type: String,
        required: [true, "Meal title is required"],
        minlength: [1, "Meal title must be at least 1 characters long"],
    },
    meal_id: { type: Number, required: [true, "Meal ID is required"] },
    img_url: { type: String, required: [true, "Image URL is required"] },
    count: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Meal = mongoose.model<IMeal>("Meal", MealSchema);
