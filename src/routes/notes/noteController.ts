import { Router } from "express";

import { noteController } from "../../controllers/noteController.js";
import { noteService } from "../../services/noteService.js";

const router = Router();

router.use("/", noteController(noteService));

export default router;
