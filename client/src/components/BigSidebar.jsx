/* eslint-disable no-unused-vars */
import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar/>          {/*isBigSidebar helps in showing the sidebar whenever we navigate to a new dashboard tab. By default, the sidebar stays hidden when we open a tab.*/ }
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
