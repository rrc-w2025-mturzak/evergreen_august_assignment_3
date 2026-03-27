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

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */
eventRouter.get("/health", healthData);
/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Events retrieved"
 *                 count:
 *                   type: integer
 *                   example: 16
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "evt_000001"
 *                       name:
 *                         type: string
 *                         example: "Tech Conference 2026"
 *                       date:
 *                         type: string
 *                         example: "2026-12-25T09:00:00.000Z"
 *                       capacity:
 *                         type: integer
 *                         example: 200
 *                       registrationCount:
 *                         type: integer
 *                         example: 50
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       category:
 *                         type: string
 *                         example: "conference"
 *                       createdAt:
 *                         type: string
 *                         example: "2026-02-28T01:50:57.242Z"
 *                       updatedAt:
 *                         type: string
 *                         example: "2026-02-28T01:50:57.242Z"
 */
eventRouter.get("/events", getAllEvent);
eventRouter.get("/events/:id", validateRequest(eventSchemas.getById), getEventById);
eventRouter.post("/events", validateRequest(eventSchemas.create), createEvent);
eventRouter.put("/events/:id", validateRequest(eventSchemas.update), updateEventByIdAsync);
eventRouter.delete("/events/:id", validateRequest(eventSchemas.delete), deleteEventByIdAsync);

export default eventRouter;