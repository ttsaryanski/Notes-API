import { Router } from "express";

import noteRoutes from "./notes/noteController.js";

const routes = Router();

routes.use("/notes", noteRoutes);

export default routes;
