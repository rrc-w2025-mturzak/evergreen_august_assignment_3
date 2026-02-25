import express, {Express} from "express";
// import eventRouter from "./api/v1/routes/eventRoutes";

const app: Express = express();

app.use(express.json());

app.use("/api/v1/");

export default app;
