import Joi from "joi";

export const createPengeluaranSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be a positive number",
      "number.precision": "Amount can have at most 2 decimal places",
      "any.required": "Amount is required"
    }),
  description: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      "string.empty": "Description is required",
      "string.min": "Description cannot be empty",
      "string.max": "Description must not exceed 255 characters",
      "any.required": "Description is required"
    }),
});

export const updatePengeluaranSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .precision(2)
    .optional()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be a positive number",
      "number.precision": "Amount can have at most 2 decimal places"
    }),
  description: Joi.string()
    .min(1)
    .max(255)
    .optional()
    .messages({
      "string.empty": "Description cannot be empty",
      "string.min": "Description cannot be empty",
      "string.max": "Description must not exceed 255 characters"
    }),
}).min(1).messages({
  "object.min": "At least one field (amount or description) is required for update"
});

export const getPengeluaranByIdSchema = Joi.object({
  id: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.base": "ID must be a string",
      "string.uuid": "ID must be a valid UUID",
      "any.required": "ID is required"
    }),
});

export const deletePengeluaranSchema = Joi.object({
}).unknown(false).messages({
  "object.unknown": "Request body is not allowed for delete operation"
});
