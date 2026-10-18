import { Router } from "express";

import { mealControllers } from "../../controllers/mealControllers.js";
import { mealServices } from "../../services/mealServices.js";

const router = Router();

router.use("/", mealControllers(mealServices));

export default router;
