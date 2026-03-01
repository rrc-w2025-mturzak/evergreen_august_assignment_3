import express, { Router } from "express";
import { healthData, 
        createEvent, 
        getEventById, 
        getAllEvent, 
        updateEventByIdAsync, 
        deleteEventByIdAsync } from "../controllers/eventController";
import { validateRequest } from "../middleware/validateRequest";
import { eventSchemas } from "../validation/eventValidation";

const eventRouter: Router = express.Router();

eventRouter.get("/health", healthData);
eventRouter.get("/events", getAllEvent);
eventRouter.get("/events/:id", validateRequest(eventSchemas.getById), getEventById);
eventRouter.post("/events", validateRequest(eventSchemas.create), createEvent);
eventRouter.put("/events/:id", validateRequest(eventSchemas.update), updateEventByIdAsync);
eventRouter.delete("/events/:id", validateRequest(eventSchemas.delete), deleteEventByIdAsync);

export default eventRouter;