import Joi from "joi";

export const getUserByIdSchema = Joi.object({
	id: Joi.number().integer().required(),
});

export const createUserSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string(),
});
