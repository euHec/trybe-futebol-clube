import * as Joi from 'joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const schema = Joi.object({
  email: Joi.string().pattern(RegExp(emailPattern)).required(),
  password: Joi.string().min(6).required(),
});

export default schema;
