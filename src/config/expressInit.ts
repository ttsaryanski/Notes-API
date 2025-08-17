import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { swaggerUi, swaggerDocument } from "../swagger.js";

export default function expressInit(app: Application) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
