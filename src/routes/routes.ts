import { Router } from "express";

import notesRoutes from "./notes/notesControler.js";

const routes = Router();

routes.use("/notes", notesRoutes);

export default routes;
