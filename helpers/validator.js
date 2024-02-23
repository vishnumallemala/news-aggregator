const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  newsPreferences: Joi.array().items(Joi.string()).required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const preferenceSchema = Joi.object({
  newsPreferences: Joi.array().items(Joi.string()).required()
});

function validateRegistrationParams(req, res, next) {
  registrationSchema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(400).json({ error: error.details.map((d) => d.message) });
    });
}

function validateLoginParams(req, res, next) {
  loginSchema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(401).json({ error: error.details.map((d) => d.message) });
    });
}

function validatePreferenceParam(req, res, next) {
  preferenceSchema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(400).json({ error: error.details.map((d) => d.message) });
    });
}

module.exports = { validateLoginParams, validateRegistrationParams, validatePreferenceParam };
