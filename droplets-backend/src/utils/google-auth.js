const { OAuth2Client } = require("google-auth-library");

const validateGoogleUser = async (idToken) => {
  const googleClient = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID);

  const ticket = await googleClient.verifyIdToken({
    idToken: idToken,
    audiance: process.env.GOOGLE_AUTH_CLIENT_ID,
  });

  const response = ticket.getPayload();

  if (
    response.iss !== "accounts.google.com" &&
    response.aud !== process.env.GOOGLE_AUTH_CLIENT_ID
  ) {
    return false;
  }

  return true;
};

const getGoogleUserInfo = async (idToken) => {
  const googleClient = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID);

  const ticket = await googleClient.verifyIdToken({
    idToken: idToken,
    audiance: process.env.GOOGLE_AUTH_CLIENT_ID,
  });

  const response = ticket.getPayload();

  if (
    response.iss !== "https://accounts.google.com" &&
    response.aud !== process.env.GOOGLE_AUTH_CLIENT_ID
  ) {
    throw new Error("Google Token not valid!");
  }

  return {
    email: response.email,
    firstName: response.given_name,
    lastName: response.family_name,
  };
};

module.exports = { getGoogleUserInfo, validateGoogleUser };
