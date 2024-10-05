import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "../utils/errorHandler.js";
import { API_BASE_URL } from "./constants.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ROUTES
import userRouter from "../routes/user.routes.js";

app.use(`${API_BASE_URL}/user`, userRouter);

import medicineRouter from "../routes/medicine.routes.js";

app.use(`${API_BASE_URL}/medicines`, medicineRouter);

import inventoryHistoryRouter from "../routes/inventoryhistory.routes.js";

app.use(`${API_BASE_URL}/inventory`, inventoryHistoryRouter);

app.use(errorHandler);

export { app };
