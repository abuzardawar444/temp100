/* eslint-disable no-unused-vars */
import React from "react";
import { Link, Form, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify"; //to send notifications

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data); //this line of code tells us the type of request and its URL. The data parameter is the data that we need to send to the backend server. So, this data is stored in the database when the request is made.
    toast.success("You are registered successfully");
    return redirect("/login"); //returning a value is compulsory. Without that, an error will be thrown.
  } catch (error) {
    toast.error(error.response.data.message);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          labelText="First Name"
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
        />
        <FormRow
          type="text"
          name="location"
          labelText="Location"
        />
        <FormRow
          type="email"
          name="email"
          labelText="Email ID"
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
        />
        <SubmitBtn/>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
