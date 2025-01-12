// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking </span> app
          </h1>
          <p>
            Empower Your Career Journey with Ease! Track your applications,
            discover opportunities, and stay ahead in your job search—all in one
            place. Your next big move starts here!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Explore App
          </Link>
        </div>
        <img src={main} alt="landing-img" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
