import express, { Application } from "express";
import { swaggerUi, swaggerDocument } from "../swagger.js";

export default function expressInit(app: Application) {
    app.use(express.json());
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
