/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaCalendarCheck, FaBug } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import Wrapper from "../assets/wrappers/StatsContainer"
import StatItem from './StatItem';

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats.pending || 0,
      icon: <MdOutlinePendingActions />,
      color: "#f99933",
      bcg: "#fdd9b3",
    },
    {
      title: "interview scheduled",
      count: defaultStats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#469d89",
      bcg: "#b5d8d0",
    },
    {
      title: "jobs declined",
      count: defaultStats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item}/>
      })}
    </Wrapper>
  )
}

export default StatsContainer