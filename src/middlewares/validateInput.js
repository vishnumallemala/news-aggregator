const { validationResult } = require('express-validator');

function validateInput(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const filteredErrors = errors.array().map((error) => {
      return error.msg;
    });

    return res.status(400).json({
      status: false,
      errors: filteredErrors,
    });
  }

  next();
}

module.exports = validateInput;
