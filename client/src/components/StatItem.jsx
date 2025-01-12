/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} 
// @ts-ignore
    bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
          </header>
          <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
