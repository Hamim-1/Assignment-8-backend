import express, { Request, Response } from "express";
import { router } from "./app/routes";
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import cookieParser from "cookie-parser";
import { notFound } from "./app/middlewares/notFound";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }))
const allowedOrigins = [
    "http://localhost:3000",
    "https://assignment-8-frontend-wheat.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use(notFound)
export default app;
