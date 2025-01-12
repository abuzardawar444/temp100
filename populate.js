import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";

//model imports
import User from "./models/userModel.js";
import Job from "./models/jobModel.js";

dotenv.config();

try {
  // @ts-ignore
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "niharika@gmail.com" });
// const user = await User.findOne({ email: "peter@gmail.com" });

  const jsonJobs = JSON.parse(
    // @ts-ignore
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );

  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user?._id };
  });

  await Job.deleteMany({ createdBy: user?._id });
  await Job.create(jobs);
  console.log("success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
