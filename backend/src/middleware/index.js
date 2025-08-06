import express from "express";
import cors from "cors";
import router from "../routes/index.js";
import "../utils/winston.js";
import fileUpload from "express-fileupload";

const appMiddleware = [
    cors({
        origin: true,
        credentials: true,
        preflightContinue: true,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    }),
    express.json(),
    fileUpload(),
    express.static("public"),
    router,
];

export default appMiddleware;