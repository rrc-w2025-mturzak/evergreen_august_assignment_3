import express, {Express} from "express";
import dotenv from "dotenv";
dotenv.config();
import eventRouter from "./api/v1/routes/eventRoutes";
import morgan from "morgan";
import { getHelmetConfig } from "./api/v1/config/helmetConfig";
import cors from "cors";
import { getCorsOptions } from "./api/v1/config/corsConfig";
import setupSwagger from "./api/v1/config/swagger";

const app: Express = express();

app.use(getHelmetConfig());

app.use(cors(getCorsOptions()));

app.use(express.json());

app.use(morgan("combined"));

app.use("/api/v1/", eventRouter);

setupSwagger(app);

export default app;

