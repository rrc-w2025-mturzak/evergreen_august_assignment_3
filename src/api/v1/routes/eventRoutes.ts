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
/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event retrieved"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "evt_000001"
 *                     name:
 *                       type: string
 *                       example: "Tech Conference 2026"
 *                     date:
 *                       type: string
 *                       example: "2026-12-25T09:00:00.000Z"
 *                     capacity:
 *                       type: integer
 *                       example: 200
 *                     registrationCount:
 *                       type: integer
 *                       example: 50
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     category:
 *                       type: string
 *                       example: "conference"
 *                     createdAt:
 *                       type: string
 *                       example: "2026-02-28T01:50:57.242Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2026-02-28T01:50:57.242Z"
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event not found"
 */
eventRouter.get("/events/:id", validateRequest(eventSchemas.getById), getEventById);
/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Small New Event"
 *               date:
 *                 type: string
 *                 example: "2026-12-25T09:00:00.000Z"
 *               capacity:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: "networking"
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event created"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "evt_123456"
 *                     name:
 *                       type: string
 *                       example: "Small New Event"
 *                     date:
 *                       type: string
 *                       example: "2026-12-25T09:00:00.000Z"
 *                     capacity:
 *                       type: integer
 *                       example: 50
 *                     registrationCount:
 *                       type: integer
 *                       example: 0
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     category:
 *                       type: string
 *                       example: "networking"
 *                     createdAt:
 *                       type: string
 *                       example: "2026-03-01T02:06:12.173Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2026-03-01T02:06:12.173Z"
 *       400:
 *         description: Validation error
 */
eventRouter.post("/events", validateRequest(eventSchemas.create), createEvent);
/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "evt_000001"
 *                     name:
 *                       type: string
 *                       example: "Updated Event Name"
 *                     date:
 *                       type: string
 *                       example: "2026-12-25T09:00:00.000Z"
 *                     capacity:
 *                       type: integer
 *                       example: 300
 *                     registrationCount:
 *                       type: integer
 *                       example: 25
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     category:
 *                       type: string
 *                       example: "general"
 *                     createdAt:
 *                       type: string
 *                       example: "2026-02-28T01:50:57.242Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2026-03-01T02:06:12.173Z"
 *       404:
 *         description: Event not found
 */
eventRouter.put("/events/:id", validateRequest(eventSchemas.update), updateEventByIdAsync);
/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event deleted"
 *       404:
 *         description: Event not found
 */
eventRouter.delete("/events/:id", validateRequest(eventSchemas.delete), deleteEventByIdAsync);

export default eventRouter;