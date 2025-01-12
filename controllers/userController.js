import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  //we match the id given in the request object (i.e., the one with which the user has logged in to the website) to the ones in the database and return if we find the relevant one
  const user = await User.findOne({ _id: req.user.userId });
  // @ts-ignore
  //we remove the password field from the current user.
  const userWithoutPassword = user.toJSON(); //toJson -> in userModel.js file
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

//admin route
export const getApplicationStats = async (req, res) => {
  //counting the number of users registered and the number of jobs created
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body }; //to delete the password from the user object
  delete newUser.password;

  if (req.file) {  //if we are able to upload the image successfully to cloudinary, we remove it from the local system by using logic in line2 of the if block
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser); //first parameter is the ID of the user to be updated and the second parameter is the values to be updated. They will be accessed from the req.body.
  //if the user already has an image uploaded and is trying to upload a new one, we remove the previous one from cloudinary
  if (req.file && updatedUser?.avatarPublicId) {  //the second parameter is used to check if the user is uploading the image for the first time. 
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }
  
  res.status(StatusCodes.OK).json({ message: "Updated user" });
};
