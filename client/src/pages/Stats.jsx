/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react'
import { StatsContainer, ChartsContainer } from "../components";
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';

export const loader = async (req, res) => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
}

const Stats = () => {
  // @ts-ignore
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications}/>
      )}
    </>
  )
}

export default Stats