import express, { Router } from "express";
import { healthData, 
        createEvent, 
        getEventById, 
        getAllEvent, 
        updateEventByIdAsync, 
        deleteEventByIdAsync } from "../controllers/eventController";
// import { validateRequest } from "../middleware/validateRequest";
// import { postSchemas } from "../validation/productValidation";

const eventRouter: Router = express.Router();

eventRouter.get("/health", healthData);
eventRouter.get("/events", getAllEvent);
eventRouter.get("/events/:id", getEventById);
eventRouter.post("/event", createEvent);
eventRouter.put("/event/:id", updateEventByIdAsync);
eventRouter.delete("/events/:id", deleteEventByIdAsync);

export default eventRouter;