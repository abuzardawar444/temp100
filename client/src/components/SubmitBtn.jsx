/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn }) => {
    const navigate = useNavigation();
    const isSubmitting = navigate.state === 'submitting';

  return (
    <button
      type="submit"
      disabled={isSubmitting}
          className={`btn btn-block ${formBtn && "form-btn"}`}
      >
          {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitBtn;
