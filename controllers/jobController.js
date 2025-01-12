import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

//get all jobs controller
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  //setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs }); //adding a status is not complusory, but it is a good practice
};

//create a job controller - we create the job in the schema using the 2nd line of the function
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; //to assign the current user Id to a specified user
  const job = await Job.create(req.body); //req.body has all the values that we need to create a job like the company and the position. So, we can skip the destructing part
  res.status(StatusCodes.CREATED).json({ job });
};

//get a job controller
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

//edit a job controller
export const updateJob = async (req, res) => {
  //new: true returns the new job to us after updating. By default, the job returned is the one before the update.
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ message: "Job updated", job: updatedJob });
};

//delete a job controller
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndRemove(req.params.id);
  return res.status(StatusCodes.OK).json({ message: "Job deleted" });
};

//show stats functionality
export const showStats = async (req, res) => {
  //aggregate pipeline is used to sort and group the mongo data. There are various stages to it.
  let stats = await Job.aggregate([
    //stage 1: match the jobs based to which user has created them
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    //stage 2: grouping the jobs by their status and count each group
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  //converting the array into object using reduce
  stats = stats.reduce((acc, curr) => {
    //acc is what we return from the callback function and curr is the current iteration
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    // @ts-ignore
    pending: stats.pending || 0,
    // @ts-ignore
    interview: stats.interview || 0,
    // @ts-ignore
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } }, //to sort with the latest month first
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
