import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";

import { showToast } from "src/utils/ToastHelper";
import PropTypes from "prop-types";
import { appStage } from "src/views/common/Dropdown";

const UserApplicationList = ({ id }) => {
  UserApplicationList.propTypes = {
    id: PropTypes.number.isRequired,
  };

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
      `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/new/?limit=3&offset=0&user=${id}`
      // `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/submitted-applications/?limit=3&offset=0&user=${id}`
    );
  }, []);
  const handleNexteClick = (pageNo) => {
    getsetLeadsList(applicationList?.next);
  };
  const handlePreviousClick = (pageNo) => {
    getsetLeadsList(applicationList?.previous);
  };
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h4>New Application List</h4>
      </div>
      <div className="product-card-body">
        <Table className="product-table" responsive>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Legal Name</th>
              <th>Trading Name</th>
              <th>Application Stage</th>
              {/* <th style={{ textAlign: "center" }}>Action</th> */}
            </tr>
          </thead>
          {applicationList?.results?.length < 1 && (
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
            {applicationList?.results
              ?.slice(0, allDataLoaded ? applicationList?.count : 3)
              .map((item) => (
                <tr key={item.client_id}>
                  <td>{item.client_id}</td>
                  <td>{item.legal_name}</td>
                  <td>{item.trading_name}</td>
                  <td>{appStage[item?.applicaiton_stage].name}</td>
                  {/* <td
                    align="center"
                    onClick={() => {
                      localStorage.setItem("newAppId", item?.slug);
                      navigate(`/new-application-preview`);
                    }}
                  >
                    <BsEyeFill className="view_icon" />
                  </td> */}
                </tr>
              ))}
          </tbody>
        </Table>
     
        <div className="load-more-button-container gap-2">
          <p>
            Total : <span>{applicationList?.length}</span>
          </p>
          <button
            className={` ${
              applicationList?.previous ? "load-more-button" : "disable-button"
            }`}
            onClick={handlePreviousClick}
          >
            Prev
          </button>
          <button
       
            className={` ${
              applicationList?.next ? "load-more-button" : "disable-button"
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

export default UserApplicationList;
