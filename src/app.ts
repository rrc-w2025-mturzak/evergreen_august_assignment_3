import express, {Express} from "express";
import eventRouter from "./api/v1/routes/eventRoutes";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

app.use(express.json());

app.use(morgan("combined"));

app.use("/api/v1/", eventRouter);

export default app;

