const users = require('express').Router();
const validateToken = require('../middlewares/authMiddleware');
const validateInput = require('../middlewares/validateInput');
const userService = require('../services/users');
const {
  checkUserSignupValidator,
  checkUserLoginValidator,
  checkUserPreferenceValidator,
} = require('../validators/users');

users.post(
  '/signup',
  [checkUserSignupValidator, validateInput],
  async (req, res) => {
    const userPayload = req.body;
    const isUserExists = await userService.isUserExists(userPayload);
    if (isUserExists) {
      res.status(200).send({
        status: true,
        message: 'User already exists in our database',
      });
    } else {
      await userService.addUser(userPayload);
      res.status(200).send({
        status: true,
        message: 'User created successfully',
      });
    }
  }
);

users.post(
  '/login',
  [checkUserLoginValidator, validateInput],
  async (req, res) => {
    const loginUserPayload = req.body;
    const loginResult = await userService.generateAccessToken(loginUserPayload);
    if (loginResult.token) {
      res.status(200).send({
        status: true,
        token: loginResult.token,
        message: 'Token generated successfully',
      });
    } else if (loginResult.message) {
      res.status(401).send({
        status: false,
        message: loginResult.message,
      });
    }
  }
);

users.get('/preferences', validateToken, async (req, res) => {
  const userPreferences = await userService.fetchUserPreferences(req.user);
  res.status(200).send({
    status: true,
    preferences: userPreferences,
  });
});

users.put(
  '/preferences',
  [checkUserPreferenceValidator, validateInput, validateToken],
  async (req, res) => {
    const newPreferences = req.body.preferences;
    const userEmail = req.user.email;
    const isFileUpdateDone = await userService.updateUserPreferences(
      userEmail,
      newPreferences
    );
    if (isFileUpdateDone) {
      res.status(200).send({
        status: true,
        message: 'Preferences has been updated',
      });
    }
  }
);

module.exports = users;
