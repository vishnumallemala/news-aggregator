const globalUsers = require('../../users.json');
const {
  hashPassword,
  addUsersToFile,
  writeToFile,
} = require('../utils/common');
const { generateJwtAccessToken } = require('../utils/jwt');
const path = require('path');
const _ = require('lodash');

module.exports = {
  users: globalUsers.users,
  /**
   * The `addUser` function asynchronously hashes the user's password and adds the user to a file,
   * handling any errors that may occur.
   * @param user - The `user` parameter in the `addUser` function likely represents an object containing
   * information about a user that is being added to a system or database. This object may include
   * properties such as `username`, `email`, `password`, `firstName`, `lastName`, etc. The function first
   * hashes the
   */
  async addUser(user) {
    try {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
      await addUsersToFile(user);
    } catch (error) {
      console.log('Failed adding the given user', error);
      throw error;
    }
  },
  /**
   * The function `isUserExists` checks if a user already exists based on their email address.
   * @param user - The `isUserExists` function is an asynchronous function that checks if a user already
   * exists in the database based on their email address. The function takes a `user` object as a
   * parameter, which likely contains information about the user, such as their email address.
   * @returns The `isUserExists` function is returning a boolean value - `true` if the user exists in
   * the `users` array based on the email comparison, and `false` if the user does not exist.
   */
  async isUserExists(user) {
    try {
      const existingUser = this.users.find(
        (userDb) => userDb.email === user.email
      );
      return existingUser ? true : false;
    } catch (error) {
      console.log('Failed checking whether user exists', error);
      throw error;
    }
  },
  /**
   * The function generates an access token based on the user's email and password after verifying them
   * against a database.
   * @param user - The `user` parameter in the `generateAccessToken` function represents an object
   * containing user information, such as email and password.
   * @returns If the user is found in the database with the correct email and hashed password, an
   * object containing a token generated using the user's data (excluding the password) is returned. If
   * the user is not found or the password and email combination is incorrect, a message indicating the
   * incorrect combination is returned.
   */
  async generateAccessToken(user) {
    try {
      const password = user.password;
      const email = user.email;
      const hashedPassword = await hashPassword(password);
      const userDb = this.users.find(
        (eachUserDb) =>
          eachUserDb.email === email && eachUserDb.password === hashedPassword
      );
      if (userDb) {
        return {
          token: await generateJwtAccessToken(_.omit(userDb, 'password')),
        };
      } else {
        return {
          message: 'password and email combinations is incorrect. Try again',
        };
      }
    } catch (error) {
      console.log('Failed generating the token', error);
      throw error;
    }
  },
  /**
   * The function fetches the preferences of a user based on their email address.
   * @param user - The `fetchUserPreferences` function takes a `user` object as a parameter. The `user`
   * object likely contains information about the user, such as their email address. The function then
   * attempts to find the user's preferences based on their email address in the `this.users` array. If
   * successful
   * @returns The function `fetchUserPreferences` is returning the preferences of the user whose email
   * matches the provided user's email.
   */
  async fetchUserPreferences(user) {
    try {
      const { email } = user;
      const loggedInUserInfo = this.users.find(
        (eachUserDb) => eachUserDb.email === email
      );
      return loggedInUserInfo.preferences;
    } catch (error) {
      console.log('Failed fetching the user preferences', error);
      throw error;
    }
  },
  /**
   * This function updates the preferences of a user in a list of users stored in a JSON file.
   * @param userEmail - User's email address to identify the user whose preferences are being updated.
   * @param preferences - Preferences refer to the settings or choices that a user can customize to
   * tailor their experience within an application or system. These preferences can include options
   * such as theme selection, notification settings, language preferences, and any other configurable
   * settings that enhance the user's interaction with the platform.
   * @returns The `updateUserPreferences` function is returning the result of writing the updated user
   * preferences to a JSON file using the `writeToFile` function.
   */
  async updateUserPreferences(userEmail, preferences) {
    try {
      const updatedUsersList = this.users.map((eachUserDb) => {
        if (eachUserDb.email === userEmail) {
          eachUserDb.preferences = preferences;
        }
        return eachUserDb;
      });
      const filePathToWrite = path.resolve(
        __dirname,
        '../..',
        '',
        'users.json'
      );
      return writeToFile(filePathToWrite, { users: updatedUsersList });
    } catch (error) {
      console.log('Failed updating the user preferences due to error', error);
      throw error;
    }
  },
};
