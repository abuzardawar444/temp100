import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  //we check the token in the cookie in the req object. If the token doesn't exist, we throw an error.
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");

  //we decode the token and verify it. If it is correct, we access the userId and role from it and pass it as a new request object.
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "678238bfc70e652be1bda52b";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const autherizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("No modifications allowed for test user");
  }
  next();
}