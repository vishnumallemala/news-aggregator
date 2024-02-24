const { body } = require('express-validator');

const checkUserLoginValidator = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('email should be a valid email')
    .trim(),

  body('password').notEmpty().withMessage('password cannot be empty').trim(),
];

const checkUserPreferenceValidator = [
  body('preferences')
    .notEmpty()
    .withMessage('Preferences cannot be empty')
    .isIn([
      'general',
      'world',
      'nation',
      'business',
      'technology',
      'entertainment',
      'sports',
      'science',
      'health',
      'movies',
      'comics',
      'games',
    ])
    .withMessage(
      'Preferences must be one of: general, world, nation, business, technology, entertainment, sports, science, health, movies, comics, games'
    ),
];

const checkUserSignupValidator = [
  ...checkUserLoginValidator,
  ...checkUserPreferenceValidator,
];

module.exports = {
  checkUserSignupValidator,
  checkUserLoginValidator,
  checkUserPreferenceValidator,
};
