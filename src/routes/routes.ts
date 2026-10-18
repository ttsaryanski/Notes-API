import { Router } from "express";

import noteRoutes from "./note/noteController.js";
import mealRoutes from "./meal/mealController.js";

const routes = Router();

routes.use("/notes", noteRoutes);
routes.use("/meals", mealRoutes);

export default routes;
