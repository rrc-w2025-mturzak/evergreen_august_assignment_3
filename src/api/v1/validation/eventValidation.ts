import Joi from "joi";

// Post operation schemas organized by request part
export const eventSchemas = {
    // POST /events - Create new post
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({
                "any.required": "Product name is required",
                "string.empty": "Product name cannot be empty",
            }),
            date: Joi.date().greater('now').iso().required().messages({
                "any.required": "capacity is required",
                "string.empty": "capacity cannot be empty",
            }),
            capacity: Joi.number().min(5).integer().required().messages({
                "any.required": "capacity is required",
                "string.empty": "capacity cannot be empty",
            }),
            registrationCount: Joi.number().integer() .max(Joi.ref('capacity')).optional().messages({
                "any.required": "registrationCount is required",
                "string.empty": "registrationCount cannot be empty",
            }),
            status: Joi.number().valid('active', 'cancelled', 'completed').optional().messages({
                "any.required": "price is required",
                "string.empty": "price cannot be empty",
            }),
            category: Joi.string().valid('conference', 'workshop', 'meetup', 'seminar', 'general').optional().messages({
                "any.required": "category is required",
                "string.empty": "category cannot be empty",
            }),
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
            name: Joi.string().required().messages({
                "any.required": "Product name is required",
                "string.empty": "Product name cannot be empty",
            }),
            date: Joi.string().required().messages({
                "any.required": "capacity is required",
                "string.empty": "capacity cannot be empty",
            }),
            capacity: Joi.number().required().messages({
                "any.required": "capacity is required",
                "string.empty": "capacity cannot be empty",
            }),
            registrationCount: Joi.number().optional().messages({
                "any.required": "registrationCount is required",
                "string.empty": "registrationCount cannot be empty",
            }),
            status: Joi.number().optional().messages({
                "any.required": "price is required",
                "string.empty": "price cannot be empty",
            }),
            category: Joi.string().optional().messages({
                "any.required": "category is required",
                "string.empty": "category cannot be empty",
            }),
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