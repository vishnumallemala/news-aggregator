const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
/**
 * The function `generateJwtAccessToken` asynchronously generates a JWT access token using a secret key
 * fetched from an external source and a provided payload with a 1-day expiration.
 * @param payload - The `payload` parameter in the `generateJwtAccessToken` function typically
 * represents the data that you want to include in the JWT (JSON Web Token). This data can be any JSON
 * object that you want to securely transmit or store. It could include information like user details,
 * permissions, or any other relevant
 * @returns The `generateJwtAccessToken` function returns a Promise that resolves to the generated
 * access token if the token is successfully generated. If an error occurs during the generation
 * process, the function will log the error and then rethrow the error.
 */
async function generateJwtAccessToken(payload) {
  try {
    const secretKey = await fetchSecretKeyContent();
    const generatedAccessToken = jwt.sign(payload, secretKey, {
      expiresIn: '1d',
    });
    return generatedAccessToken;
  } catch (error) {
    console.log('Error generating the jwt token due to', error);
    throw error;
  }
}

/**
 * This function reads the content of a private key file asynchronously and returns it as a string.
 * @returns The function `fetchSecretKeyContent` is returning the content of the private key file
 * located at the path specified by `filePath`.
 */
async function fetchSecretKeyContent() {
  const filePath = path.resolve(__dirname, '../..', '', 'private-key.pem');
  const secretKey = fs.readFileSync(filePath, 'utf-8');
  return secretKey;
}

/**
 * The function `decodeJwtAccessToken` decodes a JWT access token using a secret key fetched
 * asynchronously.
 * @param token - The `token` parameter in the `decodeJwtAccessToken` function is the JSON Web Token
 * (JWT) access token that needs to be decoded to extract the information it contains.
 * @returns The decoded information from the JWT access token is being returned.
 */
async function decodeJwtAccessToken(token) {
  const secretKey = await fetchSecretKeyContent();
  const decodedInformation = jwt.verify(token, secretKey);
  return decodedInformation;
}

module.exports = {
  generateJwtAccessToken,
  decodeJwtAccessToken,
};
