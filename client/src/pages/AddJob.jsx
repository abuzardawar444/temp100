/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useOutletContext, redirect } from "react-router-dom";
import { FormRow, SubmitBtn, FormRowSelect } from "../components";
import { JOB_TYPE, JOB_STATUS } from "../../../utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/jobs", data);
    toast.success("Job created successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error.response.data.message);
    return error;
  }
};
const AddJob = () => {
  // @ts-ignore
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form className="form" method="post">
        <h4 className="form-title">Add A Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.INTERVIEW}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
