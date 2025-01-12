/* eslint-disable no-unused-vars */
import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, Link, useSubmit } from "react-router-dom";
import { FormRow, FormRowSelect } from ".";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const submit = useSubmit();

  //to add delay to the form submission
  const debounce = (onChange) => {
    let timeout;
    return (event) => {
      const form = event.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 800);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="sort"
            list={["all", ...Object.values(JOB_SORT_BY)]}
            defaultValue={sort}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <Link to="/dashboard" className="btn form-btn delete-btn">
            Reset search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
