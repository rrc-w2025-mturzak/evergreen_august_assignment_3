import express, {Express} from "express";
import dotenv from "dotenv";
dotenv.config();
import eventRouter from "./api/v1/routes/eventRoutes";
import morgan from "morgan";
import { getHelmetConfig } from "./api/v1/config/helmetConfig";

const app: Express = express();

app.use(getHelmetConfig());

app.use(express.json());

app.use(morgan("combined"));

app.use("/api/v1/", eventRouter);

export default app;

