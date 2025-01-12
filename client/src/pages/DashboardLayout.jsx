/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

//setting up a context to pass values to components without passing it through the entire component tree
// @ts-ignore
const DashboardContext = createContext();

//setting up loader - to fetch the values before the component is rendered
export const loader = async () => {
  //we take the data from the get request made to users/current-user and return the data. In case of any issues, we logout the user from the website by redirecting them to the base route ("/").
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  // @ts-ignore
  const { user } = useLoaderData(); //user info for profile
  const [showSidebar, setShowSidebar] = useState(false); //to show or hide sidebar
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme); //to toggle betwenn light and dark theme

  const navigate = useNavigate();

  //function to toggle dark theme
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme); //toggle method requires a class (here, dark-theme) whose properties/styles should be applied to the element. The 2nd parameter needed is a force (i.e., a variable) on change of whose value the styles/properties will be applied to the element
    // @ts-ignore
    localStorage.setItem("darkTheme", newDarkTheme); //to save the theme preference in the local storage
  };

  //function to show and hid sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  //function to logout user
  const logoutUser = async () => {
    navigate("/"); //navigate to base route
    await customFetch.get("/auth/logout"); //make request to logout route
    toast.success("User logged out successfully");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

//creating custom hook
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
