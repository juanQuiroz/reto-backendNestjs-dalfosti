import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.required().default(4000), // in case PORT doesnt exists, joi will reate a env variable called PORT
});
