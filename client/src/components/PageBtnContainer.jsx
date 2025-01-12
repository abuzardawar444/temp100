/* eslint-disable no-unused-vars */
import React from "react";
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  //constructing an array of pages
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  //changing the pages when clicked on
  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNum, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNum}
        onClick={() => handlePageChange(pageNum)}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    //adding the page number for page1. We want to display it by default.
    pageButtons.push(
      addPageButton({ pageNum: 1, activeClass: currentPage === 1 })
    );

    //dots for all pages between first and the one before the current page
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>
      );
    }

    //page before the current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage - 1, activeClass: false })
      );
    }

    //current page button. It is displayed and carries the active class tag.
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage, activeClass: true })
      );
    }

    //page after the current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage + 1, activeClass: false })
      );
    }

    //dots for pages between last page and one after the current page
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }

    //adding page number for the last page. It is also displayed by default.
    pageButtons.push(
      addPageButton({
        pageNum: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages; //if the current page is 1, we dont want to go back to page 0. We will go back to the last page instead.
          handlePageChange(prevPage);
        }}
      >
        <CgChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <CgChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
