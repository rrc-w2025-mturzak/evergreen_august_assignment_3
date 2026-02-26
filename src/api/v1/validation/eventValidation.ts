import Joi from "joi";

// Post operation schemas organized by request part
export const eventSchemas = {
    // POST /product - Create new post
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Product name is required",
                "string.empty": "Product name cannot be empty",
            }),
            capacity: Joi.number().required().messages({
                "any.required": "capacity is required",
                "string.empty": "capacity cannot be empty",
            }),
            registrationCount: Joi.number().required().messages({
                "any.required": "registrationCount is required",
                "string.empty": "registrationCount cannot be empty",
            }),
            status: Joi.number().required().messages({
                "any.required": "price is required",
                "string.empty": "price cannot be empty",
            }),
            category: Joi.string().required().messages({
                "any.required": "category is required",
                "string.empty": "category cannot be empty",
            }),
        }),
    },

    // GET /product/:id - Get single post
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

    // PUT /product/:id - Update post
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
            capacity: Joi.number().required().messages({
                "any.required": "capacity is required",
                "string.empty": "capacity cannot be empty",
            }),
            registrationCount: Joi.number().required().messages({
                "any.required": "registrationCount is required",
                "string.empty": "registrationCount cannot be empty",
            }),
            status: Joi.number().required().messages({
                "any.required": "price is required",
                "string.empty": "price cannot be empty",
            }),
            category: Joi.string().required().messages({
                "any.required": "category is required",
                "string.empty": "category cannot be empty",
            }),
        }),
    },

    // DELETE /product/:id - Delete post
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
    },
};