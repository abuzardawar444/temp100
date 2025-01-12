import { body, validationResult, param } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //errors exist
        const errorMessages = errors.array().map((e) => e.msg);
        if (errorMessages[0].startsWith("No job")) {
          //useful for cases where we want the 404 status code
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next(); //to pass to the next middleware. If this is not added, the request will stop here only even if everything is as expected.
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("Company name is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value); //checking if the id asked for actually exists
    if (!isValid) throw new Error("Invalid MongoDB ID");

    const job = await Job.findById(value); //checking if a job exists with the given id
    if (!job) throw new Error(`No job found with ID ${value}`);

    //checking if the job is created by the admin or the current logged in user
    const isAdmin = req.user.role === "admin";
    // @ts-ignore
    const isOwner = req.user.userId === job.createdBy.toString();

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Not authorized to access this router");
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email ID is required")
    .isEmail()
    .withMessage("Email ID is in incorrect format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email ID already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Minimum length of password should be 8 characters."),
  body("location").notEmpty().withMessage("Location is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email ID is required")
    .isEmail()
    .withMessage("Invalid Email ID Format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email ID is required")
    .isEmail()
    .withMessage("Invalid Email ID format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("Email already exists");
      }
    }),
  body("location").notEmpty().withMessage("Location is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
]);
