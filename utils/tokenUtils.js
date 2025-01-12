import jwt from "jsonwebtoken";

//jwt is used to transmit the data back and forth smoothly
export const createJWT = (payload) => {
  // @ts-ignore
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

//token is verifed using the secret key that we used to create it
export const verifyJWT = (token) => {
  // @ts-ignore
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
