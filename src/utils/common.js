const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * The function `hashPassword` asynchronously hashes a password using bcrypt with a specified salt
 * value from the environment variables.
 * @param password - The `hashPassword` function you provided is an asynchronous function that uses
 * bcrypt to hash a password with a specified salt value from the environment variables
 * (`process.env.BCRYPT_SALT`).
 * @returns The `hashPassword` function is returning a promise that resolves to the hashed password
 * using bcrypt.
 */
async function hashPassword(password) {
  try {
    return bcrypt.hash(password, process.env.BCRYPT_SALT);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

/**
 * The function `writeToFile` writes the JSON stringified content to a file specified by the filePath
 * and returns true if successful, otherwise logs an error message.
 * @param filePath - The `filePath` parameter is the path to the file where you want to write the
 * content. It should include the file name and extension (e.g., 'output.txt', 'data.json').
 * @param content - The `content` parameter in the `writeToFile` function is the data that you want to
 * write to the file specified by the `filePath`. This data will be converted to a JSON string using
 * `JSON.stringify` before writing it to the file.
 * @returns The function `writeToFile` returns a boolean value `true` if the file write operation is
 * successful.
 */
function writeToFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(content));
    return true;
  } catch (error) {
    console.log('Failed to write to file:', error.message);
    throw error;
  }
}

/**
 * The function `addUsersToFile` reads a JSON file, adds a new user object to it, and writes the
 * updated content back to the file.
 * @param newUser - `newUser` is an object containing information about a new user that needs to be
 * added to the `users.json` file. It typically includes properties such as `name`, `email`,
 * `username`, etc.
 */
async function addUsersToFile(newUser) {
  try {
    const filePath = path.resolve(__dirname, '../..', '', 'users.json');
    const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    fileContent.users.push({ id: uuidv4(), ...newUser });
    writeToFile(filePath, fileContent);
  } catch (error) {
    console.log('Failed updating the task due to error', error.message);
    throw error;
  }
}

module.exports = {
  hashPassword,
  addUsersToFile,
  writeToFile,
};
