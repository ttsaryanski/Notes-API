import { Router } from "express";

import { noteControllers } from "../../controllers/noteControllers.js";
import { noteServices } from "../../services/noteServices.js";

const router = Router();

router.use("/", noteControllers(noteServices));

export default router;
