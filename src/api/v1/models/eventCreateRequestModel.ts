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
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Tech Conference 2026"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Must be a future ISO date
 *                 example: "2026-12-25T09:00:00.000Z"
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *                 example: 200
 *               registrationCount:
 *                 type: integer
 *                 description: Must be <= capacity
 *                 example: 0
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 example: "active"
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general, networking]
 *                 example: "conference"
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
 *                       example: "Tech Conference 2026"
 *                     date:
 *                       type: string
 *                       example: "2026-12-25T09:00:00.000Z"
 *                     capacity:
 *                       type: integer
 *                       example: 200
 *                     registrationCount:
 *                       type: integer
 *                       example: 0
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     category:
 *                       type: string
 *                       example: "conference"
 *                     createdAt:
 *                       type: string
 *                       example: "2026-03-01T02:06:12.173Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2026-03-01T02:06:12.173Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 */
export interface EventCreateRequest {
    name: string;
    date: Date;
    capacity: number;
    registrationCount: number;
    status: string;
    category: string;
}