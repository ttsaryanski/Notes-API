import { Router } from "express";

import { notesController } from "../../controllers/notesController.js";
import { notesService } from "../../services/notesService.js";

const router = Router();

router.use("/", notesController(notesService));

export default router;
