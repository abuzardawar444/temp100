// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import err from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  const e = useRouteError();

  if (e.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={err} alt="error" />
          <h3>Oops! Page Not Found</h3>
          <p>We can&apos;t seem to find the page you are looking for</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
