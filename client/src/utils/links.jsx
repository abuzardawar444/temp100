/* eslint-disable no-unused-vars */
import React from "react";

import { IoBarChart } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  { text: "all jobs", path: ".", icon: <FaListUl /> },
  { text: "add job", path: "add-job", icon: <MdOutlineLibraryAdd /> },
  { text: "stats", path: "stats", icon: <IoBarChart /> },
  { text: "profile", path: "profile", icon: <FaRegUserCircle /> },
  { text: "admin", path: "admin", icon: <MdAdminPanelSettings /> },
];

export default links;
