/* eslint-disable no-unused-vars */
import React from "react";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <TbSunFilled className="toggle-icon" />
      ) : (
        <TbMoonFilled className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
