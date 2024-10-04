import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";

import { showToast } from "src/utils/ToastHelper";
const UserAllApplicationList = () => {
  const [applicationList, setApplicationList] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const rowsToShow = 3;
  const [startIndex, setStartIndex] = useState(0);
  const getsetLeadsList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setApplicationList(res?.data?.data);
      })
      .catch((err) => {
        showToast("error", "Something went wrong");
      });
  };
  console.log("app", applicationList);
  useEffect(() => {
    getsetLeadsList(
      `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/submitted-applications/?limit=3&offset=0`
    );
  }, []);
  const handleNexteClick = (pageNo) => {
    if (startIndex + rowsToShow < applicationList.length) {
      setStartIndex((prevIndex) => prevIndex + rowsToShow);
    }
  };
  const handlePreviousClick = (pageNo) => {
    if (startIndex - rowsToShow >= 0) {
      setStartIndex((prevIndex) => prevIndex - rowsToShow);
    }
  };
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h4>All Application List</h4>
      </div>
      <div className="product-card-body">
        <Table className="product-table" responsive>
          <thead>
            <tr>
              <th>Mid ID</th>
              <th>Legal Name</th>
              <th>Trading Name</th>
              <th>Application Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          {applicationList?.length < 1 && (
            <tr>
              <td colSpan="12">
                <div
                  style={{ background: "#17479d1f" }}
                  className="alert alert-success text-center mt-5 mb-5"
                  role="alert"
                >
                  Sorry ! No data found.
                </div>
              </td>
            </tr>
          )}
          <tbody>
            {applicationList
              ?.slice(startIndex, startIndex + rowsToShow)
              .map((item) => (
                <tr key={item.ptsave_mid}>
                  <td>{item.ptsave_mid}</td>
                  <td>{item.name}</td>
                  <td>{item.ptsave_trading_name}</td>
                  <td>
                    {
                      item?.[
                        "ptsave_back_office_stage@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                  <td
                    align="center"
                    //   onClick={() => handleApplicationView(item.accountid)}
                  >
                    <BsEyeFill className="view_icon" />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <div className="load-more-button-container gap-2">
          <p>
            Total : <span>{applicationList?.length}</span>
          </p>
          <button
            // className="load-more-button"
            className={` ${
              startIndex === 0 ? "disable-button" : "load-more-button"
            }`}
            onClick={handlePreviousClick}
          >
            Prev
          </button>
          <button
            // className="load-more-button"
            className={` ${
              startIndex + rowsToShow >= applicationList.length
                ? "disable-button"
                : "load-more-button"
            }`}
            onClick={handleNexteClick}
          >
            Next
          </button>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default UserAllApplicationList;
