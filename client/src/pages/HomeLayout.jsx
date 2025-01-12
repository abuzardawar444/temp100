/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <Outlet /> {/*To utilize this as a prent route and project the content of children route*/}
    </>
  );
};

export default HomeLayout;