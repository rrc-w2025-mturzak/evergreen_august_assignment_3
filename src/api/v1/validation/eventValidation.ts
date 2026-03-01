import Joi from "joi";

// Post operation schemas organized by request part
export const eventSchemas = {
    // POST /events - Create new post
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({}),
            date: Joi.date().greater('now').iso().required().messages({}),
            capacity: Joi.number().min(5).integer().required().messages({}),
            registrationCount: Joi.number().integer() .max(Joi.ref('capacity')).optional().messages({}),
            status: Joi.string().valid('active', 'cancelled', 'completed').optional().messages({}),
            category: Joi.string().valid('conference', 'workshop', 'meetup', 'seminar', 'general').optional().messages({}),
        }),
    },

    // GET /events/:id - Get single post
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        query: Joi.object({
            include: Joi.string().valid("comments", "author").optional(),
        }),
    },

    // PUT /events/:id - Update post
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(3).required().messages({}),
            date: Joi.date().greater('now').iso().required().messages({}),
            capacity: Joi.number().min(5).integer().required().messages({}),
            registrationCount: Joi.number().integer() .max(Joi.ref('capacity')).optional().messages({}),
            status: Joi.string().valid('active', 'cancelled', 'completed').optional().messages({}),
            category: Joi.string().valid('conference', 'workshop', 'meetup', 'seminar', 'general').optional().messages({}),
        }),
    },

    // DELETE /events/:id - Delete post
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
    },
};