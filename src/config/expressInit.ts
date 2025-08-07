import express, { Application } from "express";

export default function expressInit(app: Application) {
    app.use(express.json());
}
